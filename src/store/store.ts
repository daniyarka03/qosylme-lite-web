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

interface IModalSuccessJoinEventStore {
    isOpen: boolean
    toggleModal: () => void
}

interface IModalSuccessJoinChallengeStore {
    isOpen: boolean
    toggleModal: () => void
}

interface IModalChangeTitleEventStore {
    isOpen: boolean
    toggleModal: () => void
    titleValue: string
    toggleTitleValue: (value: string) => void
}

interface IModalChangeEventPropertiesStore {
    isOpenImageModal: boolean
    toggleImageModal: () => void
    isOpenDescriptionModal: boolean
    toggleDescriptionModal: () => void
    isOpenDateModal: boolean
    toggleDateModal: () => void
    isOpenTimeModal: boolean
    toggleTimeModal: () => void
    isOpenLocationModal: boolean
    toggleLocationModal: () => void
    image: string
    toggleImage: (image: string) => void
    description: string
    toggleDescription: (description: string) => void
    date: string
    toggleDate: (date: string) => void
    time: string
    toggleTime: (time: string) => void
    location: string
    toggleLocation: (location: string) => void

}

interface IModalUpdateEventPropertiesStore {
    isOpenImageModal: boolean
    toggleImageModal: () => void
    isOpenDescriptionModal: boolean
    toggleDescriptionModal: () => void
    isOpenDateModal: boolean
    toggleDateModal: () => void
    isOpenTimeModal: boolean
    toggleTimeModal: () => void
    isOpenLocationModal: boolean
    toggleLocationModal: () => void
    image: string
    toggleImage: (image: string) => void
    description: string
    toggleDescription: (description: string) => void
    date: string
    toggleDate: (date: string) => void
    time: string
    toggleTime: (time: string) => void
    location: string
    toggleLocation: (location: string) => void

}

interface IModalEventSettingsStore {
    isOpen: boolean,
    toggleModal: () => void,
    isOpenPrivacyOption: boolean,
    togglePrivacyOption: () => void,
}

interface Guest {
    id: number;
}

interface  IStoreImageModal {
    imagePreview: string;
    setImagePreview: (imagePreview: string) => void;
    imageEvent: string;
    setImageEvent: (imageEvent: string) => void;
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

export const useImageModalStore = create<IStoreImageModal>((set) => ({
    imageEvent: '',
    setImageEvent: (imageEvent) => set({ imageEvent }),
    imagePreview: '',
    setImagePreview: (imagePreview) => set({ imagePreview }),
}));

export const useModalLoadingStore = create<IModalLoadingStore>((set) => ({
    isOpen: false,
    toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const useModalSuccessJoinEventStore = create<IModalSuccessJoinEventStore>((set) => ({
    isOpen: false,
    toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const useModalSuccessJoinChallengeStore = create<IModalSuccessJoinChallengeStore>((set) => ({
    isOpen: false,
    toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const useModalChangeTitleEventStore = create<IModalChangeTitleEventStore>((set) => ({
    isOpen: false,
    toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
    titleValue: '',
    toggleTitleValue: (value) => set({ titleValue: value }),
}));

export const useModalEventSettingsStore = create<IModalEventSettingsStore>((set) => ({
    isOpen: false,
    toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
    isOpenPrivacyOption: false,
    togglePrivacyOption: () => set((state) => ({ isOpenPrivacyOption: !state.isOpenPrivacyOption })),
}));

export const useModalChangeEventPropertiesStore = create<IModalChangeEventPropertiesStore>((set) => ({
    isOpenImageModal: false,
    toggleImageModal: () => set((state) => ({ isOpenImageModal: !state.isOpenImageModal })),
    isOpenDescriptionModal: false,
    toggleDescriptionModal: () => set((state) => ({ isOpenDescriptionModal: !state.isOpenDescriptionModal })),
    isOpenDateModal: false,
    toggleDateModal: () => set((state) => ({ isOpenDateModal: !state.isOpenDateModal })),
    isOpenTimeModal: false,
    toggleTimeModal: () => set((state) => ({ isOpenTimeModal: !state.isOpenTimeModal })),
    isOpenLocationModal: false,
    toggleLocationModal: () => set((state) => ({ isOpenLocationModal: !state.isOpenLocationModal })),
    image: '',
    toggleImage: (image) => set({ image }),
    description: '',
    toggleDescription: (description) => set({ description }),
    date: '',
    toggleDate: (date) => set({ date }),
    time: '',
    toggleTime: (time) => set({ time }),
    location: '',
    toggleLocation: (location) => set({ location }),
}));

export const useModalUpdateEventPropertiesStore = create<IModalUpdateEventPropertiesStore>((set) => ({
    isOpenImageModal: false,
    toggleImageModal: () => set((state) => ({ isOpenImageModal: !state.isOpenImageModal })),
    isOpenDescriptionModal: false,
    toggleDescriptionModal: () => set((state) => ({ isOpenDescriptionModal: !state.isOpenDescriptionModal })),
    isOpenDateModal: false,
    toggleDateModal: () => set((state) => ({ isOpenDateModal: !state.isOpenDateModal })),
    isOpenTimeModal: false,
    toggleTimeModal: () => set((state) => ({ isOpenTimeModal: !state.isOpenTimeModal })),
    isOpenLocationModal: false,
    toggleLocationModal: () => set((state) => ({ isOpenLocationModal: !state.isOpenLocationModal })),
    image: '',
    toggleImage: (image) => set({ image }),
    description: '',
    toggleDescription: (description) => set({ description }),
    date: '',
    toggleDate: (date) => set({ date }),
    time: '',
    toggleTime: (time) => set({ time }),
    location: '',
    toggleLocation: (location) => set({ location }),
}));


export const useStoreGuests = create<IStoreGuests>((set) => ({
    guests: [],
    setGuests: (guests) => set({ guests }),
    addGuest: (guest) =>
        set((state) => ({ guests: [...state.guests, guest] })),
    removeGuest: (guestId) =>
        set((state) => ({ guests: state.guests.filter(g => g.id !== guestId) })),
}));