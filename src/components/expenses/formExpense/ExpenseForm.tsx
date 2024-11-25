import { useState, ChangeEvent, useEffect } from "react";
import type { DraftExpense, Value } from "../../../type/Index";
import { categories } from "../../../data/categories";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import ErrorMessage from "../../error/ErrorMessage";
import { useBudget } from "../../../hooks/useBudget";

const ExpenseForm = () => { 
  
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
  });
  const [error, setHerror] = useState('');
  const [previousAmount, setPreviousAmount] = useState(0);
  const { dispatch, state, remainingBudget } = useBudget();

  useEffect(() => {
    if(state.editingId){
      const editingExpense = state.expenses.filter(currenExpense => currenExpense.id=== state.editingId)[0]
      setExpense(editingExpense)
      setPreviousAmount(editingExpense.amount)
    }
  }, [state.editingId])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isAmountField = ['amount'].includes(name);
    setExpense({
      ...expense,
      [name]: isAmountField ? parseFloat(value) : value
    });
  };

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(expense).includes('')) {
      setHerror('Faltan campos por llenar');
      return;
    }

    if ((expense.amount - previousAmount) > remainingBudget) {
      setHerror('No tienes suficiente presupuesto para este gasto');
      return;
    }

    if(state.editingId){
      dispatch({ type: 'update-expense',payload:{expense: { id: state.editingId, ...expense} } });
      
    }else{
    dispatch({ type: 'add-expense', payload: { expense } });
    }


    setExpense({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date()
    });
    setPreviousAmount(0);
  };

 
  const handleCloseModal = () => {
    dispatch({ type: "close-modal" })
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-bold border-b-4 border-blue-500 py-2">
      {state.editingId ? 'Editar Gasto' : 'Nuevo Gasto'}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre del Gasto
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Añade el Nombre del Gasto"
          className="bg-slate-200 rounded-lg p-2"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Añade la Cantidad del Gasto"
          className="bg-slate-200 rounded-lg p-2"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoria
        </label>
        <select
          id="category"
          className="bg-slate-200 rounded-lg p-2"
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="text-xl">
          Fecha Gasto:
        </label>
        <DatePicker
          value={expense.date}
          onChange={handleChangeDate}
          className="bg-slate-200 rounded-lg p-2" />
      </div>

      <div className="flex gap-2">
      <input
        type="submit"
        value= {state.editingId ? 'Editar Gasto' : 'Nuevo Gasto'}
        className="bg-blue-600 w-full text-white font-bold p-2 mt-5 uppercase rounded-lg"
      />
      <input
        type="button"
        value={"  Cerrar "} 
        onClick={handleCloseModal} 
        className="bg-red-600 w-full text-white font-bold p-2 mt-5 uppercase rounded-lg"
      />
      </div>
      
  
    </form>
  );
};

export default ExpenseForm;
