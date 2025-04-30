import { create } from 'zustand'
import { Product } from './src/search/entities/Product'

type State = {
    history: Product[];
    setHistory: (history: Product[]) => void;
    pushHistoryEntry: (historyEntry: Product) => void;
    popHistoryEntry: () => void;
    clearHistory: () => void;
    product: Product | null;
    setProduct: (product: Product | null) => void;
    clearProduct: () => void;
};

const useStore = create<State>((set) => ({
    history: [] as Product[],
    setHistory: (history: Product[]) => set({ history }),
    pushHistoryEntry: (entry) =>
        set((state) => {
          if (state.history.some(p => p.barcode === entry.barcode)) return state;
          return { history: [...state.history, entry] };
        }),     
    popHistoryEntry: () => set((state: State) => ({ history: state.history.slice(0, -1) })),
    clearHistory: () => set({ history: [] }),
    product: null as Product | null,
    setProduct: (product: Product | null) => set({ product }),
    clearProduct: () => set({ product: null }),
}))

export default useStore
