import { Bag } from "./bag";

export interface Character {
  name: string;
  bag: Bag;
  lastRewardDate?: number;
  seedPlantDate?: number;
}
