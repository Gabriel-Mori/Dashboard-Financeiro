"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/contexts/auth-context";
import {Button} from "@/components/ui/button";
import {Container, Card, Title, Description} from "../page/style";

export default function Home() {
  const {user, isLoading} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Container>
      <Card>
        <Title>Dashboard Financeiro</Title>
        <Description>
          Uma plataforma completa para análise de suas transações financeiras,
          com visualizações detalhadas e filtros personalizados.
        </Description>
        <Button onClick={() => router.push("/login")}>
          Entrar no Dashboard
        </Button>
      </Card>
    </Container>
  );
}
