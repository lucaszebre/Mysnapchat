import React from 'react';

import { useStorageState } from '@/hooks/useStorageState';

/**
 * Photo captured by the camera screen and handed to the "send snap" flow.
 * Only `base64` is read by the app; the rest mirrors expo-camera's picture shape.
 */
export type SnapFile = {
  uri?: string;
  base64?: string;
  width?: number;
  height?: number;
};

type SessionContextValue = {
  signIn: (token: string) => void;
  signOut: () => void;
  session: string | null;
  isLoading: boolean;
  file: SnapFile | undefined;
  setFile: (file: SnapFile | undefined) => void;
};

const AuthContext = React.createContext<SessionContextValue>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  file: undefined,
  setFile: () => null,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [file, setFile] = React.useState<SnapFile | undefined>(undefined);

  return (
    <AuthContext.Provider
      value={{
        signIn: (token: string) => {
          setSession(token);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
        file,
        setFile,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
