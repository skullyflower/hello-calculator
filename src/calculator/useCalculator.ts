import  {useState} from 'react';
function concatenateNumKeyPress(activeNumber:string, digit:string){
  if (activeNumber === null){
    if(digit ===".") return '0.';
    return digit;
  }else{
    const stringNumber = activeNumber+digit;
    return stringNumber;
  }
}

function doOperation(number:number, runningtotal:number, operation:string|null){
  switch (operation)
  {
    case "÷":
      if(number)
      return runningtotal/number;
      return runningtotal
    case "+":
      return runningtotal+number;
    case "-":
      return runningtotal-number;
    case "x":
      return runningtotal*number; 
    case null:
      return runningtotal;
    default:
      return 0;
  }
}
const formatTotal = (number:string, total:number)=>{
  const rawNumber = number!==''&& Number(number)!==total? number:total;
  const stringNumber= rawNumber.toString();
  if(stringNumber.length>12){
    return Number(stringNumber).toPrecision(12).toString();
  }
  return rawNumber.toString();
}


export const useCalculator =()=>{
  const [total,setTotal] = useState(0);
  const [activeNumber,setActiveNumber] = useState<string>("");
  const [activeFunction, setActiveFunction] = useState<string|null>(null);

const onKeyPress = (value:string) =>{
  if(isNaN(Number(value))){
    switch (value){
      case "C":
        clearAll();
        break;
      case "+/-":
        signChange();
        break;
      case "%":
        percent();
        break;
      case "=":
        processCalculation();
        break;
      case ".":
        numberKeyPress(value);
        break;
      default:
        functionKeyPress(value);
    }
  }else{
    numberKeyPress(value);
  }
}

const clearAll = () =>{ 
  setTotal(0);
  setActiveFunction(null);
  setActiveNumber('');
}
const numberKeyPress = (digit:string)=>{
  const currentNumber = concatenateNumKeyPress(activeNumber, digit);
  setActiveNumber(currentNumber.toString());
};

const signChange = ()=>{
  if(activeNumber) return setActiveNumber((-1*Number(activeNumber)).toString());
  if(total) return setTotal(-total);
}

const percent = () => {
  if(activeNumber) return setActiveNumber((0.01*Number(activeNumber)).toString());
  if(total) return setTotal(0.01*total);
}

const functionKeyPress = (operation:string) => {
  if( total === 0) setTotal(Number(activeNumber));
  setActiveFunction(operation);
  if(total!==0 && activeNumber!==''&& activeFunction!==null){ 
    setTotal(doOperation(Number(activeNumber), total, activeFunction));
  }
  setActiveNumber('');
}

const processCalculation=() => {
  if(activeFunction!==null && total!==0){
    setTotal(doOperation(Number(activeNumber), total, activeFunction));
  }
  setActiveNumber('');
  setActiveFunction(null);
};

const displayNumber = formatTotal(activeNumber,total);
return {displayTotal:displayNumber,active: activeFunction,onKeyPress:onKeyPress};
}