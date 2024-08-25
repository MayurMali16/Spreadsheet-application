import { create } from 'zustand'

export const useGridStore = create((set) => ({
  cells: Array(1000).fill(''), 
  history: [], 
  future: [], 
  page: 0,
  cellsPerPage: 100,
  searchTerm: '',
  alignment: 'left',
  

  updateCell: (index, value) => 
    set((state) => {
    
      const newHistory = [...state.history, state.cells]
      const newCells = [...state.cells]
      newCells[index] = value

      return { cells: newCells, history: newHistory, future: [] } 
    }),


  undo: () => set((state) => {
    if (state.history.length === 0) return state

    const lastState = state.history[state.history.length - 1]
    const newHistory = state.history.slice(0, -1) 

    return { 
      cells: lastState, 
      history: newHistory, 
      future: [state.cells, ...state.future] 
    }
  }),

  redo: () => set((state) => {
    if (state.future.length === 0) return state

    const nextState = state.future[0]
    const newFuture = state.future.slice(1) 

    return { 
      cells: nextState, 
      history: [...state.history, state.cells], 
      future: newFuture 
    }
  }),

  setPage: (page) => set({ page }),

  setSearchTerm: (term) => set({ searchTerm: term }),

  setAlignment: (alignment) => set({ alignment }),
}))
