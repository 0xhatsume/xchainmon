// zustand store for encounter screen
import { create } from 'zustand';

interface EncounterStore {
    encounter: boolean;
    setEncounter: (encounter: boolean) => void;
}

export const useEncounterStore = create<EncounterStore>((set) => ({
    encounter: false,
    setEncounter: (encounter: boolean) => set({ encounter }),
}));



