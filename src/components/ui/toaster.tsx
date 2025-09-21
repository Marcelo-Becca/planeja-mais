/*
  Arquivo: planeja-dash-rebuild-main/src/components/ui/toaster.tsx
  Explicação: Este arquivo faz parte do frontend em React do projeto Planeja+.
  Objetivo deste arquivo: (descrição curta abaixo).

  Comentários inseridos automaticamente para ajudar iniciantes a entender o fluxo.
  -- As anotações são didáticas e em português; revise manualmente antes de alterações em produção.
*/

import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
  return (
    <ToastProvider>
// map: itera sobre um array para renderizar listas de elementos (cada item precisa de uma 'key' única).
      {toasts.map(function ({ id, title, description, action, ...props }) {
// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
