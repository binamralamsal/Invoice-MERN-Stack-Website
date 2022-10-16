import { atomWithStorage } from "jotai/utils";

export type ColorScheme = "light" | "dark";

const initialValue = window.matchMedia("(prefers-color-scheme: dark").matches ? "dark" : "light";

export const colorSchemeAtom = atomWithStorage<ColorScheme>("mode", initialValue);
