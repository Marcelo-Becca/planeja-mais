/*
  Arquivo: planeja-dash-rebuild-main/src/components/ui/skeleton.tsx
  Explicação: Este arquivo faz parte do frontend em React do projeto Planeja+.
  Objetivo deste arquivo: (descrição curta abaixo).

  Comentários inseridos automaticamente para ajudar iniciantes a entender o fluxo.
  -- As anotações são didáticas e em português; revise manualmente antes de alterações em produção.
*/

import { cn } from "@/lib/utils";

// Define a função/componente 'Skeleton'. Componentes em React são funções que retornam JSX.
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
// return: retorno JSX (abreviado) — contém os elementos visuais do componente.
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

// Exporta símbolos nomeados deste arquivo.
export { Skeleton };
