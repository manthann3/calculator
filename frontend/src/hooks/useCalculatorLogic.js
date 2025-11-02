import { useDispatch, useSelector } from 'react-redux';
import { appendDigit, appendDecimal, setOperation, calculate, clearDisplay } from '../app/store';
import { useAuditLogger } from './useAuditLogger';
import store from '../app/store';

export function useCalculatorLogic() {
  const dispatch = useDispatch();
  const { display, operation } = useSelector((state) => state.calculator);
  const { logAction } = useAuditLogger();

  const handleDigit = (digit) => {
    dispatch(appendDigit(digit));
    logAction('DIGIT_PRESSED', String(digit));
  };

  const handleDecimal = () => {
    dispatch(appendDecimal());
    logAction('DECIMAL_PRESSED', '.');
  };
  
  const handleOperation = (op) => {
    const currentNumber = store.getState().calculator.display;
    logAction('NUMBER_ADDED', currentNumber);
    dispatch(setOperation(op));
    logAction('OPERATION_SELECTED', op);
  };

  const handleEquals = () => {
    const currentNumber = store.getState().calculator.display;
    logAction('NUMBER_ADDED', currentNumber);
    dispatch(calculate());
    const result = store.getState().calculator.display;
    logAction('EQUALS_PRESSED', result);
  };

  const handleClear = () => {
    dispatch(clearDisplay());
    logAction('CLEAR_PRESSED', 'C');
  };

  return {
    display,
    operation,
    handleDigit,
    handleDecimal,
    handleOperation,
    handleEquals,
    handleClear,
  };
}
