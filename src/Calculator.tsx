import React, {useEffect,useState} from 'react';
import './Calculator.css';

function concatenateNumKeyPress(activeNumber:number, digit:number|string){
  if (activeNumber === 0){
    return Number(digit);
  }else{
    const stringNumber = activeNumber.toString()+digit.toString();
    const result = Number.parseFloat(stringNumber);
    return isNaN(result)? activeNumber : result;
  }
}

function doOperation(number:number, runningtotal:number, operation:string|null){
  switch (operation)
  {
    case "divide":
      return runningtotal/number;
    case "add":
      return runningtotal+number;
    case "subtract":
      return runningtotal-number;
    case "multiply":
      return runningtotal*number; 
    case null:
      return runningtotal;
    default:
      return 0;
}

}
type CalculatorButtonType = {
  buttonColor:string,
  wide?:boolean,
  value:string; 
  onClick:()=>void,}
const CalculatorButton = ({buttonColor,value,wide, onClick}:CalculatorButtonType) => {
  return <button className={wide?"wide-button":""} type="button" onClick={onClick} style={{backgroundColor:buttonColor}} value={value}>{value.toString()}</button>
};
export const Calculator = () => {
const [total,setTotal] = useState(0);
const [activeNumber,setActiveNumber] = useState<number>(0);
const [activeFunction, setActiveFunction] = useState<string|null>(null);

const clearAll = () =>{ 
  setTotal(0);
  setActiveFunction(null);
  setActiveNumber(0);
}

const numberKeyPress = (digit:number|string)=>{
  setActiveNumber(concatenateNumKeyPress(activeNumber, digit));
};

const functionKeyPress = (operation:string) => {
  setActiveFunction(operation);
  setActiveNumber(0);
}

useEffect(()=>{
  if(activeFunction===null && activeNumber!==0) setTotal(activeNumber);
},[activeNumber,activeFunction]);

const processCalculation=() => {
  if(activeFunction!==null && total!==0){
    setTotal(doOperation(activeNumber, total, activeFunction));
  }
  setActiveNumber(0);
  setActiveFunction(null);
};

  return (
  <div className='calculator' style={{color:"#fff"}}>
    <div className='total'>{activeNumber? activeNumber:total}</div>
    <div className='buttons'>
    <CalculatorButton buttonColor="#949494" value="C" onClick={clearAll}/>
    <CalculatorButton buttonColor="#949494" value="+/-" onClick={()=>setActiveNumber(-activeNumber)}/>
    <CalculatorButton buttonColor="#949494" value="%" onClick={()=>setActiveNumber(activeNumber*.01)}/>
    <CalculatorButton buttonColor="#FF8600" value="÷" onClick={()=>functionKeyPress("divide")}/>
    <CalculatorButton buttonColor='#262626' value="1" onClick={()=>numberKeyPress(1)}/>
    <CalculatorButton buttonColor='#262626' value="2" onClick={()=>numberKeyPress(2)}/>
    <CalculatorButton buttonColor='#262626' value="3" onClick={()=>numberKeyPress(3)}/>
    <CalculatorButton buttonColor="#FF8600" value="x" onClick={()=>functionKeyPress("multiply")}/>

    <CalculatorButton buttonColor='#262626' value="4" onClick={()=>numberKeyPress(4)}/>
    <CalculatorButton buttonColor='#262626' value="5" onClick={()=>numberKeyPress(5)}/>
    <CalculatorButton buttonColor='#262626' value="6" onClick={()=>numberKeyPress(6)}/>
    <CalculatorButton buttonColor="#FF8600" value="+" onClick={()=>functionKeyPress("add")}/>

    <CalculatorButton buttonColor='#262626' value="7" onClick={()=>numberKeyPress(7)}/>
    <CalculatorButton buttonColor='#262626' value="8" onClick={()=>numberKeyPress(8)}/>
    <CalculatorButton buttonColor='#262626' value="9" onClick={()=>numberKeyPress(9)}/>
    <CalculatorButton buttonColor="#FF8600" value="-" onClick={()=>{functionKeyPress("subtract")}}/>

    <CalculatorButton  buttonColor='#262626' value="0" onClick={()=>numberKeyPress(0)}/>
    <CalculatorButton  buttonColor='#262626' value="." onClick={()=>numberKeyPress(".")}/>

    <CalculatorButton buttonColor="#FF8600" value="=" onClick={processCalculation}/>

 </div>
  </div>)
}