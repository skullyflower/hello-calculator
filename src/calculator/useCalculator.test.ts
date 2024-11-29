import { describe, it, expect } from 'vitest';
import { concatenateNumKeyPress, fixProcision, doOperation } from './useCalculator';

describe('concatenateNumKeyPress', () => {
  it('should return digit if activeNumber is null', () => {
    expect(concatenateNumKeyPress('', '5')).toBe('5');
  });

  it('should return "0." if activeNumber is null and digit is "."', () => {
    expect(concatenateNumKeyPress(null, '.')).toBe('0.');
  });

  it('should concatenate digit to activeNumber', () => {
    expect(concatenateNumKeyPress('12', '3')).toBe('123');
  });
});

describe('fixProcision', () => {
  it('should fix precision to 13 digits', () => {
    expect(fixProcision(1.123456789012345)).toBe(1.123456789012);
  });

  it('should remove trailing zeros', () => {
    // eslint-disable-next-line prettier/prettier
    expect(fixProcision(1.100000)).toBe(1.1);
  });
});

describe('doOperation', () => {
  it('should perform addition', () => {
    expect(doOperation(2, '+', 3)).toBe(5);
  });

  it('should perform subtraction', () => {
    expect(doOperation(3, '-', 5)).toBe(-2);
  });

  it('should perform multiplication', () => {
    expect(doOperation(2, '×', 3)).toBe(6);
  });

  it('should perform division', () => {
    expect(doOperation(3, '÷', 6)).toBe(0.5);
  });

  it('should return running total if operation is null', () => {
    expect(doOperation(2, null, 3)).toBe(2);
  });

  it('should return 0 for unknown operation', () => {
    expect(doOperation(2, 'unknown', 3)).toBe(0);
  });
});
