interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  icon?: string;
}

export default function MetricCard({ title, value, subtitle, trend, icon }: MetricCardProps) {
  const isPositive = trend?.startsWith('+');
  
  return (
    <div className="bg-robovm-border rounded-lg p-6 border border-robovm-border/50 hover:border-robovm-accent/50 transition-all">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-robovm-text-secondary text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-robovm-accent">{value}</p>
        </div>
        {icon && (
          <span className="text-3xl opacity-70">{icon}</span>
        )}
      </div>
      {subtitle && (
        <p className="text-robovm-text-secondary text-xs mb-1">{subtitle}</p>
      )}
      {trend && (
        <p className={`text-xs ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {trend} from last period
        </p>
      )}
    </div>
  );
}

