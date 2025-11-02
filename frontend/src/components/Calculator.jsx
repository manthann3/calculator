import React from 'react';
import { useCalculatorLogic } from '../hooks/useCalculatorLogic';
import { useSelector } from 'react-redux';

export function Calculator() {
  const {
    handleDigit,
    handleDecimal,
    handleOperation,
    handleEquals,
    handleClear,
  } = useCalculatorLogic();

  const { display } = useSelector((state) => state.calculator);
  const isError = isNaN(parseFloat(display));

  const buttons = [
    { label: 'C', onClick: handleClear, className: 'col-span-2 bg-red-500 hover:bg-red-600 text-white' },
    { label: '÷', onClick: () => handleOperation('÷'), className: 'bg-orange-500 hover:bg-orange-600 text-white' },
    { label: '×', onClick: () => handleOperation('×'), className: 'bg-orange-500 hover:bg-orange-600 text-white' },
    { label: '7', onClick: () => handleDigit(7), className: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600' },
    { label: '8', onClick: () => handleDigit(8), className: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600' },
    { label: '9', onClick: () => handleDigit(9), className: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600' },
    { label: '−', onClick: () => handleOperation('-'), className: 'bg-orange-500 hover:bg-orange-600 text-white' },
    { label: '4', onClick: () => handleDigit(4), className: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600' },
    { label: '5', onClick: () => handleDigit(5), className: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600' },
    { label: '6', onClick: () => handleDigit(6), className: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600' },
    { label: '+', onClick: () => handleOperation('+'), className: 'bg-orange-500 hover:bg-orange-600 text-white' },
    { label: '1', onClick: () => handleDigit(1), className: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600' },
    { label: '2', onClick: () => handleDigit(2), className: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600' },
    { label: '3', onClick: () => handleDigit(3), className: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600' },
    { label: '=', onClick: handleEquals, className: 'bg-green-500 hover:bg-green-600 text-white' },
    { label: '0', onClick: () => handleDigit(0), className: 'col-span-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600' },
    { label: '.', onClick: handleDecimal, className: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600' },
  ];

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
      <div className="mb-6">
        <div
          className={`w-full p-4 text-right text-4xl font-bold rounded-lg transition-colors ${
            isError
              ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300'
              : 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100'
          }`}
        >
          {isError ? 'Error' : display}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.onClick}
            className={`py-4 px-3 rounded-lg font-semibold text-lg transition-colors active:scale-95 transform ${btn.className}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;
