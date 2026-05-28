import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getRedirectResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updateProfile
} from 'firebase/auth';
import { useEffect, useMemo, useState } from 'react';
import { firebaseAuth } from '@services/firebase.js';
import { ensureUserProfile, watchPresence } from '@services/chatService.js';

const googleProvider = new GoogleAuthProvider();

export function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getRedirectResult(firebaseAuth)
      .then(async (result) => {
        if (result?.user) {
          await ensureUserProfile(result.user);
        }
      })
      .catch((error) => {
        console.error('Google redirect sign-in failed:', error);
      });

    return onAuthStateChanged(firebaseAuth, async (authUser) => {
      setUser(authUser);
      setIsAuthReady(true);

      if (authUser) {
        await ensureUserProfile(authUser);
        watchPresence(authUser.uid);
      }
    });
  }, []);

  const actions = useMemo(
    () => ({
      async signInWithEmail(email, password) {
        setIsSubmitting(true);

        try {
          await signInWithEmailAndPassword(firebaseAuth, email, password);
        } finally {
          setIsSubmitting(false);
        }
      },
      async createAccount(name, email, password) {
        setIsSubmitting(true);

        try {
          const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
          await updateProfile(credential.user, { displayName: name });
          await ensureUserProfile(credential.user, name);
        } finally {
          setIsSubmitting(false);
        }
      },
      async signInWithGoogle() {
        setIsSubmitting(true);

        try {
          await signInWithRedirect(firebaseAuth, googleProvider);
        } finally {
          setIsSubmitting(false);
        }
      },
      signOutUser() {
        return signOut(firebaseAuth);
      }
    }),
    []
  );

  return {
    user,
    isAuthReady,
    isSubmitting,
    ...actions
  };
}
