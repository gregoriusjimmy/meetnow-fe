import { initializeApp } from '@firebase/app';
import { errorAuthAtom, isLoadingAuthAtom, userAtom } from '@src/rootState';
import * as Google from 'expo-auth-session/providers/google';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from 'firebase/auth';
import { useAtom } from 'jotai';

import { firebaseConfig } from '../../firebaseConfig';

initializeApp(firebaseConfig);

export const useAuth = () => {
  const [, setUser] = useAtom(userAtom);
  const [, setIsLoading] = useAtom(isLoadingAuthAtom);
  const [, setError] = useAtom(errorAuthAtom);

  const firebaseAuth = getAuth();
  const [request, , promptAsync] = Google.useIdTokenAuthRequest({
    // expoClientId: '346786182080-07vgpfu3rorbiv9rn03l1csm7evvpg8r.apps.googleusercontent.com',
    // iosClientId: '346786182080-1t5323qfge5l0hmbsj2e20rd38ce3p4g.apps.googleusercontent.com',
    // androidClientId: '346786182080-n40fov4fid2s1gmb69834j1dk5tqtda6.apps.googleusercontent.com',
    clientId: '374289093868-g46ji4a4hgsogg8gp8v6tpp1so39t5cd.apps.googleusercontent.com',
  });

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const res = await promptAsync();
      if (res?.type === 'success') {
        const { id_token } = res.params;
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(firebaseAuth, credential);
      }
    } catch (error) {
      setError(error as Error);
    }
  };

  const logout = () => {
    signOut(firebaseAuth).catch((error) => setError(error));
  };

  const authStateChangedListener = onAuthStateChanged(firebaseAuth, (user) => {
    setUser(user);
    setIsLoading(false);
  });

  return {
    request,
    signInWithGoogle,
    logout,
    authStateChangedListener,
  };
};
