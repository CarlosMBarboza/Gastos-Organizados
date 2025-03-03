import { useMemo } from "react";
import { useBudget } from "../../../hooks/useBudget";
import ExpenseDetail from "../DetailExpense/ExpenseDetail";

const ExpenseList = () => {
  const { state } = useBudget();
  const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]);

  const filteredExpenses= state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses

  return (
    <div className="mt-10 bg-white shadow-lg p-10">
      {isEmpty ? (
        <p className="text-2xl text-center text-gray-500 font-bold">
          No hay gastos
        </p>
      ) : (
        <>
          <p className="text-gray-500 text-2xl font-bold my-5">
            Listado de Gasto
          </p>
          {filteredExpenses.map((expense) => (
            <ExpenseDetail key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  );
};

export default ExpenseList;
