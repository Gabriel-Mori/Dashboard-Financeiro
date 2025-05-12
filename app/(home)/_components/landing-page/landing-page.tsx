import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

import {Container, Card, Title, Description} from "./style";
import {useAuth} from "@/contexts/auth-context";

const LandingPage = () => {
  const {isLoading} = useAuth();
  const router = useRouter();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
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
    </>
  );
};

export default LandingPage;
