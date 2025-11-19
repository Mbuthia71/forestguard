import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  isRanger: boolean;
  isStakeholder: boolean;
  isMasterAdmin: boolean;
  userRole: 'admin' | 'ranger' | 'stakeholder' | null;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, metadata?: { display_name?: string; phone?: string }) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRanger, setIsRanger] = useState(false);
  const [isStakeholder, setIsStakeholder] = useState(false);
  const [isMasterAdmin, setIsMasterAdmin] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'ranger' | 'stakeholder' | null>(null);
  const navigate = useNavigate();

  const checkUserRole = async (userId: string) => {
    try {
      // Check user_roles table for role
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (roleData) {
        const role = roleData.role;
        setIsAdmin(role === 'admin');
        setUserRole(role === 'admin' ? 'admin' : null);
        setIsRanger(false);
        setIsStakeholder(false);
        
        // Check if master admin by calling the database function
        if (role === 'admin') {
          const { data: isMaster } = await supabase.rpc('is_master_admin', { _user_id: userId });
          setIsMasterAdmin(isMaster || false);
        } else {
          setIsMasterAdmin(false);
        }
        return;
      }

      // Check rangers table
      const { data: rangerData } = await supabase
        .from('rangers')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (rangerData) {
        setIsRanger(true);
        setUserRole('ranger');
        setIsAdmin(false);
        setIsStakeholder(false);
        return;
      }

      // Default to no role
      setIsAdmin(false);
      setIsRanger(false);
      setIsStakeholder(false);
      setIsMasterAdmin(false);
      setUserRole(null);
    } catch {
      setIsAdmin(false);
      setIsRanger(false);
      setIsStakeholder(false);
      setIsMasterAdmin(false);
      setUserRole(null);
    }
  };

  useEffect(() => {
    const handleSession = async (session: Session | null) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await checkUserRole(session.user.id);
      } else {
        setIsAdmin(false);
        setIsRanger(false);
        setIsStakeholder(false);
        setIsMasterAdmin(false);
        setUserRole(null);
      }

      setLoading(false);
    };

    // Initial session check
    setLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    // Auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // Ensure we wait for role resolution before unblocking UI
      handleSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, metadata?: { display_name?: string; phone?: string }) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: metadata || {},
        },
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setIsRanger(false);
    setIsStakeholder(false);
    setIsMasterAdmin(false);
    setUserRole(null);
    navigate('/');
  };

  const refreshRole = async () => {
    const uid = supabase.auth.getUser ? (await supabase.auth.getUser()).data.user?.id : user?.id;
    if (uid) await checkUserRole(uid);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, isRanger, isStakeholder, isMasterAdmin, userRole, signIn, signUp, signOut, refreshRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}