import { create } from 'zustand'

interface IStore {
    bears: number
    increasePopulation: () => void
    removeAllBears: () => void

}

interface IModalLoadingStore {
    isOpen: boolean
    toggleModal: () => void
}

export const useStore = create<IStore>((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
}))

export const useModalLoadingStore = create<IModalLoadingStore>((set) => ({
    isOpen: false,
    toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));