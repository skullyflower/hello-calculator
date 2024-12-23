import { CalculatorButton } from './CalculatorButton';
import './Calculator.css';
import { useCalculator } from './useCalculator';

export const Calculator = () => {
  const { displayTotal, active, onKeyPress } = useCalculator();

  return (
    <>
      <h1>Calculator Exercise</h1>
      <p style={{ fontSize: '1em', paddingInline: '40px' }}>
        This was just a practice exercise. I wanted to tackle the problems of writing a calculator
        in TS myself. It works okay as long as the numbers don&apos;t get too large.
      </p>
      <div className='calculator' style={{ color: '#fff', margin: '0 auto' }}>
        <div className='total'>{displayTotal}</div>
        <div className='buttons'>
          <CalculatorButton buttonStyle='option' value='C' onClick={() => onKeyPress('C')} />
          <CalculatorButton buttonStyle='option' value='+/-' onClick={() => onKeyPress('+/-')} />
          <CalculatorButton buttonStyle='option' value='%' onClick={() => onKeyPress('%')} />
          <CalculatorButton
            active={active}
            buttonStyle='function'
            value='÷'
            onClick={() => onKeyPress('÷')}
          />
          <CalculatorButton value='7' onClick={() => onKeyPress('7')} />
          <CalculatorButton value='8' onClick={() => onKeyPress('8')} />
          <CalculatorButton value='9' onClick={() => onKeyPress('9')} />
          <CalculatorButton
            active={active}
            buttonStyle='function'
            value='×'
            onClick={() => onKeyPress('×')}
          />

          <CalculatorButton value='4' onClick={() => onKeyPress('4')} />
          <CalculatorButton value='5' onClick={() => onKeyPress('5')} />
          <CalculatorButton value='6' onClick={() => onKeyPress('6')} />
          <CalculatorButton
            active={active}
            buttonStyle='function'
            value='+'
            onClick={() => onKeyPress('+')}
          />

          <CalculatorButton value='1' onClick={() => onKeyPress('1')} />
          <CalculatorButton value='2' onClick={() => onKeyPress('2')} />
          <CalculatorButton value='3' onClick={() => onKeyPress('3')} />
          <CalculatorButton
            active={active}
            buttonStyle='function'
            value='-'
            onClick={() => {
              onKeyPress('-');
            }}
          />

          <CalculatorButton buttonStyle='wide' value='0' onClick={() => onKeyPress('0')} />
          <CalculatorButton value='.' onClick={() => onKeyPress('.')} />

          <CalculatorButton buttonStyle='function' value='=' onClick={() => onKeyPress('=')} />
        </div>
      </div>
    </>
  );
};
