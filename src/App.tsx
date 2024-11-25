import { useEffect, useMemo } from "react";
import BudgetForm from "./components/form/BudgetForm";
import Header from "./components/header/Header";
import { useBudget } from "./hooks/useBudget";
import BudgetTracker from "./components/tracker/BudgetTracker";
import ExpenseModal from "./components/expenses/modalExpense/ExpenseModal";
import ExpenseList from "./components/expenses/listExpense/ExpenseList";


const App = () => {
  const { state } = useBudget();
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])

  return (
    <>
      <Header />

      <div className="max-w-3xl mx-auto  bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>

      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  );
};

export default App;
