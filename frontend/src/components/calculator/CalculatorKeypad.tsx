import { Delete } from 'lucide-react';

interface CalculatorKeypadProps {
  onDigit: (digit: string) => void;
  onDecimal: () => void;
  onOperator: (operator: string) => void;
  onEquals: () => void;
  onClear: () => void;
  onBackspace: () => void;
}

type ButtonType = 'digit' | 'operator' | 'equals' | 'clear' | 'backspace';

interface KeyConfig {
  label: string;
  value: string;
  type: ButtonType;
  icon?: React.ReactNode;
  ariaLabel?: string;
}

const keys: KeyConfig[][] = [
  [
    { label: 'AC', value: 'clear', type: 'clear', ariaLabel: 'All Clear' },
    { label: '', value: 'backspace', type: 'backspace', icon: <Delete className="h-5 w-5" />, ariaLabel: 'Backspace' },
    { label: '÷', value: '÷', type: 'operator', ariaLabel: 'Divide' },
  ],
  [
    { label: '7', value: '7', type: 'digit' },
    { label: '8', value: '8', type: 'digit' },
    { label: '9', value: '9', type: 'digit' },
    { label: '×', value: '×', type: 'operator', ariaLabel: 'Multiply' },
  ],
  [
    { label: '4', value: '4', type: 'digit' },
    { label: '5', value: '5', type: 'digit' },
    { label: '6', value: '6', type: 'digit' },
    { label: '−', value: '−', type: 'operator', ariaLabel: 'Subtract' },
  ],
  [
    { label: '1', value: '1', type: 'digit' },
    { label: '2', value: '2', type: 'digit' },
    { label: '3', value: '3', type: 'digit' },
    { label: '+', value: '+', type: 'operator', ariaLabel: 'Add' },
  ],
  [
    { label: '0', value: '0', type: 'digit' },
    { label: '.', value: '.', type: 'digit', ariaLabel: 'Decimal point' },
    { label: '=', value: '=', type: 'equals', ariaLabel: 'Equals' },
  ],
];

export function CalculatorKeypad({
  onDigit,
  onDecimal,
  onOperator,
  onEquals,
  onClear,
  onBackspace,
}: CalculatorKeypadProps) {
  const handleKeyPress = (key: KeyConfig) => {
    switch (key.type) {
      case 'digit':
        if (key.value === '.') {
          onDecimal();
        } else {
          onDigit(key.value);
        }
        break;
      case 'operator':
        onOperator(key.value);
        break;
      case 'equals':
        onEquals();
        break;
      case 'clear':
        onClear();
        break;
      case 'backspace':
        onBackspace();
        break;
    }
  };

  const getButtonStyles = (type: ButtonType, isLastInRow: boolean = false) => {
    const baseStyles =
      'h-16 rounded-lg font-medium text-lg transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

    switch (type) {
      case 'operator':
      case 'equals':
        return `${baseStyles} bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm ${
          isLastInRow ? 'col-span-2' : ''
        }`;
      case 'clear':
      case 'backspace':
        return `${baseStyles} bg-destructive/10 text-destructive hover:bg-destructive/20`;
      default:
        return `${baseStyles} bg-secondary text-secondary-foreground hover:bg-secondary/80 ${
          isLastInRow ? 'col-span-2' : ''
        }`;
    }
  };

  return (
    <div className="grid grid-cols-4 gap-3">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="col-span-4 grid grid-cols-4 gap-3">
          {row.map((key) => {
            const isLastInRow = rowIndex === keys.length - 1 && key.value === '0';
            return (
              <button
                key={key.value}
                onClick={() => handleKeyPress(key)}
                className={getButtonStyles(key.type, isLastInRow)}
                aria-label={key.ariaLabel || key.label}
              >
                {key.icon || key.label}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
