/*
  Arquivo: planeja-dash-rebuild-main/src/pages/NotFound.tsx
  Explicação: Este arquivo faz parte do frontend em React do projeto Planeja+.
  Objetivo deste arquivo: (descrição curta abaixo).

  Comentários inseridos automaticamente para ajudar iniciantes a entender o fluxo.
  -- As anotações são didáticas e em português; revise manualmente antes de alterações em produção.
*/

import Layout from "@/components/Layout";
// Importa utilitários de roteamento (react-router) para navegação entre páginas.
import { useLocation } from "react-router-dom";
// Importa hooks/funções do 'react' (useState, useEffect, useContext, etc.).
import { useEffect } from "react";

// Declara o componente/funcão 'NotFound' como arrow function. É uma forma comum de definir componentes funcionais em React.
const NotFound = () => {
  const location = useLocation();

// useEffect: executa efeitos colaterais (chamadas API, timers). O array de dependências determina quando ele roda.
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
  return (
    <Layout>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Oops! Página não encontrada</p>
          <a href="/" className="text-primary underline hover:text-primary/80 transition-colors duration-200">
            Voltar ao Dashboard
          </a>
        </div>
      </div>
    </Layout>
  );
};

// Exporta este componente como exportação padrão do arquivo.
export default NotFound;
