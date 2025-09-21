/*
  Arquivo: planeja-dash-rebuild-main/src/pages/Index.tsx
  Explicação: Este arquivo faz parte do frontend em React do projeto Planeja+.
  Objetivo deste arquivo: (descrição curta abaixo).

  Comentários inseridos automaticamente para ajudar iniciantes a entender o fluxo.
  -- As anotações são didáticas e em português; revise manualmente antes de alterações em produção.
*/

import Layout from "@/components/Layout";
import DaySummaryCard from "@/components/DaySummaryCard";
import WeeklyProgressCard from "@/components/WeeklyProgressCard";
import { useAuth } from "@/contexts/AuthContext";

// Declara o componente/funcão 'Index' como arrow function. É uma forma comum de definir componentes funcionais em React.
const Index = () => {
  const { user } = useAuth();
  
// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
  return (
    <Layout>
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95 sticky top-0 z-10">
        <div className="px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-foreground">
                Bem-vindo(a), <span className="text-primary">{user?.displayName || user?.name.split(' ')[0]}</span>!
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Aqui está um resumo da sua produtividade hoje
              </p>
            </div>
            
            {/* Optional header actions */}
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 px-4 md:px-6 py-4 md:py-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-4 md:space-y-6">
            {/* Day Summary Card */}
            <DaySummaryCard />
            
            {/* Weekly Progress Card */}
            <WeeklyProgressCard />
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Exporta este componente como exportação padrão do arquivo.
export default Index;
