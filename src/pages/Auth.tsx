import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useWebAuthn } from '@/hooks/useWebAuthn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Shield, Lock, Mail, Fingerprint } from 'lucide-react';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email('Invalid email address').max(255),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100),
});

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [useBiometric, setUseBiometric] = useState(false);
  const { signIn, signUp, user, userRole, isRanger, isAdmin } = useAuth();
  const { isSupported, registerBiometric, loginWithBiometric } = useWebAuthn();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if running on HTTPS or localhost
    const isSecure = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
    if (!isSecure && isSupported) {
      toast.error('Biometric authentication requires HTTPS');
    }
  }, [isSupported]);

  // Redirect if already logged in
  useEffect(() => {
    if (user && userRole) {
      if (isRanger) {
        navigate('/ranger');
      } else if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [user, userRole, isRanger, isAdmin, navigate]);

  if (user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate input
      authSchema.parse({ email, password });

      if (useBiometric && !isLogin) {
        // Register with biometric
        await registerBiometric(email, password);
        toast.success('Biometric registration successful! You can now login with your fingerprint.');
        navigate('/');
      } else {
        let error;
        if (isLogin) {
          ({ error } = await signIn(email, password));
        } else {
          // Pass display_name as metadata during signup
          const { error: signUpError } = await signUp(email, password, { display_name: displayName });
          error = signUpError;
        }

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password');
          } else if (error.message.includes('already registered')) {
            toast.error('This email is already registered. Please login instead.');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
          // Navigation will be handled by useEffect based on role
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    if (!email) {
      toast.error('Please enter your email first');
      return;
    }

    setLoading(true);
    try {
      await loginWithBiometric(email);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Biometric authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-forest-deep via-background to-forest-deep p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Shield className="w-10 h-10 text-primary" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-foreground mb-2">
            {isLogin ? 'Welcome Back' : 'Join ForestGuard'}
          </h1>
          <p className="text-center text-foreground/60 mb-8">
            {isLogin ? 'Sign in to access your dashboard' : 'Create an account to get started'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={255}
                className="bg-background/50"
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder="Your Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  maxLength={100}
                  className="bg-background/50"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                maxLength={100}
                className="bg-background/50"
              />
            </div>

            {!isLogin && isSupported && (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="useBiometric"
                  checked={useBiometric}
                  onChange={(e) => setUseBiometric(e.target.checked)}
                  className="rounded border-border"
                />
                <Label htmlFor="useBiometric" className="text-sm">
                  Enable biometric authentication
                </Label>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>

          {isLogin && isSupported && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-foreground/60">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                onClick={handleBiometricLogin}
                disabled={loading || !email}
                className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary"
              >
                <Fingerprint className="w-5 h-5 mr-2" />
                Login with Fingerprint
              </Button>
            </>
          )}

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </Card>

        <div className="mt-8 text-center text-foreground/60 text-sm">
          <p>Protected by end-to-end encryption</p>
        </div>
      </motion.div>
    </div>
  );
}