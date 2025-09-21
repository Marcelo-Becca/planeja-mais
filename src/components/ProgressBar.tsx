/*
  Arquivo: planeja-dash-rebuild-main/src/components/ProgressBar.tsx
  Explicação: Este arquivo faz parte do frontend em React do projeto Planeja+.
  Objetivo deste arquivo: (descrição curta abaixo).

  Comentários inseridos automaticamente para ajudar iniciantes a entender o fluxo.
  -- As anotações são didáticas e em português; revise manualmente antes de alterações em produção.
*/

// Importa hooks/funções do 'react' (useState, useEffect, useContext, etc.).
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  label: string;
  current: number;
  total: number;
  variant?: "primary" | "secondary";
  className?: string;
}

// Exporta este componente como exportação padrão do arquivo.
export default function ProgressBar({ 
  label, 
  current, 
  total, 
  variant = "primary",
  className 
}: ProgressBarProps) {
// useState: declara estado local deste componente. Ex.: const [x, setX] = useState(initial).
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const percentage = Math.round((current / total) * 100);

// useEffect: executa efeitos colaterais (chamadas API, timers). O array de dependências determina quando ele roda.
  useEffect(() => {
    // Animate progress bar on mount
    const timer = setTimeout(() => {
      setAnimatedWidth(percentage);
    }, 100);
    
// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
    return () => clearTimeout(timer);
  }, [percentage]);

// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
  return (
    <div className={cn("space-y-2", className)}>
      {/* Label and values */}
      <div className="flex justify-between items-center">
        <span className="text-card-foreground text-sm font-medium">{label}</span>
        <span className="text-muted-foreground text-sm">
          {current}/{total}
        </span>
      </div>

      {/* Progress bar container */}
      <div className="h-2 bg-progress-track rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out",
            variant === "primary" ? "bg-progress-fill" : "bg-progress-secondary"
          )}
          style={{ width: `${animatedWidth}%` }}
        />
      </div>

      {/* Percentage indicator */}
      <div className="text-right">
        <span className={cn(
          "text-xs font-medium",
          variant === "primary" ? "text-primary" : "text-progress-secondary"
        )}>
          {percentage}% concluído
        </span>
      </div>
    </div>
  );
}
