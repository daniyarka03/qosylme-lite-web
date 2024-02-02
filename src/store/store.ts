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

interface Guest {
    id: number;
}


interface IStoreGuests {
    guests: Guest[];
    setGuests: (guests: Guest[]) => void;
    addGuest: (guest: Guest) => void;
    removeGuest: (guestId: number) => void;
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

export const useStoreGuests = create<IStoreGuests>((set) => ({
    guests: [],
    setGuests: (guests) => set({ guests }),
    addGuest: (guest) =>
        set((state) => ({ guests: [...state.guests, guest] })),
    removeGuest: (guestId) =>
        set((state) => ({ guests: state.guests.filter(g => g.id !== guestId) })),
}));