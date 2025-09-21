/*
  Arquivo: planeja-dash-rebuild-main/src/components/ui/checkbox.tsx
  Explicação: Este arquivo faz parte do frontend em React do projeto Planeja+.
  Objetivo deste arquivo: (descrição curta abaixo).

  Comentários inseridos automaticamente para ajudar iniciantes a entender o fluxo.
  -- As anotações são didáticas e em português; revise manualmente antes de alterações em produção.
*/

// Importa hooks/funções do 'react' (useState, useEffect, useContext, etc.).
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// Exporta símbolos nomeados deste arquivo.
export { Checkbox };
