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
  const router = useRouter();
  const {user, isLoading} = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
