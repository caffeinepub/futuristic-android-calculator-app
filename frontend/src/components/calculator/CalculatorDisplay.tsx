interface CalculatorDisplayProps {
  value: string;
  error: boolean;
}

export function CalculatorDisplay({ value, error }: CalculatorDisplayProps) {
  return (
    <div className="w-full rounded-xl bg-card p-6 shadow-soft">
      <div
        className={`text-right font-mono text-5xl font-light tracking-tight transition-colors ${
          error ? 'text-destructive' : 'text-foreground'
        }`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </div>
    </div>
  );
}
