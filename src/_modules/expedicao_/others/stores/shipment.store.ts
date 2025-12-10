import { create } from 'zustand';
import {
  ValidationSuccess,
  ValidationFailure,
} from '../../../expedicao/services/validateInputs';
import { EnrichedPickingMapItem } from '@/_modules/expedicao/others/types/items';

interface ShipmentStore {
  validationSuccess: ValidationSuccess | null;
  validationFailure: ValidationFailure | null;
  setValidationSuccess: (success: ValidationSuccess | null) => void;
  setValidationFailure: (failure: ValidationFailure | null) => void;
  clearValidation: () => void;
  groupedPicking: Record<string, EnrichedPickingMapItem[][]> | null;
  setGroupedPicking: (groups: Record<string, EnrichedPickingMapItem[][]>) => void;
  clearGroupedPicking: () => void;
}

export const useShipmentStore = create<ShipmentStore>((set) => ({
  groupedPicking: null,
  setGroupedPicking: (groups) => set({ groupedPicking: groups }),
  clearGroupedPicking: () => set({ groupedPicking: null }),
  validationSuccess: null,
  validationFailure: null,
  setValidationSuccess: (success) => set({ validationSuccess: success }),
  setValidationFailure: (failure) => set({ validationFailure: failure }),
  clearValidation: () =>
    set({ validationSuccess: null, validationFailure: null }),

}));

