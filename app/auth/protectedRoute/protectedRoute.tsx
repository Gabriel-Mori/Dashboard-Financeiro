"use client";

import {Loader} from "lucide-react";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Container} from "./style";
import {useAuth} from "@/contexts/auth-context";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const {user, isLoading} = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push("/dashboard");
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
  }, [router]);

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRoute;
