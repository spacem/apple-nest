import { MutationTree } from "vuex";
import { CharactersState } from "@/types/characters-state";
import { Character } from "@/types/character";

const REWARD_TIME = 60 * 60;
const WEAPON_COST = 50;
const ARMOUR_COST = 20;
const SEED_GROW_TIME = 1000 * 20;
const MEGA_SEED_GROW_TIME = 1000 * 300;
const LEGENDARY_SEED_GROW_TIME = 1000 * 60 * 60;
const PIE_COST = 100;
const PIZZA_COST = 5000;
const MEGA_SEED_COST = 20;
const LEGENDARY_SEED_COST = 500;
const TICKET_COST = 5;
const APPLE_COST = 10;

function initBag(character: Character) {
  if (!character.bag) {
    character.bag = {
      apples: 0,
      money: 0,
      seeds: 0,
      megaSeeds: 0,
      legendarySeeds: 0,
      pies: 0,
      pizzas: 0,
      tickets: 0
    };
  } else {
    if (!character.bag.megaSeeds) {
      character.bag.megaSeeds = 0;
    }
    if (!character.bag.pies) {
      character.bag.pies = 0;
    }
    if (!character.bag.pizzas) {
      character.bag.pizzas = 0;
    }
    if (!character.bag.legendarySeeds) {
      character.bag.legendarySeeds = 0;
    }
    if (!character.bag.tickets) {
      character.bag.tickets = 0;
    }
  }
}

// mutations
export const mutationsOfCharacters: MutationTree<CharactersState> = {
  create(state, character: Character) {
    initBag(character);
    state.characters.push(character);
  },
  select(state, character: Character) {
    if (character) {
      initBag(character);
    }
    state.selectedIndex = state.characters.indexOf(character);
  },
  collectEventReward(state, index) {
    const character = state.characters[index];
    let remainingTime = 0;
    if (character.lastRewardDate) {
      remainingTime =
        REWARD_TIME - (new Date().valueOf() - character.lastRewardDate) / 1000;
    }
    if (remainingTime <= 0) {
      character.lastRewardDate = new Date().valueOf();
      character.bag.money += 2;
    } else {
      throw new Error(
        `${Math.ceil(
          remainingTime / 60
        )} minutes left until you can get another event reward`
      );
    }
  },
  buySeed(state, index) {
    const character = state.characters[index];
    if (character.bag.money > 0) {
      character.bag.money--;
      character.bag.seeds++;
    } else {
      throw new Error(
        `Not enough money. Maybe you can take part in the event or sell some apples.`
      );
    }
  },
  buyMegaSeed(state, index) {
    const character = state.characters[index];
    if (character) {
      if (character.bag.money >= MEGA_SEED_COST) {
        character.bag.money -= MEGA_SEED_COST;
        character.bag.megaSeeds++;
      } else {
        throw new Error(
          `Mega seeds cost ${MEGA_SEED_COST}. You need more money`
        );
      }
    }
  },
  buyLegendarySeed(state, index) {
    const character = state.characters[index];
    if (character) {
      if (character.bag.money >= LEGENDARY_SEED_COST) {
        character.bag.money -= LEGENDARY_SEED_COST;
        character.bag.legendarySeeds++;
      } else {
        throw new Error(
          `Legendary seeds cost ${LEGENDARY_SEED_COST}. You need more money`
        );
      }
    }
  },
  harvest(state, index) {
    const character = state.characters[index];
    let numApples = 0;
    if (character.seedReadyDate) {
      if (character.seedReadyDate > new Date().valueOf()) {
        throw new Error("Cannot harvest - not ready yet");
      }
      character.seedReadyDate = undefined;
      numApples = Math.floor(Math.random() * 10);
      if (numApples < 2) {
        numApples = 2;
      }
    } else if (character.megaSeedReadyDate) {
      if (character.megaSeedReadyDate > new Date().valueOf()) {
        throw new Error("Cannot harvest - not ready yet");
      }
      character.megaSeedReadyDate = undefined;
      let roll = Math.random();
      if (roll > 0.95) {
        numApples = 200;
      } else if (roll > 0.85) {
        numApples = 100;
      } else if (roll > 0.4) {
        numApples = 80;
      } else {
        numApples = 50;
      }
    } else if (character.legendarySeedReadyDate) {
      if (character.legendarySeedReadyDate > new Date().valueOf()) {
        throw new Error("Cannot harvest - not ready yet");
      }
      character.legendarySeedReadyDate = undefined;
      let roll = Math.random();
      if (roll > 0.95) {
        numApples = 10000;
      } else if (roll > 0.85) {
        numApples = 8000;
      } else if (roll > 0.4) {
        numApples = 5000;
      } else {
        numApples = 2000;
      }
    } else {
      throw new Error(`No seeds planted`);
    }
    character.bag.apples += numApples;
  },
  plantSeed(state, index) {
    const character = state.characters[index];
    character.seedReadyDate = new Date().valueOf() + SEED_GROW_TIME;
    character.bag.seeds--;
  },
  plantMegaSeed(state, index) {
    const character = state.characters[index];
    character.megaSeedReadyDate = new Date().valueOf() + MEGA_SEED_GROW_TIME;
    character.bag.megaSeeds--;
  },
  plantLegendarySeed(state, index) {
    const character = state.characters[index];
    character.legendarySeedReadyDate =
      new Date().valueOf() + LEGENDARY_SEED_GROW_TIME;
    character.bag.legendarySeeds--;
  },
  sellApple(state, index) {
    const character = state.characters[index];
    if (character.bag.apples > 0) {
      character.bag.apples--;
      character.bag.money += APPLE_COST;
    } else {
      throw new Error(`Not enough apples. You should try growing some.`);
    }
  },
  sellPie(state, index) {
    const character = state.characters[index];
    if (character.bag.pies > 0) {
      character.bag.pies--;
      character.bag.money += PIE_COST * APPLE_COST;
    } else {
      throw new Error(`Not enough pies. You should try cooking some.`);
    }
  },
  sellPizza(state, index) {
    const character = state.characters[index];
    if (character.bag.pizzas > 0) {
      character.bag.pizzas--;
      character.bag.money += PIZZA_COST * APPLE_COST;
    } else {
      throw new Error(`Not enough pizzas. You should try cooking some.`);
    }
  },
  storeMoney(state, index) {
    const character = state.characters[index];
    if (!state.storage) {
      state.storage = 0;
    }
    state.storage += character.bag.money;
    character.bag.money = 0;
  },
  takeMoney(state, index) {
    const character = state.characters[index];
    character.bag.money += state.storage;
    state.storage = 0;
  },
  makeWeapon(state, index) {
    const character = state.characters[index];
    if (!character.weaponLevel && character.bag.money >= WEAPON_COST) {
      character.weaponLevel = 1;
      character.bag.money -= WEAPON_COST;
    } else {
      throw new Error(
        "You do not have enough money. Come back when you have " + WEAPON_COST
      );
    }
  },
  upgradeWeapon(state, index) {
    const character = state.characters[index];
    if (character.weaponLevel) {
      const requiredMoney = Math.floor(
        WEAPON_COST * 0.5 * character.weaponLevel
      );
      if (character.bag.money >= requiredMoney) {
        character.bag.money -= requiredMoney;
        const roll = Math.random();
        if (character.weaponLevel <= 1 || roll > 0.3) {
          character.weaponLevel++;
        } else if (roll < 0.1) {
          character.weaponLevel--;
        }
      } else {
        throw new Error(
          "Upgrading is not cheap you know. Come back when you have " +
            requiredMoney
        );
      }
    }
  },
  makeArmour(state, index) {
    const character = state.characters[index];
    if (!character.armourLevel && character.bag.money >= ARMOUR_COST) {
      character.armourLevel = 1;
      character.bag.money -= ARMOUR_COST;
    } else {
      throw new Error(
        "You do not have enough money. Come back when you have " + ARMOUR_COST
      );
    }
  },
  upgradeArmour(state, index) {
    const character = state.characters[index];
    if (character.armourLevel) {
      const requiredMoney = Math.floor(
        ARMOUR_COST * 0.5 * character.armourLevel
      );
      if (character.bag.money >= requiredMoney) {
        character.bag.money -= requiredMoney;
        const roll = Math.random();
        if (character.armourLevel <= 1 || roll > 0.3) {
          character.armourLevel++;
        } else if (roll < 0.1) {
          character.armourLevel--;
        }
      } else {
        throw new Error(
          "Upgrading is not cheap you know. Come back when you have " +
            requiredMoney
        );
      }
    }
  },
  makePie(state, index) {
    const character = state.characters[index];
    if (character.bag.apples >= PIE_COST) {
      character.bag.apples -= PIE_COST;
      character.bag.pies++;
    } else {
      throw new Error(`The pie recipe needs ${PIE_COST} apples`);
    }
  },
  makePizza(state, index) {
    const character = state.characters[index];
    if (character.bag.apples >= PIZZA_COST) {
      character.bag.apples -= PIZZA_COST;
      character.bag.pizzas++;
    } else {
      throw new Error(`The pizza recipe needs ${PIZZA_COST} apples`);
    }
  },
  deafeatEnemy(state, { index, enemyRank }) {
    const character = state.characters[index];
    if (!character.rankBeaten || enemyRank > character.rankBeaten) {
      character.rankBeaten = enemyRank;
    }
    character.bag.apples += Math.ceil(Math.pow(8, enemyRank) / APPLE_COST);
  },
  buyTicket(state, index) {
    const character = state.characters[index];
    if (character.bag.money >= TICKET_COST) {
      character.bag.money -= TICKET_COST;
      character.bag.tickets++;
    } else {
      throw new Error(`Not enough money. You need ${TICKET_COST} per ticket.`);
    }
  },
  payForBattle(state, index) {
    const character = state.characters[index];
    if (character.bag.tickets > 0) {
      character.bag.tickets--;
    } else {
      throw new Error(`You need to buy a ticket before you can battle.`);
    }
  }
};
