import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Fingerprint, ShieldCheck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useWebAuthn } from "@/hooks/useWebAuthn";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function AdminAuth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSupported, registerBiometric, loginWithBiometric } = useWebAuthn();
  const { signIn, signUp, refreshRole } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    document.title = "Admin Login • ForestGuard";
  }, []);

  const handleEmailSignup = async () => {
    if (!displayName.trim() || !email || !password) {
      toast({ title: "All fields required", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { error: signUpError } = await signUp(email, password, { display_name: displayName.trim() });
      if (signUpError) throw signUpError;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not created");

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
        description: "Your admin request is pending approval." 
      });
      setIsSignupMode(false);
      setDisplayName("");
      setEmail("");
      setPassword("");
    } catch (e: any) {
      playTone("error");
      toast({ title: "Registration failed", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    if (!email || !password) {
      toast({ title: "Fields required", description: "Enter email and password.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;

      await supabase.functions.invoke('bootstrap-admin');
      await refreshRole();

      playTone("success");
      toast({ title: "Admin access granted", description: "Redirecting..." });
      setTimeout(() => navigate("/admin"), 500);
    } catch (e: any) {
      playTone("error");
      toast({ title: "Login failed", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    setLoading(true);
    try {
      await loginWithBiometric("admin@fg.local");
      await supabase.functions.invoke('bootstrap-admin');
      await refreshRole();

      playTone("success");
      toast({ title: "Admin access granted" });
      setTimeout(() => navigate("/admin"), 500);
    } catch (e: any) {
      playTone("error");
      toast({ title: "Biometric login failed", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-4"
          >
            <ShieldCheck className="w-16 h-16 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">Admin Access</h1>
          <p className="text-muted-foreground">Secure login for ForestGuard administrators</p>
        </div>

        <div className="bg-card border rounded-xl shadow-lg p-8 space-y-6">
          {isSignupMode ? (
            <>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleEmailSignup}
                disabled={loading}
              >
                <Mail className="w-4 h-4 mr-2" />
                {loading ? "Submitting..." : "Request Admin Access"}
              </Button>

              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setIsSignupMode(false)}
              >
                Already approved? Sign in
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="loginEmail">Email</Label>
                  <Input
                    id="loginEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="loginPassword">Password</Label>
                  <Input
                    id="loginPassword"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleEmailLogin}
                disabled={loading}
              >
                <Mail className="w-4 h-4 mr-2" />
                {loading ? "Signing in..." : "Sign In with Email"}
              </Button>

              {isSupported && (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-primary/20"
                    size="lg"
                    onClick={handleBiometricLogin}
                    disabled={loading}
                  >
                    <Fingerprint className="w-5 h-5 mr-2" />
                    Login with Fingerprint
                  </Button>
                </>
              )}

              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setIsSignupMode(true)}
              >
                Need admin access? Request approval
              </Button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
