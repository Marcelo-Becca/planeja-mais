/*
  Arquivo: planeja-dash-rebuild-main/src/pages/Login.tsx
  Explicação: Este arquivo faz parte do frontend em React do projeto Planeja+.
  Objetivo deste arquivo: (descrição curta abaixo).

  Comentários inseridos automaticamente para ajudar iniciantes a entender o fluxo.
  -- As anotações são didáticas e em português; revise manualmente antes de alterações em produção.
*/

// Importa o React — biblioteca base para componentes React.
import React, { useState, useEffect } from 'react';
// Importa utilitários de roteamento (react-router) para navegação entre páginas.
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

// Declara o componente/funcão 'Login' como arrow function. É uma forma comum de definir componentes funcionais em React.
const Login = () => {
// useNavigate (react-router): hook para navegar programaticamente entre rotas.
  const navigate = useNavigate();
  const { login, isLoading, loginAttempts, isBlocked, blockTimeRemaining } = useAuth();
  
// useState: declara estado local deste componente. Ex.: const [x, setX] = useState(initial).
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
// useState: declara estado local deste componente. Ex.: const [x, setX] = useState(initial).
  const [showPassword, setShowPassword] = useState(false);
// Declaração de estado com setter — padrão: const [valor, setValor] = useState(...).
  const [errors, setErrors] = useState<Record<string, string>>({});
// useState: declara estado local deste componente. Ex.: const [x, setX] = useState(initial).
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validação em tempo real
// Declara o componente/funcão 'validateEmail' como arrow function. É uma forma comum de definir componentes funcionais em React.
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'E-mail é obrigatório';
    if (!emailRegex.test(email) && !email.includes('@')) return '';
    if (!emailRegex.test(email)) return 'Formato de e-mail inválido';
    return '';
  };

// Declara o componente/funcão 'validatePassword' como arrow function. É uma forma comum de definir componentes funcionais em React.
  const validatePassword = (password: string) => {
    if (!password) return 'Senha é obrigatória';
    if (password.length < 6) return 'Senha deve ter pelo menos 6 caracteres';
    return '';
  };

// Declara o componente/funcão 'handleInputChange' como arrow function. É uma forma comum de definir componentes funcionais em React.
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) return;
    
    // Validações
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    
    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await login(formData.email, formData.password, formData.rememberMe);
      navigate('/');
    } catch (error) {
      // Erros já tratados no contexto
    } finally {
      setIsSubmitting(false);
    }
  };

// Declara o componente/funcão 'handleQuickFill' como arrow function. É uma forma comum de definir componentes funcionais em React.
  const handleQuickFill = () => {
    setFormData({
      email: 'joao@exemplo.com',
      password: '123456789A@',
      rememberMe: false,
    });
  };

// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Entrar no Planeja+</h1>
          <p className="text-muted-foreground">Acesse sua conta para gerenciar projetos e tarefas</p>
        </div>

        <Card className="shadow-card-hover transition-all duration-300">
          <CardHeader className="pb-6">
            {/* Modo demonstrativo tag */}
            <div className="text-center mb-4">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800 border border-amber-200">
                🔧 Modo demonstrativo: fluxos simulados
              </span>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* E-mail Field */}
              <div className="space-y-2">
                <Label htmlFor="email">E-mail ou usuário</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="text"
                    placeholder="seu@email.com ou usuario"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={(e) => {
                      const error = validateEmail(e.target.value);
                      if (error) setErrors(prev => ({ ...prev, email: error }));
                    }}
                    className={cn(
                      "pl-10 transition-colors",
                      errors.email && "border-destructive"
                    )}
                    disabled={isSubmitting || isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive animate-fade-in">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Esqueci minha senha
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    onBlur={(e) => {
                      const error = validatePassword(e.target.value);
                      if (error) setErrors(prev => ({ ...prev, password: error }));
                    }}
                    className={cn(
                      "pl-10 pr-10 transition-colors",
                      errors.password && "border-destructive"
                    )}
                    disabled={isSubmitting || isLoading}
                  />
                  <button
                    type="button"
// onClick: handler para eventos de clique. Normalmente chama uma função que altera estado ou navega.
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive animate-fade-in">{errors.password}</p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => handleInputChange('rememberMe', checked as boolean)}
                />
                <Label 
                  htmlFor="remember" 
                  className="text-sm cursor-pointer"
                  title="Não recomendado em computadores públicos"
                >
                  Lembrar de mim
                </Label>
              </div>

              {/* Block Warning */}
              {isBlocked && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3 text-sm text-destructive animate-fade-in">
                  Muitas tentativas de login. Tente novamente em {blockTimeRemaining} segundos.
                </div>
              )}

              {/* Attempts Warning */}
              {loginAttempts > 0 && loginAttempts < 5 && !isBlocked && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-md p-3 text-sm text-amber-600">
                  Tentativa {loginAttempts} de 5. Após 5 tentativas, sua conta será bloqueada temporariamente.
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting || isLoading || isBlocked}
              >
                {isSubmitting || isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>

            {/* Demo Helper */}
            <div className="mt-4 pt-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
// onClick: handler para eventos de clique. Normalmente chama uma função que altera estado ou navega.
                onClick={handleQuickFill}
                className="w-full text-xs"
              >
                💡 Preencher dados de demonstração
              </Button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-muted-foreground mt-4">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-primary hover:text-primary/80 transition-colors font-medium">
                Criar conta
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Exporta este componente como exportação padrão do arquivo.
export default Login;
