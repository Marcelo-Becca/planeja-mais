/*
  Arquivo: planeja-dash-rebuild-main/src/components/DashboardCard.tsx
  Explicação: Este arquivo faz parte do frontend em React do projeto Planeja+.
  Objetivo deste arquivo: (descrição curta abaixo).

  Comentários inseridos automaticamente para ajudar iniciantes a entender o fluxo.
  -- As anotações são didáticas e em português; revise manualmente antes de alterações em produção.
*/

// Importa hooks/funções do 'react' (useState, useEffect, useContext, etc.).
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

// Exporta este componente como exportação padrão do arquivo.
export default function DashboardCard({ title, children, className }: DashboardCardProps) {
// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
  return (
    <article className={cn(
      "bg-card border border-border rounded-lg shadow-card hover:shadow-card-hover transition-shadow duration-300 animate-fade-in",
      className
    )}>
      {/* Card Header */}
      <header className="p-4 md:p-6 border-b border-border">
        <h2 className="text-lg md:text-xl font-semibold text-card-foreground">{title}</h2>
      </header>

      {/* Card Content */}
      <div className="p-4 md:p-6">
        {children}
      </div>
    </article>
  );
}
