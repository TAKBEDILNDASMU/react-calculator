import { ACTIONS } from "./helpers";

const DigitButton = ({ digit, span, dispatch }) => {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: digit } })}
      className={span ? "calculator-span" : ""}
    >
      {digit}
    </button>
  );
};

export default DigitButton;
