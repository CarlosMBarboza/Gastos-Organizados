import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Budgetprovider } from './context/BudgetContext.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Budgetprovider>
      <App />
    </Budgetprovider>
  </StrictMode>,
)
