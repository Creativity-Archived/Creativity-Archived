import { writable } from "svelte/store";
import { browser } from "$app/environment";

const stored = (key: string, fallback: string) =>
  browser ? localStorage.getItem(key) ?? fallback : fallback;

const persist = (key: string, store: ReturnType<typeof writable>) => {
  if (!browser) return;
  store.subscribe((value) => localStorage.setItem(key, value));
};

// from here, you can easily make new stores and shit
// I geninely needed help with sveltekit's docs and codex to figure this one out
export const showNsfw = writable(stored("showNsfw", "off"));
export const compactMode = writable(stored("compactMode", "off"));

persist("showNsfw", showNsfw);
persist("compactMode", compactMode);
