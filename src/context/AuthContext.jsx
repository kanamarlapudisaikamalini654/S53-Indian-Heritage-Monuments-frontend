import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const login = (username, role) => {
    setUser({ username, role });
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
  };

  const toggleFavorite = (monumentId) => {
    setFavorites(prev =>
      prev.includes(monumentId)
        ? prev.filter(id => id !== monumentId)
        : [...prev, monumentId]
    );
  };

  const isFavorite = (monumentId) => favorites.includes(monumentId);

  return (
    <AuthContext.Provider value={{ user, login, logout, favorites, toggleFavorite, isFavorite }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}