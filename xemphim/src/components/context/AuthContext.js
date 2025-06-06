import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// Thêm props để biết đang ở layout nào
export const AuthProvider = ({ children, mode = "user" }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const key = mode === "admin" ? "admin" : "user";
    const storedUser = localStorage.getItem(key);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [mode]);

  const login = (userData) => {
    setUser(userData);
    const key = mode === "admin" ? "admin" : "user";
    localStorage.setItem(key, JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    const key = mode === "admin" ? "admin" : "user";
    localStorage.removeItem(key);
  };

  // Phân biệt quyền admin và người dùng thường
  const isAdmin = !!user && (user.la_quan_tri === 1 || user.role === "admin");
  const isUser = !!user && !isAdmin;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isUser }}>
      {children}
    </AuthContext.Provider>
  );
};
