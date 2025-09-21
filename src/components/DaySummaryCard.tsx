/*
  Arquivo: planeja-dash-rebuild-main/src/components/DaySummaryCard.tsx
  Explicação: Este arquivo faz parte do frontend em React do projeto Planeja+.
  Objetivo deste arquivo: (descrição curta abaixo).

  Comentários inseridos automaticamente para ajudar iniciantes a entender o fluxo.
  -- As anotações são didáticas e em português; revise manualmente antes de alterações em produção.
*/

// Importa utilitários de roteamento (react-router) para navegação entre páginas.
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Target, Calendar } from "lucide-react";
import DashboardCard from "./DashboardCard";

const summaryItems = [
  {
    id: 1,
    type: "completed",
    icon: CheckCircle,
    text: "Concluída a revisão do ",
    highlight: "Projeto Alpha",
    time: "há 2 horas",
    link: "/projects/1"
  },
  {
    id: 2,
    type: "upcoming", 
    icon: Calendar,
    text: "Reunião agendada com ",
    highlight: "Equipe de Design",
    time: "às 15:30",
    link: "/projects/2"
  },
  {
    id: 3,
    type: "target",
    icon: Target,
    text: "Nova meta criada: ",
    highlight: "Finalizar protótipo",
    time: "hoje",
    link: "/tasks/1"
  },
  {
    id: 4,
    type: "in-progress",
    icon: Clock,
    text: "Em andamento: ",
    highlight: "Análise de métricas", 
    time: "iniciado ontem",
    link: "/tasks/3"
  },
  {
    id: 5,
    type: "completed",
    icon: CheckCircle,
    text: "Tarefa finalizada: ",
    highlight: "Update do dashboard",
    time: "há 30 min",
    link: "/tasks/2"
  }
];

// Declara o componente/funcão 'getIconColor' como arrow function. É uma forma comum de definir componentes funcionais em React.
const getIconColor = (type: string) => {
  switch (type) {
    case "completed":
      return "text-primary";
    case "upcoming":
      return "text-progress-secondary";
    case "target":
      return "text-accent";
    case "in-progress":
      return "text-muted-foreground";
    default:
      return "text-muted-foreground";
  }
};

// Exporta este componente como exportação padrão do arquivo.
export default function DaySummaryCard() {
// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
  return (
    <DashboardCard title="Resumo do dia">
      <div className="space-y-4">
// map: itera sobre um array para renderizar listas de elementos (cada item precisa de uma 'key' única).
        {summaryItems.map((item, index) => {
          const Icon = item.icon;
          
// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
          return (
            <div 
              key={item.id}
              className="flex items-start space-x-3 group hover:bg-hover rounded-lg p-2 -m-2 transition-all duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5">
                <Icon className={`w-4 h-4 ${getIconColor(item.type)}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-card-foreground">
                  {item.text}
                  <Link 
                    to={item.link}
                    className="text-primary hover:text-primary/80 font-medium transition-colors duration-200 cursor-pointer hover:underline"
                  >
                    {item.highlight}
                  </Link>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.time}
                </p>
              </div>
            </div>
          );
        })}

        {/* View all button */}
        <div className="pt-3 border-t border-border">
          <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200 hover:underline">
            Ver todas as atividades →
          </button>
        </div>
      </div>
    </DashboardCard>
  );
}
