import { useReducer } from "react";
import "./App.css";
import DigitButton from "./DigitButton";
import { ACTIONS, evaluate } from "./helpers";
import OperatorButton from "./OperatorButton";

function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.ADD_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            currentOperand: action.payload.digit,
            overwrite: false,
          };
        }
        if (state.currentOperand === "0" && action.payload.digit === "0") return state;
        if (action.payload.digit === "." && state.currentOperand?.includes(".")) return state;
        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${action.payload.digit}`,
        };
      case ACTIONS.CHOOSE_OPERATION:
        if (state.currentOperand == null && state.previousOperand == null) return state;
        if (state.currentOperand == null) {
          return {
            ...state,
            operation: action.payload.operation,
          };
        }
        if (state.previousOperand == null) {
          console.log(state);
          return {
            ...state,
            previousOperand: state.currentOperand,
            currentOperand: null,
            operation: action.payload.operation,
          };
        }

        return {
          ...state,
          previousOperand: evaluate(state),
          currentOperand: null,
          operation: action.payload.operation,
        };
      case ACTIONS.CLEAR_ALL:
        return {};
      case ACTIONS.EVALUATE:
        return {
          ...state,
          currentOperand: evaluate(state),
          previousOperand: null,
          operation: null,
          overwrite: true,
        };
      case ACTIONS.DELETE_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            overwrite: false,
            currentOperand: null,
          };
        }
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0, -1),
        };
    }
  };

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {});

  return (
    <main>
      <div className="calculator">
        <div className="calculator-display">
          <div className="previous-operand">
            {previousOperand}
            {operation}
          </div>
          <div className="current-operand">{currentOperand}</div>
        </div>
        <div className="calculator-button">
          <button className="calculator-span" onClick={() => dispatch({ type: ACTIONS.CLEAR_ALL })}>
            AC
          </button>
          <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
          <OperatorButton operation={"/"} dispatch={dispatch} />
          <DigitButton digit="1" dispatch={dispatch} />
          <DigitButton digit="2" dispatch={dispatch} />
          <DigitButton digit="3" dispatch={dispatch} />
          <OperatorButton operation={"*"} dispatch={dispatch} />
          <DigitButton digit="4" dispatch={dispatch} />
          <DigitButton digit="5" dispatch={dispatch} />
          <DigitButton digit="6" dispatch={dispatch} />
          <OperatorButton operation={"+"} dispatch={dispatch} />
          <DigitButton digit="7" dispatch={dispatch} />
          <DigitButton digit="8" dispatch={dispatch} />
          <DigitButton digit="9" dispatch={dispatch} />
          <OperatorButton operation={"-"} dispatch={dispatch} />
          <DigitButton digit="." dispatch={dispatch} />
          <DigitButton digit="0" dispatch={dispatch} />
          <button className="calculator-span" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>
            =
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
