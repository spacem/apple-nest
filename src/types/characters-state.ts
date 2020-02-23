import { Character } from './character';

export interface CharactersState {
    characters: Character[];
    selectedCharacter?: Character;
}