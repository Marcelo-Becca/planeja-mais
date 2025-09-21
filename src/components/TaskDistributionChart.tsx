/*
  Arquivo: planeja-dash-rebuild-main/src/components/TaskDistributionChart.tsx
  Explicação: Este arquivo faz parte do frontend em React do projeto Planeja+.
  Objetivo deste arquivo: (descrição curta abaixo).

  Comentários inseridos automaticamente para ajudar iniciantes a entender o fluxo.
  -- As anotações são didáticas e em português; revise manualmente antes de alterações em produção.
*/

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

interface TaskDistributionData {
  name: string;
  value: number;
  color: string;
}

interface TaskDistributionChartProps {
  data: TaskDistributionData[];
  onSegmentClick?: (category: string) => void;
}

const chartConfig = {
  completed: {
    label: "Concluídas",
    color: "hsl(var(--chart-1))",
  },
  inProgress: {
    label: "Em andamento",
    color: "hsl(var(--chart-2))",
  },
  pending: {
    label: "Pendentes",
    color: "hsl(var(--chart-3))",
  },
  overdue: {
    label: "Atrasadas",
    color: "hsl(var(--chart-4))",
  },
};

// Exporta este componente como exportação padrão do arquivo.
export default function TaskDistributionChart({ data, onSegmentClick }: TaskDistributionChartProps) {
// Declara o componente/funcão 'CustomTooltip' como arrow function. É uma forma comum de definir componentes funcionais em React.
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-popover-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {data.value} tarefas ({((data.value / data.payload.total) * 100).toFixed(1)}%)
          </p>
          {onSegmentClick && (
            <p className="text-xs text-muted-foreground mt-2 border-t pt-2">
              Clique para ver detalhes
            </p>
          )}
        </div>
      );
    }
    return null;
  };

// Declara o componente/funcão 'CustomLabel' como arrow function. É uma forma comum de definir componentes funcionais em React.
  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
    return (
      <text 
        x={x} 
        y={y} 
        fill="hsl(var(--background))" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

// Declara o componente/funcão 'getCategoryKey' como arrow function. É uma forma comum de definir componentes funcionais em React.
  const getCategoryKey = (name: string) => {
    switch (name) {
      case "Concluídas": return "completed";
      case "Em andamento": return "inProgress";
      case "Pendentes": return "pending";
      case "Atrasadas": return "overdue";
      default: return "pending";
    }
  };

// Declara o componente/funcão 'handleCellClick' como arrow function. É uma forma comum de definir componentes funcionais em React.
  const handleCellClick = (entry: any) => {
    if (onSegmentClick) {
      const categoryKey = getCategoryKey(entry.name);
      onSegmentClick(categoryKey);
    }
  };

  // Calculate total for percentage
  const total = data.reduce((sum, item) => sum + item.value, 0);
// map: itera sobre um array para renderizar listas de elementos (cada item precisa de uma 'key' única).
  const dataWithTotal = data.map(item => ({ ...item, total }));

// return: estrutura JSX que será renderizada pelo componente. Contém a marcação/estrutura da UI.
  return (
    <div className="p-6 bg-card border border-border rounded-lg">
      <ChartContainer config={chartConfig} className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataWithTotal}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
// map: itera sobre um array para renderizar listas de elementos (cada item precisa de uma 'key' única).
              {dataWithTotal.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  className={onSegmentClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}
// onClick: handler para eventos de clique. Normalmente chama uma função que altera estado ou navega.
                  onClick={() => handleCellClick(entry)}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              wrapperStyle={{ 
                paddingTop: '20px',
                fontSize: '12px',
                color: 'hsl(var(--muted-foreground))'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
