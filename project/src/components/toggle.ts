import { create } from "zustand";

interface State {
  isOpen: boolean;
  setIsOpen: (newValue: boolean) => void;
}

const useStore = create<State>((set) => ({
  isOpen: false,
  setIsOpen: (newValue) => set({ isOpen: newValue }),
}));
export default useStore;
