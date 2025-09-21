/*
  Arquivo: planeja-dash-rebuild-main/src/components/Dashboard.tsx
  Explicação: Este arquivo faz parte do frontend em React do projeto Planeja+.
  Objetivo deste arquivo: (descrição curta abaixo).

  Comentários inseridos automaticamente para ajudar iniciantes a entender o fluxo.
  -- As anotações são didáticas e em português; revise manualmente antes de alterações em produção.
*/

// Importa hooks/funções do 'react' (useState, useEffect, useContext, etc.).
import { useState } from "react";
import Sidebar from "./Sidebar";
import DaySummaryCard from "./DaySummaryCard";
import WeeklyProgressCard from "./WeeklyProgressCard";

// Mock user data - in a real app this would come from authentication
const userData = {
  name: "Marina Santos",
  firstName: "Marina"
};

// Exporta este componente como exportação padrão do arquivo.
export default function Dashboard() {
// useState: declara estado local deste componente. Ex.: const [x, setX] = useState(initial).
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 768);

// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
  return (
    <div className="min-h-screen bg-background flex w-full overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggleCollapsed={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Mobile overlay */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
// onClick: handler para eventos de clique. Normalmente chama uma função que altera estado ou navega.
          onClick={() => setSidebarCollapsed(true)}
          aria-hidden="true"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95 sticky top-0 z-10">
          <div className="px-4 md:px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl md:text-2xl font-semibold text-foreground">
                  Bem-vindo(a), <span className="text-primary">{userData.firstName}</span>!
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
      </main>
    </div>
  );
}
