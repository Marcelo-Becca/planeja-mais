/*
  Arquivo: planeja-dash-rebuild-main/src/components/TaskDetailPanel.tsx
  Explicação: Este arquivo faz parte do frontend em React do projeto Planeja+.
  Objetivo deste arquivo: (descrição curta abaixo).

  Comentários inseridos automaticamente para ajudar iniciantes a entender o fluxo.
  -- As anotações são didáticas e em português; revise manualmente antes de alterações em produção.
*/

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock } from "lucide-react";

interface Task {
  id: string;
  title: string;
  project?: string;
  assignee?: string;
  completedAt?: string;
  dueDate?: string;
  startedAt?: string;
  createdAt?: string;
}

interface TaskDetailPanelProps {
  isOpen: boolean;
  category: string | null;
  tasks: Task[];
  onClose: () => void;
}

// Exporta este componente como exportação padrão do arquivo.
export default function TaskDetailPanel({ isOpen, category, tasks, onClose }: TaskDetailPanelProps) {
// Declara o componente/funcão 'getCategoryTitle' como arrow function. É uma forma comum de definir componentes funcionais em React.
  const getCategoryTitle = (cat: string | null) => {
    switch (cat) {
      case "completed": return "Tarefas Concluídas";
      case "overdue": return "Tarefas Atrasadas";
      case "inProgress": return "Tarefas Em Andamento";
      case "pending": return "Tarefas Pendentes";
      default: return "Tarefas";
    }
  };

// Declara o componente/funcão 'getCategoryColor' como arrow function. É uma forma comum de definir componentes funcionais em React.
  const getCategoryColor = (cat: string | null) => {
    switch (cat) {
      case "completed": return "bg-chart-1/20 text-chart-1 border-chart-1/30";
      case "overdue": return "bg-chart-4/20 text-chart-4 border-chart-4/30";
      case "inProgress": return "bg-chart-2/20 text-chart-2 border-chart-2/30";
      case "pending": return "bg-chart-3/20 text-chart-3 border-chart-3/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getCategoryTitle(category)}
            <Badge variant="secondary" className={getCategoryColor(category)}>
              {tasks.length} tarefas
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto space-y-3 mt-4">
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhuma tarefa encontrada nesta categoria</p>
            </div>
          ) : (
// map: itera sobre um array para renderizar listas de elementos (cada item precisa de uma 'key' única).
            tasks.map((task) => (
              <div key={task.id} className="p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                <div className="space-y-2">
                  <h4 className="font-medium text-card-foreground">{task.title}</h4>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {task.project && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{task.project}</span>
                      </div>
                    )}
                    
                    {task.assignee && (
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{task.assignee}</span>
                      </div>
                    )}
                    
                    {(task.completedAt || task.dueDate || task.startedAt || task.createdAt) && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {task.completedAt && `Concluída em ${new Date(task.completedAt).toLocaleDateString('pt-BR')}`}
                          {task.dueDate && `Vence em ${new Date(task.dueDate).toLocaleDateString('pt-BR')}`}
                          {task.startedAt && `Iniciada em ${new Date(task.startedAt).toLocaleDateString('pt-BR')}`}
                          {task.createdAt && `Criada em ${new Date(task.createdAt).toLocaleDateString('pt-BR')}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
