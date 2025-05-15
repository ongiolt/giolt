import { atom } from "nanostores";

export const $operatingSystem = atom<"Windows" | "macOS" | "Linux">("Windows");
