/*
  Arquivo: planeja-dash-rebuild-main/src/contexts/AuthContext.tsx
  Explicação: Este arquivo faz parte do frontend em React do projeto Planeja+.
  Objetivo deste arquivo: (descrição curta abaixo).

  Comentários inseridos automaticamente para ajudar iniciantes a entender o fluxo.
  -- As anotações são didáticas e em português; revise manualmente antes de alterações em produção.
*/

// Importa o React — biblioteca base para componentes React.
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  displayName?: string;
  phone?: string;
  role?: string;
  company?: string;
  avatar?: string;
  emailVerified: boolean;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: (token?: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  isEmailVerified: boolean;
  loginAttempts: number;
  isBlocked: boolean;
  blockTimeRemaining: number;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  displayName?: string;
  phone?: string;
  role?: string;
  company?: string;
  preferences?: {
    emailTips: boolean;
    emailReports: boolean;
    newsletter: boolean;
  };
}

const AuthContext = createContext<AuthContextType | null>(null);

// Simulação de base de dados local
const MOCK_USERS_KEY = 'planeja_mock_users';
const CURRENT_USER_KEY = 'planeja_current_user';
const LOGIN_ATTEMPTS_KEY = 'planeja_login_attempts';

// Usuário de demonstração
const DEMO_USER: User = {
  id: 'demo-user-1',
  name: 'João Silva',
  email: 'joao@exemplo.com',
  displayName: 'João',
  role: 'Gerente de Projetos',
  company: 'Empresa Demo',
  emailVerified: true,
  createdAt: new Date('2024-01-15'),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// Declaração de estado com setter — padrão: const [valor, setValor] = useState(...).
  const [user, setUser] = useState<User | null>(null);
// useState: declara estado local deste componente. Ex.: const [x, setX] = useState(initial).
  const [isLoading, setIsLoading] = useState(false);
// useState: declara estado local deste componente. Ex.: const [x, setX] = useState(initial).
  const [loginAttempts, setLoginAttempts] = useState(0);
// useState: declara estado local deste componente. Ex.: const [x, setX] = useState(initial).
  const [isBlocked, setIsBlocked] = useState(false);
// useState: declara estado local deste componente. Ex.: const [x, setX] = useState(initial).
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0);
// useState: declara estado local deste componente. Ex.: const [x, setX] = useState(initial).
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const { toast } = useToast();

  // Carregar usuário do localStorage ao inicializar
// useEffect: executa efeitos colaterais (chamadas API, timers). O array de dependências determina quando ele roda.
  useEffect(() => {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    const attempts = localStorage.getItem(LOGIN_ATTEMPTS_KEY);
    
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsEmailVerified(userData.emailVerified);
    }
    
    if (attempts) {
      const attemptsData = JSON.parse(attempts);
      if (attemptsData.count >= 5 && Date.now() - attemptsData.timestamp < 120000) {
        setIsBlocked(true);
        setLoginAttempts(attemptsData.count);
        startBlockTimer(120000 - (Date.now() - attemptsData.timestamp));
      }
    }
  }, []);

// Declara o componente/funcão 'startBlockTimer' como arrow function. É uma forma comum de definir componentes funcionais em React.
  const startBlockTimer = (initialTime: number) => {
    setBlockTimeRemaining(Math.ceil(initialTime / 1000));
    const timer = setInterval(() => {
      setBlockTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsBlocked(false);
          setLoginAttempts(0);
          localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const simulateDelay = (ms: number = 1500) => new Promise(resolve => setTimeout(resolve, ms));

  const login = async (email: string, password: string, rememberMe?: boolean) => {
    if (isBlocked) {
      throw new Error(`Muitas tentativas de login. Tente novamente em ${blockTimeRemaining} segundos.`);
    }

    setIsLoading(true);
    
    try {
      await simulateDelay();
      
      // Simular validação de credenciais
      const isValidCredential = (
        (email === 'joao@exemplo.com' || email === 'joao') && password === '123456789A@' ||
        (email === 'demo@planeja.com' || email === 'demo') && password === 'Demo123!'
      );

      if (!isValidCredential) {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        localStorage.setItem(LOGIN_ATTEMPTS_KEY, JSON.stringify({
          count: newAttempts,
          timestamp: Date.now()
        }));

        if (newAttempts >= 5) {
          setIsBlocked(true);
          startBlockTimer(120000); // 2 minutos
          throw new Error('Muitas tentativas de login. Conta temporariamente bloqueada por 2 minutos.');
        }
        
        throw new Error('E-mail ou senha incorretos');
      }

      // Login bem-sucedido
      const loggedUser = { ...DEMO_USER };
      if (!loggedUser.emailVerified) {
        throw new Error('Conta não verificada. Verifique seu e-mail antes de continuar.');
      }

      setUser(loggedUser);
      setIsEmailVerified(true);
      setLoginAttempts(0);
      localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
      
      if (rememberMe) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(loggedUser));
      }
      
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo de volta, ${loggedUser.name}`,
      });

    } catch (error) {
      toast({
        title: "Erro no login",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    
    try {
      await simulateDelay(2000);
      
      // Simular verificação de e-mail existente
      if (userData.email === 'joao@exemplo.com' || userData.email === 'teste@existe.com') {
        throw new Error('E-mail já cadastrado. Faça login ou recupere sua senha.');
      }

      // Criar novo usuário
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        displayName: userData.displayName,
        phone: userData.phone,
        role: userData.role,
        company: userData.company,
        emailVerified: false,
        createdAt: new Date(),
      };

      // Salvar na "base de dados" local
      const existingUsers = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
      existingUsers.push(newUser);
      localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(existingUsers));
      
      setUser(newUser);
      setIsEmailVerified(false);
      
      toast({
        title: "Conta criada com sucesso!",
        description: "Verifique seu e-mail para ativar sua conta.",
      });

    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

// Declara o componente/funcão 'logout' como arrow function. É uma forma comum de definir componentes funcionais em React.
  const logout = () => {
    setUser(null);
    setIsEmailVerified(false);
    localStorage.removeItem(CURRENT_USER_KEY);
    
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    
    try {
      await simulateDelay();
      
      // Simular envio de e-mail
      toast({
        title: "E-mail de recuperação enviado!",
        description: "Verifique sua caixa de entrada e spam.",
      });

    } catch (error) {
      toast({
        title: "Erro ao enviar e-mail",
        description: "Tente novamente em alguns minutos.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (token?: string) => {
    setIsLoading(true);
    
    try {
      await simulateDelay();
      
      if (user) {
        const updatedUser = { ...user, emailVerified: true };
        setUser(updatedUser);
        setIsEmailVerified(true);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
        
        toast({
          title: "E-mail verificado!",
          description: "Sua conta foi ativada com sucesso.",
        });
      }

    } catch (error) {
      toast({
        title: "Erro na verificação",
        description: "Link inválido ou expirado.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    setIsLoading(true);
    
    try {
      await simulateDelay();
      
      toast({
        title: "E-mail reenviado!",
        description: "Verifique sua caixa de entrada em alguns minutos.",
      });

    } catch (error) {
      toast({
        title: "Erro ao reenviar",
        description: "Tente novamente em alguns minutos.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        resetPassword,
        verifyEmail,
        resendVerificationEmail,
        isEmailVerified,
        loginAttempts,
        isBlocked,
        blockTimeRemaining,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
// useContext: consome dados de um contexto React (estado global/injetado).
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
