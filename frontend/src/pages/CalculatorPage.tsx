import { useEffect } from 'react';
import { useCalculatorEngine } from '../hooks/useCalculatorEngine';
import { CalculatorDisplay } from '../components/calculator/CalculatorDisplay';
import { CalculatorKeypad } from '../components/calculator/CalculatorKeypad';
import { Heart } from 'lucide-react';

export default function CalculatorPage() {
  const {
    display,
    error,
    handleDigit,
    handleDecimal,
    handleOperator,
    handleEquals,
    handleClear,
    handleBackspace,
  } = useCalculatorEngine();

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      // Prevent default for calculator keys
      if (/^[0-9.+\-*/=]$/.test(key) || key === 'Enter' || key === 'Escape' || key === 'Backspace') {
        event.preventDefault();
      }

      // Digits
      if (/^[0-9]$/.test(key)) {
        handleDigit(key);
      }
      // Decimal
      else if (key === '.') {
        handleDecimal();
      }
      // Operators
      else if (key === '+') {
        handleOperator('+');
      } else if (key === '-') {
        handleOperator('−');
      } else if (key === '*' || key === 'x' || key === 'X') {
        handleOperator('×');
      } else if (key === '/') {
        handleOperator('÷');
      }
      // Equals
      else if (key === '=' || key === 'Enter') {
        handleEquals();
      }
      // Clear
      else if (key === 'Escape') {
        handleClear();
      }
      // Backspace
      else if (key === 'Backspace') {
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigit, handleDecimal, handleOperator, handleEquals, handleClear, handleBackspace]);

  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname || 'calculator-app')
    : 'calculator-app';

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-semibold text-foreground">Calculator</h1>
        </div>
      </header>

      {/* Main Calculator */}
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <CalculatorDisplay value={display} error={error} />
          <CalculatorKeypad
            onDigit={handleDigit}
            onDecimal={handleDecimal}
            onOperator={handleOperator}
            onEquals={handleEquals}
            onClear={handleClear}
            onBackspace={handleBackspace}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Built with{' '}
            <Heart className="inline h-4 w-4 fill-destructive text-destructive" aria-label="love" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Calculator App
          </p>
        </div>
      </footer>
    </div>
  );
}
