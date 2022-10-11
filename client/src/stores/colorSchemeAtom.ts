import { atom } from "jotai/esm";

export type ColorScheme = "light" | "dark";

export const colorscheme = atom<ColorScheme>("light");
