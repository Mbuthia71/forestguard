import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Helper to convert base64 to ArrayBuffer
const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const binaryString = atob(base64);
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

  const registerBiometric = async (email: string, password: string) => {
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
      };

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
            password,
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

      // Sign in with the generated session
      if (data.accessToken) {
        const { error: signInError } = await supabase.auth.setSession({
          access_token: data.accessToken.properties.hashed_token,
          refresh_token: data.accessToken.properties.hashed_token,
        });
        
        if (signInError) throw signInError;
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
