import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Fingerprint, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useWebAuthn } from "@/hooks/useWebAuthn";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export default function AdminAuth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSupported, registerBiometric, loginWithBiometric } = useWebAuthn();
  const { refreshRole } = useAuth();
  const [loading, setLoading] = useState<"idle" | "signup" | "login">("idle");
  const [displayName, setDisplayName] = useState("");
  const [isSignupMode, setIsSignupMode] = useState(false);

  // Futuristic sound cues using WebAudio
  const playTone = (type: "success" | "error") => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      if (type === "success") {
        o.frequency.setValueAtTime(880, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.12);
      } else {
        o.frequency.setValueAtTime(220, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.2);
      }
      g.gain.setValueAtTime(0.001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.26);
    } catch {}
  };

  useEffect(() => {
    document.title = "Admin Fingerprint Login • ForestGuard";
  }, []);

  const ADMIN_EMAIL = "admin@fg.local"; // pseudonymous identifier (no real email)

  const handleSignup = async () => {
    if (!displayName.trim()) {
      toast({ title: "Name required", description: "Please enter your display name.", variant: "destructive" });
      return;
    }
    
    setLoading("signup");
    try {
      // First register biometric - this creates the auth user
      await registerBiometric(ADMIN_EMAIL);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not created");
      
      // Create profile with display name
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({ id: user.id, display_name: displayName.trim() });
      
      if (profileError) throw profileError;
      
      // Create admin approval request
      const { error: approvalError } = await supabase
        .from("pending_admin_approvals")
        .insert({ 
          user_id: user.id, 
          display_name: displayName.trim(),
          status: 'pending'
        });
      
      if (approvalError) throw approvalError;
      
      playTone("success");
      toast({ 
        title: "Registration submitted", 
        description: "Your admin request is pending approval. You'll be able to login once approved." 
      });
      setIsSignupMode(false);
      setDisplayName("");
    } catch (e: any) {
      playTone("error");
      toast({ title: "Registration failed", description: e.message || "Could not register.", variant: "destructive" });
    } finally {
      setLoading("idle");
    }
  };

  const handleLogin = async () => {
    setLoading("login");
    try {
      await loginWithBiometric(ADMIN_EMAIL);
      // Bootstrap admin role if none exists, then confirm role
      await supabase.functions.invoke('bootstrap-admin');
      // Refresh role in auth context so ProtectedRoute passes
      await refreshRole();

      playTone("success");
      toast({ title: "Admin access granted", description: "Redirecting to admin..." });
      navigate("/admin", { replace: true });
    } catch (e: any) {
      playTone("error");
      toast({ title: "Authentication failed", description: e.message || "Could not verify fingerprint.", variant: "destructive" });
    } finally {
      setLoading("idle");
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-xl border border-border/60 bg-card/70 backdrop-blur-md shadow-xl p-8 text-center"
      >
        <div className="flex items-center justify-center mb-6">
          <ShieldCheck className="h-6 w-6 text-primary mr-2" />
          <h1 className="text-xl font-semibold text-foreground">Login / Signup with Fingerprint</h1>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative mb-8"
        >
          <div className="w-32 h-32 mx-auto rounded-full border-4 border-primary/30 flex items-center justify-center bg-primary/5 shadow-md">
            <Fingerprint className="h-16 w-16 text-primary animate-pulse" />
          </div>
        </motion.div>

        <p className="text-sm text-muted-foreground mb-6">
          {isSupported ? "Touch your fingerprint sensor to authenticate" : "WebAuthn not supported on this device"}
        </p>

        {isSignupMode ? (
          <div className="space-y-4">
            <div className="space-y-2 text-left">
              <label htmlFor="displayName" className="text-sm font-medium text-foreground">
                Display Name
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading === "signup"}
              />
            </div>
            <Button
              onClick={handleSignup}
              disabled={!isSupported || loading === "signup"}
              className="w-full"
            >
              {loading === "signup" ? "Registering..." : "Register & Enroll Fingerprint"}
            </Button>
            <Button
              onClick={() => {
                setIsSignupMode(false);
                setDisplayName("");
              }}
              variant="ghost"
              className="w-full"
              disabled={loading === "signup"}
            >
              Back to Login
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleLogin}
              disabled={!isSupported || loading === "login"}
              className="w-full"
              size="lg"
            >
              {loading === "login" ? "Verifying..." : "Login with Fingerprint"}
            </Button>
            <Button
              onClick={() => setIsSignupMode(true)}
              variant="outline"
              className="w-full"
              size="lg"
            >
              New Admin? Register
            </Button>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Your biometric data is stored securely on this device and never sent to servers.
          </p>
        </div>
      </motion.article>
    </main>
  );
}
