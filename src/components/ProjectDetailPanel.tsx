/*
  Arquivo: planeja-dash-rebuild-main/src/components/ProjectDetailPanel.tsx
  Explicação: Este arquivo faz parte do frontend em React do projeto Planeja+.
  Objetivo deste arquivo: (descrição curta abaixo).

  Comentários inseridos automaticamente para ajudar iniciantes a entender o fluxo.
  -- As anotações são didáticas e em português; revise manualmente antes de alterações em produção.
*/

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Target, Clock } from "lucide-react";

interface ProjectDetailPanelProps {
  projectName: string;
  onClose: () => void;
}

// Exporta este componente como exportação padrão do arquivo.
export default function ProjectDetailPanel({ projectName }: ProjectDetailPanelProps) {
  // Mock project details based on name
// Declara o componente/funcão 'getProjectDetails' como arrow function. É uma forma comum de definir componentes funcionais em React.
  const getProjectDetails = (name: string) => {
    switch (name) {
      case "Sistema de Gestão":
        return {
          description: "Desenvolvimento de um sistema completo de gestão para pequenas empresas",
          progress: 65,
          totalTasks: 12,
          completedTasks: 8,
          pendingTasks: 4,
          deadline: "2024-12-15",
          team: ["Marina Santos", "Carlos Silva", "Ana Costa"],
          status: "Em andamento",
          tasks: [
            { title: "Implementar autenticação", status: "completed" },
            { title: "Design do dashboard", status: "completed" },
            { title: "API de usuários", status: "in-progress" },
            { title: "Testes unitários", status: "pending" },
          ]
        };
      case "App Mobile":
        return {
          description: "Aplicativo mobile para acompanhamento de tarefas e projetos",
          progress: 40,
          totalTasks: 8,
          completedTasks: 3,
          pendingTasks: 5,
          deadline: "2024-11-30",
          team: ["Carlos Silva", "Ana Costa"],
          status: "Em andamento",
          tasks: [
            { title: "Configuração inicial", status: "completed" },
            { title: "Design das telas", status: "in-progress" },
            { title: "Implementação API", status: "pending" },
          ]
        };
      default:
        return {
          description: "Projeto em desenvolvimento",
          progress: 50,
          totalTasks: 10,
          completedTasks: 5,
          pendingTasks: 5,
          deadline: "2024-12-31",
          team: ["Equipe"],
          status: "Em andamento",
          tasks: []
        };
    }
  };

  const project = getProjectDetails(projectName);

// Declara o componente/funcão 'getStatusColor' como arrow function. É uma forma comum de definir componentes funcionais em React.
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-chart-1/20 text-chart-1 border-chart-1/30";
      case "in-progress": return "bg-chart-2/20 text-chart-2 border-chart-2/30";
      case "pending": return "bg-chart-3/20 text-chart-3 border-chart-3/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

// Declara o componente/funcão 'getStatusLabel' como arrow function. É uma forma comum de definir componentes funcionais em React.
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed": return "Concluída";
      case "in-progress": return "Em andamento";
      case "pending": return "Pendente";
      default: return status;
    }
  };

// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
  return (
    <div className="space-y-6 mt-4">
      {/* Project Overview */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-2">Visão Geral</h3>
          <p className="text-muted-foreground">{project.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="w-4 h-4" />
              <span>Progresso</span>
            </div>
            <div className="space-y-1">
              <Progress value={project.progress} className="h-2" />
              <p className="text-xs text-muted-foreground">{project.progress}% concluído</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Prazo</span>
            </div>
            <p className="text-sm font-medium text-card-foreground">
              {new Date(project.deadline).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-card-foreground">Equipe</h3>
        </div>
        <div className="space-y-2">
// map: itera sobre um array para renderizar listas de elementos (cada item precisa de uma 'key' única).
          {project.team.map((member, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
// map: itera sobre um array para renderizar listas de elementos (cada item precisa de uma 'key' única).
                  {member.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-sm font-medium text-card-foreground">{member}</span>
              </div>
              {index === 0 && (
                <Badge variant="secondary" className="text-xs">Líder</Badge>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tasks Summary */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-card-foreground">Tarefas</h3>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 bg-chart-1/10 rounded border border-chart-1/20">
            <p className="text-lg font-bold text-chart-1">{project.completedTasks}</p>
            <p className="text-xs text-muted-foreground">Concluídas</p>
          </div>
          <div className="p-3 bg-chart-2/10 rounded border border-chart-2/20">
            <p className="text-lg font-bold text-chart-2">{project.pendingTasks}</p>
            <p className="text-xs text-muted-foreground">Pendentes</p>
          </div>
          <div className="p-3 bg-muted/50 rounded">
            <p className="text-lg font-bold text-card-foreground">{project.totalTasks}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
        </div>

        {/* Recent Tasks */}
        {project.tasks.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-card-foreground">Tarefas Recentes</h4>
// map: itera sobre um array para renderizar listas de elementos (cada item precisa de uma 'key' única).
            {project.tasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm">
                <span className="text-card-foreground">{task.title}</span>
                <Badge variant="secondary" className={getStatusColor(task.status)}>
                  {getStatusLabel(task.status)}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
