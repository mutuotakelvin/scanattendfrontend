import React, { createContext, useContext } from 'react';
import { useStorageState } from './useStorageState';
import {  useRouter } from 'expo-router';
import useUserStores from './store/UserStore';
import useAccountStore from './store/AccountStore';
import { Alert } from 'react-native';

interface AuthContextProps {
  signIn: (loginData: { username: string; password: string }) => Promise<void>;
  signUp: (loginData: { username: string; password: string }) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;

}

const AuthContext = createContext<AuthContextProps | null>(null);

export function useSession() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const router = useRouter();
  const {user, setUser, clearUser}:any = useUserStores()
  const {account,} :any = useAccountStore()
  const userData = typeof user === 'string' ? JSON.parse(user) : user;

  const signUp = async(signupData:{username:string, password:string}) => {
    try {
      if(account == 'Student'){
        const { username, password } = signupData;
        const res = await fetch('http://10.0.2.2:8000/api/auth/student/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        if (!res.ok) {
          throw new Error('Authentication failed');
        }else{
          const data = await res.json();
          router.push('/sign-in')
        }
    
      } else if(account == 'Lecturer'){
        const { username, password } = signupData;
        const res = await fetch('http://10.0.2.2:8000/api/auth/teacher/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        if (!res.ok) {
          throw new Error('Authentication failed');
        }
        else{
          const data = await res.json();
          router.push('/sign-in')
          console.log(data)
        }
        
      }
  
    } catch (err) {
      console.error(err);
    }
  }

  const signIn = async (loginData: { username: string; password: string }) => {
    try {
      if(account == 'Student'){

        const { username, password } = loginData;
        const res = await fetch('http://10.0.2.2:8000/api/auth/student/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        if (!res.ok) {
          router.push('/sign-in')
          return Alert.alert('Authentication failed. Please try again');
        } else {
          const data = await res.json();
          console.log(data)
          setUser(JSON.stringify(data.user))
          // JSON-encode values before storing
          setSession(JSON.stringify(data.access));
          if(userData.username == null || userData.username == ''){
            return router.push('/complete-profile')
          } else{
            return router.push('/(tabs)/')
          }
        }
    
      } else if(account == 'Lecturer'){
        const { username, password } = loginData;
        const res = await fetch('http://10.0.2.2:8000/api/auth/teacher/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        if (!res.ok) {
          return Alert.alert('Authentication failed. Please try again');
        } else{
          const data = await res.json();
          console.log(data)
          setUser(JSON.stringify(data.user))
          // JSON-encode values before storing
          setSession(JSON.stringify(data.access));
          if(userData.name == null || userData.name == ''){
             router.push('/complete-profile')
           }else {
             router.push('/(tabs)/')
           }

        }
    
      }
  
    } catch (err) {
      console.error(err);
    }
  };
  

  const signOut = () => {
    console.log('signing out');
    setSession(null);
    clearUser()
    router.push('/')
  };

  const authContextValue: AuthContextProps = {
    signIn,
    signOut,
    signUp,
    session,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}
function useUserStore(arg0: (state: any) => any) {
  throw new Error('Function not implemented.');
}

