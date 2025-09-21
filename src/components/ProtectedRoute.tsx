/*
  Arquivo: planeja-dash-rebuild-main/src/components/ProtectedRoute.tsx
  Explicação: Este arquivo faz parte do frontend em React do projeto Planeja+.
  Objetivo deste arquivo: (descrição curta abaixo).

  Comentários inseridos automaticamente para ajudar iniciantes a entender o fluxo.
  -- As anotações são didáticas e em português; revise manualmente antes de alterações em produção.
*/

// Importa o React — biblioteca base para componentes React.
import React from 'react';
// Importa utilitários de roteamento (react-router) para navegação entre páginas.
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // Show loading screen while checking auth status
// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated
// return: retorno JSX (abreviado) — contém os elementos visuais do componente.
    return <Navigate to="/login" replace />;
  }

  // Render protected content if authenticated
// return: retorno JSX (abreviado) — contém os elementos visuais do componente.
  return <>{children}</>;
};

// Exporta este componente como exportação padrão do arquivo.
export default ProtectedRoute;
