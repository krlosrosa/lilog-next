import { create } from 'zustand';
import {
  ValidationSuccess,
  ValidationFailure,
} from '../../../expedicao/services/validateInputs';

interface ShipmentStore {
  validationSuccess: ValidationSuccess | null;
  validationFailure: ValidationFailure | null;
  setValidationSuccess: (success: ValidationSuccess | null) => void;
  setValidationFailure: (failure: ValidationFailure | null) => void;
  clearValidation: () => void;
}

export const useShipmentStore = create<ShipmentStore>((set) => ({
  validationSuccess: null,
  validationFailure: null,
  setValidationSuccess: (success) => set({ validationSuccess: success }),
  setValidationFailure: (failure) => set({ validationFailure: failure }),
  clearValidation: () =>
    set({ validationSuccess: null, validationFailure: null }),
}));

