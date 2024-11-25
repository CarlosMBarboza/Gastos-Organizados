import { useMemo } from "react";
import { formatDate } from "../../../helpers/Helpers-Index";
import { Expense } from "../../../type/Index";
import AmountDisplay from "../../amount/AmountDisplay";
import { categories } from "../../../data/categories";
import { useBudget } from "../../../hooks/useBudget";

type ExpenseDetailProps = {
  expense: Expense;
};

const ExpenseDetail = ({ expense }: ExpenseDetailProps) => {
  const { dispatch } = useBudget();
  
  const categoryInfo = useMemo(
    () => categories.filter(cat => cat.id === expense.category)[0],
    [expense]
  );

  return (
    <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
      <div>
        <img
          className="w-16 h-16 object-cover"
          src={`/icono_${categoryInfo.icon}.svg`}
          alt={categoryInfo.name}
        />
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-sm font-bold uppercase text-slate-500">
          {categoryInfo.name}
        </p>
        <p>{expense.expenseName}</p>
        <p className="text-slate-600 text-sm">
          {formatDate(expense.date!.toString())}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <AmountDisplay amount={expense.amount} />
        <div className="flex gap-2">
          <button 
            onClick={() => dispatch({ type: 'edit-expense', playload:{id: expense.id}})} 
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Editar
          </button>
          <button 
            onClick={() => dispatch({ type: 'remove-expense', payload: { id: expense.id } })} 
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDetail;
