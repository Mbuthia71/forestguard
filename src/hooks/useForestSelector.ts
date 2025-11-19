import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { KENYAN_FORESTS, ForestData } from '@/data/forests';

interface ForestStore {
  selectedForest: ForestData;
  setSelectedForest: (forest: ForestData) => void;
}

export const useForestSelector = create<ForestStore>()(
  persist(
    (set) => ({
      selectedForest: KENYAN_FORESTS[0],
      setSelectedForest: (forest) => set({ selectedForest: forest }),
    }),
    {
      name: 'forest-selector',
    }
  )
);
