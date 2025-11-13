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
    setLoading("signup");
    try {
      // generate a random strong secret; not shown to user
      const secret = crypto.getRandomValues(new Uint8Array(16)).reduce((s, b) => s + b.toString(16).padStart(2, "0"), "");
      await registerBiometric(ADMIN_EMAIL);
      playTone("success");
      toast({ title: "Fingerprint enrolled", description: "Admin fingerprint registered successfully." });
    } catch (e: any) {
      playTone("error");
      toast({ title: "Enrollment failed", description: e.message || "Could not register fingerprint.", variant: "destructive" });
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
          className="relative mx-auto mb-8 h-32 w-32 rounded-full border border-primary/30 flex items-center justify-center"
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ boxShadow: ["0 0 0 0 hsl(var(--primary)/0.2)", "0 0 30px 10px hsl(var(--primary)/0.25)", "0 0 0 0 hsl(var(--primary)/0.2)"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <Fingerprint className="h-16 w-16 text-primary" />
        </motion.div>

        {!isSupported ? (
          <p className="text-muted-foreground">Biometric authentication is not supported on this device or context. Use a secure browser over HTTPS.</p>
        ) : (
          <div className="space-y-3">
            <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleLogin} disabled={loading !== "idle"}>
              {loading === "login" ? "Authenticating..." : "Login with Fingerprint"}
            </Button>
            <Button size="lg" variant="outline" className="w-full border-primary text-primary" onClick={handleSignup} disabled={loading !== "idle"}>
              {loading === "signup" ? "Enrolling..." : "Sign up with Fingerprint"}
            </Button>
            <p className="text-xs text-muted-foreground pt-2">No emails. No passwords. Device biometrics only.</p>
          </div>
        )}
      </motion.article>
    </main>
  );
}
