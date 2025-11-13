import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Helper: normalize base64url to base64 and convert to ArrayBuffer
const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const normalize = (input: string) => {
    let s = (input || '').replace(/\s/g, '').replace(/-/g, '+').replace(/_/g, '/');
    const pad = s.length % 4;
    if (pad === 2) s += '==';
    else if (pad === 3) s += '=';
    else if (pad === 1) throw new Error('Invalid base64 string');
    return s;
  };
  const b64 = normalize(base64);
  const binaryString = atob(b64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

// Helper to convert ArrayBuffer to base64
const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export const useWebAuthn = () => {
  const [isSupported, setIsSupported] = useState(
    window.PublicKeyCredential !== undefined
  );

  const registerBiometric = async (email: string, _password?: string) => {
    if (!isSupported) {
      throw new Error('WebAuthn is not supported on this device');
    }

    try {
      // Get registration challenge
      const { data: challengeData, error: challengeError } = await supabase.functions.invoke(
        'webauthn-register-challenge',
        { body: { email } }
      );

      if (challengeError) throw challengeError;

      // Convert challenge to ArrayBuffer
      const publicKeyOptions = {
        ...challengeData,
        challenge: base64ToArrayBuffer(challengeData.challenge),
        user: {
          ...challengeData.user,
          id: base64ToArrayBuffer(challengeData.user.id),
        },
      } as PublicKeyCredentialCreationOptions;

      // Create credential
      const credential = await navigator.credentials.create({
        publicKey: publicKeyOptions,
      }) as PublicKeyCredential;

      if (!credential) {
        throw new Error('Failed to create credential');
      }

      const attestationResponse = credential.response as AuthenticatorAttestationResponse;

      // Verify and store credential
      const { data, error } = await supabase.functions.invoke(
        'webauthn-register-verify',
        {
          body: {
            email,
            credential: {
              id: credential.id,
              publicKey: arrayBufferToBase64(attestationResponse.getPublicKey()!),
              transports: attestationResponse.getTransports?.() || [],
            },
            challenge: challengeData.challenge,
          },
        }
      );

      if (error) throw error;

      return { success: true, data };
    } catch (error: any) {
      throw new Error(error.message || 'Biometric registration failed');
    }
  };

  const loginWithBiometric = async (email: string) => {
    if (!isSupported) {
      throw new Error('WebAuthn is not supported on this device');
    }

    try {
      // Get login challenge
      const { data: challengeData, error: challengeError } = await supabase.functions.invoke(
        'webauthn-login-challenge',
        { body: { email } }
      );

      if (challengeError) throw challengeError;

      // Convert challenge and credential IDs to ArrayBuffer
      const publicKeyOptions = {
        ...challengeData,
        challenge: base64ToArrayBuffer(challengeData.challenge),
        allowCredentials: challengeData.allowCredentials.map((cred: any) => ({
          ...cred,
          id: base64ToArrayBuffer(cred.id),
        })),
      };

      // Get credential
      const assertion = await navigator.credentials.get({
        publicKey: publicKeyOptions,
      }) as PublicKeyCredential;

      if (!assertion) {
        throw new Error('Failed to authenticate');
      }

      const assertionResponse = assertion.response as AuthenticatorAssertionResponse;

      // Verify authentication
      const { data, error } = await supabase.functions.invoke(
        'webauthn-login-verify',
        {
          body: {
            email,
            credentialId: assertion.id,
            signature: arrayBufferToBase64(assertionResponse.signature),
          },
        }
      );

      if (error) throw error;

      // Create a session by verifying the magiclink token hash
      if (data.token_hash) {
        const payload = { type: 'magiclink', token_hash: data.token_hash } as const;
        console.debug('[WebAuthn] verifyOtp payload', payload);
        const { data: sessionData, error: otpError } = await supabase.auth.verifyOtp(payload as any);
        if (otpError) {
          console.error('[WebAuthn] verifyOtp error', otpError);
          throw otpError;
        }
        console.debug('[WebAuthn] verifyOtp success', !!sessionData?.session);
      }

      return { success: true, user: data.user };
    } catch (error: any) {
      throw new Error(error.message || 'Biometric authentication failed');
    }
  };

  return {
    isSupported,
    registerBiometric,
    loginWithBiometric,
  };
};
