import { useState, useCallback } from 'react';

/**
 * Calculator evaluation model: Immediate execution (like iOS calculator)
 * 
 * Behavior:
 * - Operations execute immediately when a new operator is pressed
 * - Example: 2 + 3 × 4 = ((2 + 3) × 4) = 20
 * - Repeated equals: repeats the last operation (e.g., 5 + 3 = = = gives 5+3=8, 8+3=11, 11+3=14)
 * - AC clears all state
 * - Backspace removes last digit from current input
 * - Division by zero shows error, AC recovers
 */

type CalculatorState = {
  display: string;
  previousValue: number | null;
  currentOperator: string | null;
  waitingForOperand: boolean;
  error: boolean;
  lastOperation: { operator: string; operand: number } | null;
};

const initialState: CalculatorState = {
  display: '0',
  previousValue: null,
  currentOperator: null,
  waitingForOperand: false,
  error: false,
  lastOperation: null,
};

export function useCalculatorEngine() {
  const [state, setState] = useState<CalculatorState>(initialState);

  const performOperation = useCallback((operator: string, left: number, right: number): number | null => {
    switch (operator) {
      case '+':
        return left + right;
      case '−':
        return left - right;
      case '×':
        return left * right;
      case '÷':
        if (right === 0) return null; // Division by zero
        return left / right;
      default:
        return right;
    }
  }, []);

  const handleDigit = useCallback((digit: string) => {
    setState((prev) => {
      if (prev.error) return prev;

      if (prev.waitingForOperand) {
        return {
          ...prev,
          display: digit,
          waitingForOperand: false,
        };
      }

      const newDisplay = prev.display === '0' ? digit : prev.display + digit;
      // Limit display length
      if (newDisplay.length > 12) return prev;

      return {
        ...prev,
        display: newDisplay,
      };
    });
  }, []);

  const handleDecimal = useCallback(() => {
    setState((prev) => {
      if (prev.error) return prev;

      if (prev.waitingForOperand) {
        return {
          ...prev,
          display: '0.',
          waitingForOperand: false,
        };
      }

      if (prev.display.includes('.')) return prev;

      return {
        ...prev,
        display: prev.display + '.',
      };
    });
  }, []);

  const handleOperator = useCallback((operator: string) => {
    setState((prev) => {
      if (prev.error) return prev;

      const currentValue = parseFloat(prev.display);

      if (prev.previousValue === null) {
        return {
          ...prev,
          previousValue: currentValue,
          currentOperator: operator,
          waitingForOperand: true,
          lastOperation: null,
        };
      }

      if (prev.currentOperator && !prev.waitingForOperand) {
        const result = performOperation(prev.currentOperator, prev.previousValue, currentValue);
        
        if (result === null) {
          return {
            ...prev,
            display: 'Error',
            error: true,
            previousValue: null,
            currentOperator: null,
            waitingForOperand: false,
          };
        }

        const displayValue = String(result);
        return {
          ...prev,
          display: displayValue.length > 12 ? result.toExponential(6) : displayValue,
          previousValue: result,
          currentOperator: operator,
          waitingForOperand: true,
          lastOperation: { operator: prev.currentOperator, operand: currentValue },
        };
      }

      return {
        ...prev,
        currentOperator: operator,
        waitingForOperand: true,
      };
    });
  }, [performOperation]);

  const handleEquals = useCallback(() => {
    setState((prev) => {
      if (prev.error) return prev;

      const currentValue = parseFloat(prev.display);

      // Repeated equals: use last operation
      if (prev.waitingForOperand && prev.lastOperation) {
        const result = performOperation(
          prev.lastOperation.operator,
          currentValue,
          prev.lastOperation.operand
        );

        if (result === null) {
          return {
            ...prev,
            display: 'Error',
            error: true,
            previousValue: null,
            currentOperator: null,
            waitingForOperand: false,
          };
        }

        const displayValue = String(result);
        return {
          ...prev,
          display: displayValue.length > 12 ? result.toExponential(6) : displayValue,
          previousValue: result,
          waitingForOperand: true,
        };
      }

      if (prev.currentOperator && prev.previousValue !== null) {
        const result = performOperation(prev.currentOperator, prev.previousValue, currentValue);

        if (result === null) {
          return {
            ...prev,
            display: 'Error',
            error: true,
            previousValue: null,
            currentOperator: null,
            waitingForOperand: false,
          };
        }

        const displayValue = String(result);
        return {
          ...prev,
          display: displayValue.length > 12 ? result.toExponential(6) : displayValue,
          previousValue: result,
          currentOperator: null,
          waitingForOperand: true,
          lastOperation: { operator: prev.currentOperator, operand: currentValue },
        };
      }

      return prev;
    });
  }, [performOperation]);

  const handleClear = useCallback(() => {
    setState(initialState);
  }, []);

  const handleBackspace = useCallback(() => {
    setState((prev) => {
      if (prev.error || prev.waitingForOperand) return prev;

      const newDisplay = prev.display.slice(0, -1);
      return {
        ...prev,
        display: newDisplay === '' || newDisplay === '-' ? '0' : newDisplay,
      };
    });
  }, []);

  return {
    display: state.display,
    error: state.error,
    handleDigit,
    handleDecimal,
    handleOperator,
    handleEquals,
    handleClear,
    handleBackspace,
  };
}
