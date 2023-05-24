type CalculatorButtonType = {
  buttonStyle?: string;
  active?: string | null;
  wide?: boolean;
  value: string;
  onClick: () => void;
};

function getButtonStyles(
  style: string | undefined,
  active: string | null | undefined,
  value: string,
) {
  const isactive = active === value;

  switch (style) {
    case 'option':
      return { backgroundColor: '#949494' };
    case 'function':
      return {
        backgroundColor: '#FF8600',
        fontSize: '1.4em',
        border: isactive ? '1px solid #fff9' : '1px solid transparent',
      };
    case 'wide':
      return {
        backgroundColor: '#262626',
        gridColumnStart: 1,
        gridColumnEnd: 3,
        borderRadius: '25px',
      };
    default:
      return { backgroundColor: '#262626' };
  }
}

export const CalculatorButton = ({ buttonStyle, active, value, onClick }: CalculatorButtonType) => {
  return (
    <button
      type='button'
      onClick={onClick}
      style={getButtonStyles(buttonStyle, active, value)}
      value={value}
    >
      {value.toString()}
    </button>
  );
};
