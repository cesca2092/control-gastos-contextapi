import { v4 as uuidv4 } from 'uuid'
import type { Category, DraftExpense, Expense } from "../types"

export type BudgetActions =
  { type: 'add-budget', payload: { budget: number } } |
  { type: 'show-modal' } |
  { type: 'close-modal' } |
  { type: 'add-expense', payload: { expense: DraftExpense } } |
  { type: 'remove-expense', payload: { id: Expense['id'] } } |
  { type: 'get-expense-by-id', payload: { id: Expense['id'] } } |
  { type: 'update-expense', payload: { expense: Expense } } |
  { type: 'restart-budget' } |
  { type: 'add-filter-category', payload: { id: Category['id'] } }


export type BudgetState = {
  budget: number
  modal: boolean
  expenses: Expense[],
  editingId: Expense['id']
  currentCategory: Category['id']
}

const initialBudget = (): number => {
  const localStorageBudget = localStorage.getItem('budget')
  return localStorageBudget ? +localStorageBudget : 0
}

const localStorageExpenses = (): Expense[] => {
  const localStorageExpenses = localStorage.getItem('expenses')
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: localStorageExpenses(),
  editingId: '',
  currentCategory: ''
}

const createExpense = (draftExpense: DraftExpense): Expense => {
  return {
    ...draftExpense,
    id: uuidv4()
  }
}

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {

  if (action.type === 'add-budget') {
    return {
      ...state,
      budget: action.payload.budget
    }
  }

  if (action.type === 'show-modal') {
    return {
      ...state,
      modal: true
    }
  }

  if (action.type === 'close-modal') {
    return {
      ...state,
      modal: false,
      editingId: ''
    }
  }

  if (action.type === 'add-expense') {

    const expense = createExpense(action.payload.expense)
    return {
      ...state,
      expenses: [...state.expenses, expense],
      modal: false
    }
  }


  if (action.type === 'remove-expense') {
    return {
      ...state,
      expenses: state.expenses.filter(exp => exp.id !== action.payload.id!)
    }
  }

  if (action.type === 'get-expense-by-id') {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true,
    }
  }

  if (action.type === 'update-expense') {
    return {
      ...state,
      editingId: '',
      modal: false,
      expenses: state.expenses.map(exp =>
        exp.id === action.payload.expense.id
          ? action.payload.expense
          : exp
      )
    }
  }

  if (action.type === 'restart-budget') {
    return {
      ...state,
      budget: 0,
      expenses: [],
    }
  }

  if (action.type === 'add-filter-category') {
    return {
      ...state,
      currentCategory: action.payload.id
    }
  }

  return state

}