/*
  Arquivo: planeja-dash-rebuild-main/src/pages/VerifyEmail.tsx
  Explicação: Este arquivo faz parte do frontend em React do projeto Planeja+.
  Objetivo deste arquivo: (descrição curta abaixo).

  Comentários inseridos automaticamente para ajudar iniciantes a entender o fluxo.
  -- As anotações são didáticas e em português; revise manualmente antes de alterações em produção.
*/

// Importa o React — biblioteca base para componentes React.
import React, { useState, useEffect } from 'react';
// Importa utilitários de roteamento (react-router) para navegação entre páginas.
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, RefreshCw, Check, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

// Declara o componente/funcão 'VerifyEmail' como arrow function. É uma forma comum de definir componentes funcionais em React.
const VerifyEmail = () => {
// useNavigate (react-router): hook para navegar programaticamente entre rotas.
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const { 
    user, 
    verifyEmail, 
    resendVerificationEmail, 
    isLoading, 
    isEmailVerified 
  } = useAuth();
  
// Declaração de estado com setter — padrão: const [valor, setValor] = useState(...).
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error' | 'expired'>('pending');
// useState: declara estado local deste componente. Ex.: const [x, setX] = useState(initial).
  const [canResend, setCanResend] = useState(true);
// useState: declara estado local deste componente. Ex.: const [x, setX] = useState(initial).
  const [resendCountdown, setResendCountdown] = useState(0);
// useState: declara estado local deste componente. Ex.: const [x, setX] = useState(initial).
  const [autoVerifyAttempted, setAutoVerifyAttempted] = useState(false);

  // Auto-verificar se há token na URL
// useEffect: executa efeitos colaterais (chamadas API, timers). O array de dependências determina quando ele roda.
  useEffect(() => {
    if (token && !autoVerifyAttempted) {
      setAutoVerifyAttempted(true);
      handleTokenVerification(token);
    }
  }, [token, autoVerifyAttempted]);

  // Redirecionar se já estiver verificado
// useEffect: executa efeitos colaterais (chamadas API, timers). O array de dependências determina quando ele roda.
  useEffect(() => {
    if (isEmailVerified && verificationStatus === 'success') {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [isEmailVerified, verificationStatus, navigate]);

  const handleTokenVerification = async (verificationToken: string) => {
    try {
      // Simular validação de token
      const isValidToken = verificationToken === 'valid-token-123';
      const isExpiredToken = verificationToken === 'expired-token-456';
      
      if (isExpiredToken) {
        setVerificationStatus('expired');
        return;
      }
      
      if (!isValidToken) {
        setVerificationStatus('error');
        return;
      }
      
      await verifyEmail(verificationToken);
      setVerificationStatus('success');
    } catch (error) {
      setVerificationStatus('error');
    }
  };

// Declara o componente/funcão 'startResendCountdown' como arrow function. É uma forma comum de definir componentes funcionais em React.
  const startResendCountdown = () => {
    setCanResend(false);
    setResendCountdown(60);
    
    const timer = setInterval(() => {
      setResendCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendEmail = async () => {
    if (!canResend) return;
    
    try {
      await resendVerificationEmail();
      startResendCountdown();
    } catch (error) {
      // Erro já tratado no contexto
    }
  };

  const handleManualVerification = async () => {
    try {
      await verifyEmail('simulated-manual-verification');
      setVerificationStatus('success');
    } catch (error) {
      setVerificationStatus('error');
    }
  };

  // Se não há usuário logado, redirecionar para registro
  if (!user) {
// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 text-center space-y-4">
            <AlertCircle className="mx-auto w-12 h-12 text-amber-500" />
            <h2 className="text-xl font-semibold">Sessão não encontrada</h2>
            <p className="text-muted-foreground">
              Para verificar seu e-mail, você precisa estar logado.
            </p>
            <div className="space-y-2">
              <Link to="/login">
                <Button className="w-full">Fazer login</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="w-full">Criar nova conta</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Status: Verificação bem-sucedida
  if (verificationStatus === 'success' || isEmailVerified) {
// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <Card className="shadow-card-hover transition-all duration-300">
            <CardContent className="pt-8 text-center space-y-6">
              {/* Success Animation */}
              <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center animate-scale-in">
                <Check className="w-10 h-10 text-green-600 animate-fade-in" />
              </div>
              
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground">E-mail verificado! 🎉</h1>
                <p className="text-muted-foreground">
                  Sua conta foi ativada com sucesso
                </p>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Conta ativa
                </Badge>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <h3 className="font-medium text-sm">✨ Próximos passos</h3>
                <ul className="text-sm text-muted-foreground text-left space-y-1">
                  <li>• Complete seu perfil</li>
                  <li>• Crie sua primeira equipe</li>
                  <li>• Configure suas preferências</li>
                  <li>• Comece a criar tarefas</li>
                </ul>
              </div>

              <div className="space-y-3">
// onClick: handler para eventos de clique. Normalmente chama uma função que altera estado ou navega.
                <Button onClick={() => navigate('/')} className="w-full">
                  Ir para o Dashboard
                </Button>
                
                <div className="text-xs text-muted-foreground">
                  Redirecionando automaticamente em 3 segundos...
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Welcome Card */}
          <Card className="border-green-500/20 bg-green-50/10">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="font-medium">Bem-vindo ao Planeja+!</h3>
                <p className="text-sm text-muted-foreground">
                  Sua jornada de produtividade começa agora
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Status: Token expirado
  if (verificationStatus === 'expired') {
// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-amber-600" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Link expirado</h2>
              <p className="text-muted-foreground">
                O link de verificação expirou. Solicite um novo link para continuar.
              </p>
            </div>

// onClick: handler para eventos de clique. Normalmente chama uma função que altera estado ou navega.
            <Button onClick={handleResendEmail} disabled={!canResend || isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar novo link'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Status: Erro na verificação
  if (verificationStatus === 'error') {
// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Erro na verificação</h2>
              <p className="text-muted-foreground">
                Link inválido ou já usado. Solicite um novo link de verificação.
              </p>
            </div>

            <div className="space-y-3">
// onClick: handler para eventos de clique. Normalmente chama uma função que altera estado ou navega.
              <Button onClick={handleResendEmail} disabled={!canResend || isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar novo link'
                )}
              </Button>
              
              <Link to="/login">
                <Button variant="outline" className="w-full">Voltar ao login</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Status: Aguardando verificação (padrão)
// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Card className="shadow-card-hover transition-all duration-300">
          <CardContent className="pt-8 text-center space-y-6">
            {/* Email Icon */}
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Verifique seu e-mail</h1>
              <p className="text-muted-foreground">
                Enviamos um link de verificação para:
              </p>
              <p className="font-medium text-foreground">{user.email}</p>
              
              <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                Aguardando verificação
              </Badge>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 text-left space-y-2">
              <h3 className="font-medium text-sm">📧 Instruções</h3>
              <ol className="text-sm text-muted-foreground space-y-1">
                <li>1. Abra seu e-mail</li>
                <li>2. Procure por "Verificação de conta - Planeja+"</li>
                <li>3. Clique no botão "Verificar e-mail"</li>
                <li>4. Volte aqui para continuar</li>
              </ol>
            </div>

            <div className="space-y-3">
              {/* Manual Verification Button */}
              <Button
// onClick: handler para eventos de clique. Normalmente chama uma função que altera estado ou navega.
                onClick={handleManualVerification}
                variant="default"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Já confirmei meu e-mail
                  </>
                )}
              </Button>

              {/* Resend Button */}
              <Button
// onClick: handler para eventos de clique. Normalmente chama uma função que altera estado ou navega.
                onClick={handleResendEmail}
                variant="outline"
                disabled={!canResend || isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Reenviando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reenviar e-mail
                    {!canResend && ` (${resendCountdown}s)`}
                  </>
                )}
              </Button>
            </div>

            <div className="text-center space-y-2">
              <p className="text-xs text-muted-foreground">
                Não recebeu o e-mail? Verifique sua pasta de spam
              </p>
              <Link 
                to="/support" 
                className="text-xs text-primary hover:text-primary/80 underline"
              >
                Ainda com problemas? Entre em contato
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Debug Panel (Simulação) */}
        <Card className="border-dashed border-2 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <h4 className="font-medium text-sm">🔧 Painel de demonstração</h4>
              <p className="text-xs text-muted-foreground">
                Simular diferentes cenários de verificação
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="ghost"
                  size="sm"
// onClick: handler para eventos de clique. Normalmente chama uma função que altera estado ou navega.
                  onClick={() => handleTokenVerification('valid-token-123')}
                  className="text-xs"
                >
                  ✅ Link válido
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
// onClick: handler para eventos de clique. Normalmente chama uma função que altera estado ou navega.
                  onClick={() => handleTokenVerification('expired-token-456')}
                  className="text-xs"
                >
                  ⏰ Link expirado
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
// onClick: handler para eventos de clique. Normalmente chama uma função que altera estado ou navega.
                  onClick={() => handleTokenVerification('invalid-token-789')}
                  className="text-xs"
                >
                  ❌ Link inválido
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
// onClick: handler para eventos de clique. Normalmente chama uma função que altera estado ou navega.
                  onClick={() => setVerificationStatus('pending')}
                  className="text-xs"
                >
                  🔄 Resetar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Exporta este componente como exportação padrão do arquivo.
export default VerifyEmail;
