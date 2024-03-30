import { ACTIONS } from "./helpers";

const OperatorButton = ({ operation, span, dispatch }) => {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: operation } })
      }
      className={span ? "calculator-span" : ""}
    >
      {operation}
    </button>
  );
};

export default OperatorButton;
