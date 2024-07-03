import { create } from "zustand";
import {
  type OptionsTokenFromExplorer,
  type TokenFromExplorer,
} from "../schemas/tokens.schema";

interface SearchingTokenStore {
  term: string;
  value: OptionsTokenFromExplorer | null;
  setTerm: (term: string) => void;
  setValue: (value: TokenFromExplorer | null) => void;
  setBookmarked: (index: number, bookmarked: boolean) => void;
  deleteValue: (index: number) => void;
}

export const useSearchingTokenInfo = create<SearchingTokenStore>((set) => ({
  term: "",
  value: null,
  setTerm: (term) => set((state) => ({ ...state, term })),
  setValue: (value) =>
    set((state) => ({
      ...state,
      value: value ?
       (state.value?.length ? [...state.value, value] : [value]) : state.value,
    })),
  setBookmarked: (index: number, bookmarked: boolean) => set((state) => {
    if (!state.value || index < 0 || index >= state.value.length)
      throw new Error("Token index not found");
  
    state.value[index]!.bookmarked = bookmarked;

    return { ...state, value: [...state.value]};
  }),
  deleteValue: (index: number) => set((state) => {
    if (!state.value || index < 0 || index >= state.value.length)
      throw new Error("Token index not found");

    state.value.splice(index, 1);

    return { ...state, value: [...state.value]};
  })
}));
