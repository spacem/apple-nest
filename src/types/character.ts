import { Bag } from "./bag";

export interface Character {
  name: string;
  bag: Bag;
  weaponLevel: number;
  lastRewardDate?: number;
  seedReadyDate?: number;
  megaSeedReadyDate?: number;
  legendarySeedReadyDate?: number;
}
