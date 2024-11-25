import { useBudget } from "../../hooks/useBudget";
import AmountDisplay from "../amount/AmountDisplay";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const BudgetTracker = () => {
  const { state, totalExpenses, remainingBudget, dispatch } = useBudget();

  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
          <CircularProgressbar
            value={percentage}
            styles={buildStyles({
              pathColor: percentage === 100 ? "red" : "#3b82f6",
              trailColor: "#f5f5f5",
              textSize: "8",
              textColor: "#3b82f6",
            })}
            text={`${percentage}% Gastado`}
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
          <AmountDisplay label="Presupuesto" amount={state.budget} />
          <AmountDisplay label="Disponible" amount={remainingBudget} />
          <AmountDisplay label="Gastado" amount={totalExpenses} />

          <div className="flex gap-4 w-full mt-5">
            <button
              className="bg-blue-600 flex-1 text-white font-bold p-2 uppercase rounded-lg"
              type="button"
              onClick={() => dispatch({ type: "show-modal" })}
            >
              Nuevo Gasto
            </button>
            <button
              type="button"
              className="bg-pink-600 flex-1 text-white font-bold p-2 uppercase rounded-lg"
              onClick={() => dispatch({ type: "reset-app" })}
            >
              Resetear App
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetTracker;
