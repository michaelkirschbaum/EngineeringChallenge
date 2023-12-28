import {createContext, useState, useContext} from 'react';

const AuthContext = createContext({authState: {token: "", signedIn: false}, setAuthState: () => {}});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
  const [authState, setAuthState] = useState({
    token: '',
    signedIn: false
  });

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};