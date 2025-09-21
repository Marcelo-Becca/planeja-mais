/*
  Arquivo: planeja-dash-rebuild-main/src/components/Layout.tsx
  Explicação: Este arquivo faz parte do frontend em React do projeto Planeja+.
  Objetivo deste arquivo: (descrição curta abaixo).

  Comentários inseridos automaticamente para ajudar iniciantes a entender o fluxo.
  -- As anotações são didáticas e em português; revise manualmente antes de alterações em produção.
*/

// Importa hooks/funções do 'react' (useState, useEffect, useContext, etc.).
import { useState } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

// Exporta este componente como exportação padrão do arquivo.
export default function Layout({ children }: LayoutProps) {
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
        {children}
      </main>
    </div>
  );
}
