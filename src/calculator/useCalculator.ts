import { useState } from 'react';
export function concatenateNumKeyPress(activeNumber: string | null, digit: string) {
  if (activeNumber === null) {
    if (digit === '.') return '0.';
    return digit;
  } else {
    const stringNumber = activeNumber + digit;
    return stringNumber;
  }
}

export function fixProcision(num: number) {
  const stringNum = num.toPrecision(13);
  if (stringNum.includes('.')) return Number(stringNum.replace(/[0]*$/, ''));
  return Number(stringNum);
}

export function doOperation(runningtotal: number, operation: string | null, number: number) {
  switch (operation) {
    case '÷':
      if (number) {
        return fixProcision(runningtotal / number);
      }
      return runningtotal;
    case '+':
      return fixProcision(runningtotal + number);
    case '-':
      return fixProcision(runningtotal - number);
    case '×':
      return fixProcision(runningtotal * number);
    case null:
      return runningtotal;
    default:
      return 0;
  }
}
export const formatTotal = (number: string, total: number) => {
  const rawNumber = number !== '' && Number(number) !== total ? number : total;
  const stringNumber = rawNumber.toString();

  if (stringNumber.length > 12) {
    return fixProcision(Number(stringNumber));
  }
  return rawNumber.toString();
};

export const useCalculator = () => {
  const [hasError, setHasError] = useState(false);
  const [total, setTotal] = useState(0);
  const [activeNumber, setActiveNumber] = useState<string>('');
  const [activeFunction, setActiveFunction] = useState<string | null>(null);

  const clearAll = () => {
    setHasError(false);
    setTotal(0);
    setActiveFunction(null);
    setActiveNumber('');
  };

  const numberKeyPress = (digit: string) => {
    const currentNumber = concatenateNumKeyPress(activeNumber, digit);
    setActiveNumber(currentNumber.toString());
  };

  const signChange = () => {
    if (activeNumber) return setActiveNumber((-1 * Number(activeNumber)).toString());
    if (total) return setTotal(-total);
  };

  const percent = () => {
    if (activeNumber) return setActiveNumber((0.01 * Number(activeNumber)).toString());
    if (total) return setTotal(0.01 * total);
  };

  const onKeyPress = (value: string) => {
    if (isNaN(Number(value))) {
      switch (value) {
        case 'C':
          clearAll();
          break;
        case '+/-':
          signChange();
          break;
        case '%':
          percent();
          break;
        case '=':
          processCalculation();
          break;
        case '.':
          numberKeyPress(value);
          break;
        default:
          functionKeyPress(value);
      }
    } else {
      numberKeyPress(value);
    }
  };

  const functionKeyPress = (operation: string) => {
    if (total === 0) setTotal(Number(activeNumber));
    if (activeNumber !== '') {
      processCalculation();
    }
    setActiveFunction(operation);
    setActiveNumber('');
  };

  const processCalculation = () => {
    if (activeFunction !== null && total !== 0) {
      if (activeNumber === '0' && activeFunction === '÷') setHasError(true);
      setTotal(doOperation(total, activeFunction, Number(activeNumber)));
    }
    setActiveNumber('');
    setActiveFunction(null);
  };

  const displayNumber = hasError ? 'Error' : formatTotal(activeNumber, total);
  return {
    displayTotal: displayNumber,
    active: activeFunction,
    onKeyPress: onKeyPress,
  };
};
