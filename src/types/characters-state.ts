import { Character } from "./character";

export interface CharactersState {
  storage: number;
  characters: Character[];
  selectedIndex?: number;
}
