/*
  Arquivo: planeja-dash-rebuild-main/src/hooks/use-mobile.tsx
  Explicação: Este arquivo faz parte do frontend em React do projeto Planeja+.
  Objetivo deste arquivo: (descrição curta abaixo).

  Comentários inseridos automaticamente para ajudar iniciantes a entender o fluxo.
  -- As anotações são didáticas e em português; revise manualmente antes de alterações em produção.
*/

// Importa hooks/funções do 'react' (useState, useEffect, useContext, etc.).
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
// Declaração de estado com setter — padrão: const [valor, setValor] = useState(...).
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

// useEffect: executa efeitos colaterais (chamadas API, timers). O array de dependências determina quando ele roda.
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
// Declara o componente/funcão 'onChange' como arrow function. É uma forma comum de definir componentes funcionais em React.
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
