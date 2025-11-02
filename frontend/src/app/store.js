import { configureStore, createSlice } from '@reduxjs/toolkit';

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: {
    display: '0',
    previousValue: null,
    operation: null,
    waitingForNewValue: false,
  },
  reducers: {
    appendDigit: (state, action) => {
      if (state.waitingForNewValue) {
        state.display = String(action.payload);
        state.waitingForNewValue = false;
      } else {
        state.display = state.display === '0' ? String(action.payload) : state.display + action.payload;
      }
    },
    appendDecimal: (state) => {
      if (!state.display.includes('.')) {
        state.display += '.';
      }
      state.waitingForNewValue = false;
    },
    setOperation: (state, action) => {
      if (state.previousValue === null) {
        state.previousValue = parseFloat(state.display);
      } else if (!state.waitingForNewValue) {
        const result = performCalculation(
          state.previousValue,
          parseFloat(state.display),
          state.operation
        );
        state.display = String(result);
        state.previousValue = result;
      }
      state.operation = action.payload;
      state.waitingForNewValue = true;
    },
    calculate: (state) => {
      if (state.operation && state.previousValue !== null) {
        const result = performCalculation(
          state.previousValue,
          parseFloat(state.display),
          state.operation
        );
        state.display = String(result);
        state.previousValue = null;
        state.operation = null;
        state.waitingForNewValue = true;
      }
    },
    clearDisplay: (state) => {
      state.display = '0';
      state.previousValue = null;
      state.operation = null;
      state.waitingForNewValue = false;
    },
  },
});

function performCalculation(prev, current, operation) {
  switch (operation) {
    case '+':
      return prev + current;
    case '-':
      return prev - current;
    case '×':
      return prev * current;
    case '÷':
      if (current === 0) {
        return NaN;
      }
      return prev / current;
    default:
      return current;
  }
}

const auditSlice = createSlice({
  name: 'audit',
  initialState: {
    logs: [],
    loading: false,
    error: null,
  },
  reducers: {
    addLogOptimistic: (state, action) => {
      state.logs.unshift(action.payload);
    },
    setLogs: (state, action) => {
      state.logs = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const store = configureStore({
  reducer: {
    calculator: calculatorSlice.reducer,
    audit: auditSlice.reducer,
  },
});

export const { appendDigit, appendDecimal, setOperation, calculate, clearDisplay } = calculatorSlice.actions;
export const { addLogOptimistic, setLogs, setLoading, setError, clearError } = auditSlice.actions;

export default store;
