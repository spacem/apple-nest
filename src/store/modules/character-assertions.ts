import { Character } from "@/types/character";

export function assertCharacter(selectedCharacter: any) {
  if (!selectedCharacter) {
    throw new Error(`No character selected`);
  }
}

export function assertMoney(character: Character, requiredMoney: number) {
  if (character.bag.money < requiredMoney) {
    throw new Error(`Not enough money. You need ${requiredMoney}.`);
  }
}

export function assertOneMoney(character: Character) {
  if (character.bag.money <= 0) {
    throw new Error(
      `You have no money. Maybe you can take part in the event or sell some apples.`
    );
  }
}

export function assertSeed(numSeeds: number) {
  if (numSeeds <= 0) {
    throw new Error(`You do not have this type of seed.`);
  }
}

export function assertPie(character: Character) {
  if (character.bag.pies <= 0) {
    throw new Error(`You do not have any pie. You should try cooking one.`);
  }
}

export function assertPizza(character: Character) {
  if (character.bag.pizzas <= 0) {
    throw new Error(`You do not have any pizza. You should try cooking one.`);
  }
}

export function assertTicket(character: Character) {
  if (character.bag.tickets <= 0) {
    throw new Error(`You do not have a ticket.`);
  }
}

export function assertApples(character: Character, requiredAmount: number) {
  if (character.bag.apples < requiredAmount) {
    throw new Error(
      `You do not have enough apples. You need ${requiredAmount}. Try growing some.`
    );
  }
}

export function assertSeedReady(character: Character) {
  if (character.seedReadyDate) {
    if (character.seedReadyDate > new Date().valueOf()) {
      throw new Error("Cannot harvest - not ready yet");
    }
  } else if (character.legendarySeedReadyDate) {
    if (character.legendarySeedReadyDate > new Date().valueOf()) {
      throw new Error("Cannot harvest - not ready yet");
    }
  } else {
    throw new Error(`No seeds planted`);
  }
}
