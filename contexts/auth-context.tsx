"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {useRouter} from "next/navigation";
import {setUserCookie, removeUserCookie} from "@/lib/auth-cookies";

type User = {
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUserFromCookie() {
      try {
        const response = await fetch("/api/auth");
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadUserFromCookie();
  }, []);

  const login = async (email: string, password: string) => {
    if (password.length < 6) {
      throw new Error("Senha inválida. Deve ter pelo menos 6 caracteres.");
    }

    const user = {email};

    await setUserCookie(user);

    setUser(user);
    router.push("/dashboard");
  };

  const logout = async () => {
    await removeUserCookie();

    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{user, login, logout, isLoading}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
