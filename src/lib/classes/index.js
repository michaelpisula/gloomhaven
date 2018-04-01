import * as _ from "lodash";

import {BASE_CARDS, NUMBER_MODIFIERS, END_ACTIONS} from "../cards";
import * as bonuses from "../bonuses";
import * as elements from "../elements";
import * as statusEffects from "../statusEffects";

class CardsModifier {
    constructor(cards) {
        this._cards = cards;
    }

    removeCards(count, card) {
        let removedCount = 0;
        this._cards = this._cards.filter((c) => {
            const keep = removedCount >= count || !_.isEqual(c, card);
            if (!keep) {
                removedCount++;
            }
            return keep;
        });
        return this;
    }

    addCards(count, card) {
        this._cards = this._cards.concat(Array(count).fill(card))
        return this;
    }

    cards() {
        return this._cards;
    }
}

const CLASSES = {
    "Brute": {
        stats: [
            {maxHP: 10},
            {maxHP: 12},
            {maxHP: 14},
            {maxHP: 16},
            {maxHP: 18},
            {maxHP: 20},
            {maxHP: 22},
            {maxHP: 24},
            {maxHP: 26},
        ],
        perks: [
            {
                description: "Remove two -1 cards",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .removeCards(2, BASE_CARDS.MINUS_ONE)
                    .cards(),
            },
            {
                description: "Replace one -1 card with one +1 card",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .removeCards(1, BASE_CARDS.MINUS_ONE)
                    .addCards(1, BASE_CARDS.PLUS_ONE)
                    .cards(),
            },
            {
                description: "Add two +1 cards",
                used: [false, false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(2, BASE_CARDS.PLUS_ONE)
                    .cards(),
            },
            {
                description: "Add one +3 card",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_THREE})
                    .cards(),
            },
            {
                description: "Add three ROLLING PUSH 1 cards",
                used: [false, false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(3, {modifier: statusEffects.push(1), endAction: END_ACTIONS.ROLLING})
                    .cards(),
            },
            {
                description: "Add two ROLLING PIERCE 3 cards",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(2, {modifier: bonuses.pierce(3), endAction: END_ACTIONS.ROLLING})
                    .cards(),
            },
            {
                description: "Add one ROLLING STUN card",
                used: [false, false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, {modifier: statusEffects.STUN, endAction: END_ACTIONS.ROLLING})
                    .cards(),
            },
            {
                description: "Add one ROLLING DISARM card and one ROLLING MUDDLE card",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, {modifier: statusEffects.DISARM, endAction: END_ACTIONS.ROLLING})
                    .addCards(1, {modifier: statusEffects.MUDDLE, endAction: END_ACTIONS.ROLLING})
                    .cards(),
            },
            {
                description: "Add one ROLLING ADD TARGET card",
                used: [false, false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, {modifier: bonuses.ADD_TARGET, endAction: END_ACTIONS.ROLLING})
                    .cards(),
            },
            {
                description: "Add one +1 shield 1, self card",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ONE, extra: bonuses.shield("1")})
                    .cards(),
            },
            {
                description: "Ignore negative item effects and add one +1 card",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, BASE_CARDS.PLUS_ONE)
                    .cards(),
            },
        ],
    },
    "Cragheart": {
        stats: [
            {maxHP: 10},
            {maxHP: 12},
            {maxHP: 14},
            {maxHP: 16},
            {maxHP: 18},
            {maxHP: 20},
            {maxHP: 22},
            {maxHP: 24},
            {maxHP: 26},
        ],
        perks: [
            {
                description: "Remove four +0 cards",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .removeCards(4, BASE_CARDS.PLUS_ZERO)
                    .cards(),
            },
            {
                description: "Replace one -1 card with one +1 card",
                used: [false, false, false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .removeCards(1, BASE_CARDS.MINUS_ONE)
                    .addCards(1, BASE_CARDS.PLUS_ONE)
                    .cards(),
            },
            {
                description: "Add one -2 card and two +2 cards",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, BASE_CARDS.MINUS_TWO)
                    .addCards(2, BASE_CARDS.PLUS_TWO)
                    .cards(),
            },
            {
                description: "Add one +1 IMMOBILIZE card",
                used: [false, false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ONE, extra: statusEffects.IMMOBILIZE})
                    .cards(),
            },
            {
                description: "Add one +2 MUDDLE card",
                used: [false, false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_TWO, extra: statusEffects.MUDDLE})
                    .cards(),
            },
            {
                description: "Add two PUSH 2 cards",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(2, {modifier: statusEffects.push(2)})
                    .cards(),
            },
            {
                description: "Add two ROLLING EARTH cards",
                used: [false, false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(2, {modifier: elements.EARTH, endAction: END_ACTIONS.ROLLING})
                    .cards(),
            },
            {
                description: "Add two ROLLING AIR cards",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(2, {modifier: elements.AIR, endAction: END_ACTIONS.ROLLING})
                    .cards(),
            },
            {
                description: "Ignore negative item effects",
                used: [false],
                modifyCards: (cards) => cards,
            },
            {
                description: "Ignore negative dungeon effects",
                used: [false],
                modifyCards: (cards) => cards,
            },
        ],
    },
    "Mindthief": {
        stats: [
            {maxHP: 6},
            {maxHP: 7},
            {maxHP: 8},
            {maxHP: 9},
            {maxHP: 10},
            {maxHP: 11},
            {maxHP: 12},
            {maxHP: 13},
            {maxHP: 14},
        ],
        perks: [
            {
                description: "Remove two -1 cards",
                used: [false, false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .removeCards(2, BASE_CARDS.MINUS_ONE)
                    .cards(),
            },
            {
                description: "Remove four +0 cards",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .removeCards(4, BASE_CARDS.PLUS_ZERO)
                    .cards(),
            },
            {
                description: "Replace two +1 cards with two +2 cards",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .removeCards(2, BASE_CARDS.PLUS_ONE)
                    .addCards(2, BASE_CARDS.PLUS_TWO)
                    .cards(),
            },
            {
                description: "Replace one -2 card with one +0 cards",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .removeCards(1, BASE_CARDS.MINUS_TWO)
                    .addCards(1, BASE_CARDS.PLUS_ZERO)
                    .cards(),
            },
            {
                description: "Add one +2 ICE card",
                used: [false, false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_TWO, extra: elements.ICE})
                    .cards(),
            },
            {
                description: "Add two ROLLING +1 cards",
                used: [false, false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(2, {modifier: NUMBER_MODIFIERS.PLUS_ONE, endAction: END_ACTIONS.ROLLING})
                    .cards(),
            },
            {
                description: "Add three ROLLING PULL 1 cards",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(3, {modifier: statusEffects.pull(1), endAction: END_ACTIONS.ROLLING})
                    .cards(),
            },
            {
                description: "Add three ROLLING MUDDLE cards",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(3, {modifier: statusEffects.MUDDLE, endAction: END_ACTIONS.ROLLING})
                    .cards(),
            },
            {
                description: "Add two ROLLING IMMOBILIZE cards",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(2, {modifier: statusEffects.IMMOBILIZE, endAction: END_ACTIONS.ROLLING})
                    .cards(),
            },
            {
                description: "Add one ROLLING STUN card",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, {modifier: statusEffects.STUN, endAction: END_ACTIONS.ROLLING})
                    .cards(),
            },
            {
                description: "Add one ROLLING DISARM card and one ROLLING MUDDLE card",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, {modifier: statusEffects.DISARM, endAction: END_ACTIONS.ROLLING})
                    .addCards(1, {modifier: statusEffects.MUDDLE, endAction: END_ACTIONS.ROLLING})
                    .cards(),
            },
            {
                description: "Ignore negative scenario effects",
                used: [false],
                modifyCards: (cards) => cards,
            },
        ],
    },
    "Scoundrel": {
        stats: [
            {maxHP: 8},
            {maxHP: 9},
            {maxHP: 11},
            {maxHP: 12},
            {maxHP: 14},
            {maxHP: 15},
            {maxHP: 17},
            {maxHP: 18},
            {maxHP: 20},
        ],
        perks: [
            {
                description: "Remove two -1 cards",
                used: [false, false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .removeCards(2, BASE_CARDS.MINUS_ONE)
                    .cards(),
            },
            {
                description: "Remove four +0 cards",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .removeCards(4, BASE_CARDS.PLUS_ZERO)
                    .cards(),
            },
            {
                description: "Replace one -2 card with one +0 card",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .removeCards(1, BASE_CARDS.MINUS_TWO)
                    .addCards(1, BASE_CARDS.PLUS_ZERO)
                    .cards(),
            },
            {
                description: "Replace one -1 card with one +1 card",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .removeCards(1, BASE_CARDS.MINUS_ONE)
                    .addCards(1, BASE_CARDS.PLUS_ONE)
                    .cards(),
            },
            {
                description: "Replace one +0 card with one +2 card",
                used: [false, false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .removeCards(1, BASE_CARDS.PLUS_ZERO)
                    .addCards(1, BASE_CARDS.PLUS_TWO)
                    .cards(),
            },
            {
                description: "Add two ROLLING +1 cards",
                used: [false, false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(2, {modifier: NUMBER_MODIFIERS.PLUS_ONE, endAction: END_ACTIONS.ROLLING})
                    .cards(),
            },
            {
                description: "Add two ROLLING PIERCE 3 cards",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(2, {modifier: bonuses.pierce(3), endAction: END_ACTIONS.ROLLING})
                    .cards(),
            },
            {
                description: "Add two ROLLING POISON cards",
                used: [false, false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(2, {modifier: statusEffects.POISON, endAction: END_ACTIONS.ROLLING})
                    .cards(),
            },
            {
                description: "Add two ROLLING MUDDLE cards",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(2, {modifier: statusEffects.MUDDLE, endAction: END_ACTIONS.ROLLING})
                    .cards(),
            },
            {
                description: "Add one ROLLING INVISIBLE card",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, {modifier: statusEffects.INVISIBLE, endAction: END_ACTIONS.ROLLING})
                    .cards(),
            },
            {
                description: "Ignore negative scenario effects",
                used: [false],
                modifyCards: (cards) => cards,
            },
        ],
    },
    "Spellweaver": {
        stats: [
            {maxHP: 6},
            {maxHP: 7},
            {maxHP: 8},
            {maxHP: 9},
            {maxHP: 10},
            {maxHP: 11},
            {maxHP: 12},
            {maxHP: 13},
            {maxHP: 14},
        ],
        perks: [
            {
                description: "Remove four +0 cards",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .removeCards(4, BASE_CARDS.PLUS_ZERO)
                    .cards(),
            },
            {
                description: "Replace one -1 card with one +1 card",
                used: [false, false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .removeCards(1, BASE_CARDS.MINUS_ONE)
                    .addCards(1, BASE_CARDS.PLUS_ONE)
                    .cards(),
            },
            {
                description: "Add two +1 cards",
                used: [false, false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(2, BASE_CARDS.PLUS_ONE)
                    .cards(),
            },
            {
                description: "Add one +0 STUN card",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ZERO, extra: statusEffects.STUN})
                    .cards(),
            },
            {
                description: "Add one +1 WOUND card",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ONE, extra: statusEffects.WOUND})
                    .cards(),
            },
            {
                description: "Add one +1 IMMOBILIZE card",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ONE, extra: statusEffects.IMMOBILIZE})
                    .cards(),
            },
            {
                description: "Add one +1 CURSE card",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ONE, extra: statusEffects.CURSE})
                    .cards(),
            },
            {
                description: "Add one +2 FIRE card",
                used: [false, false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_TWO, extra: elements.FIRE})
                    .cards(),
            },
            {
                description: "Add one +2 ICE card",
                used: [false, false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_TWO, extra: elements.ICE})
                    .cards(),
            },
            {
                description: "Add one ROLLING EARTH and one ROLLING AIR card",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, {modifier: elements.EARTH, endAction: END_ACTIONS.ROLLING})
                    .addCards(1, {modifier: elements.AIR, endAction: END_ACTIONS.ROLLING})
                    .cards(),
            },
            {
                description: "Add one ROLLING LIGHT and one ROLLING DARK card",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, {modifier: elements.LIGHT, endAction: END_ACTIONS.ROLLING})
                    .addCards(1, {modifier: elements.DARK, endAction: END_ACTIONS.ROLLING})
                    .cards(),
            },
        ],
    },
    "Tinkerer": {
        stats: [
            {maxHP: 8},
            {maxHP: 9},
            {maxHP: 11},
            {maxHP: 12},
            {maxHP: 14},
            {maxHP: 15},
            {maxHP: 17},
            {maxHP: 18},
            {maxHP: 20},
        ],
        perks: [
            {
                description: "Remove two -1 cards",
                used: [false, false],
                modifyCards: (cards) => new CardsModifier(cards)
                    .removeCards(2, BASE_CARDS.MINUS_ONE)
                    .cards(),
            },
            {
                description: "Replace one -2 card with one +0 card",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .removeCards(1, BASE_CARDS.MINUS_TWO)
                    .addCards(1, BASE_CARDS.PLUS_ZERO)
                    .cards(),
            },
            {
                description: "Add two +1 cards",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(2, BASE_CARDS.PLUS_ONE)
                    .cards(),
            },
            {
                description: "Add one +3 card",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_THREE})
                    .cards(),
            },
            {
                description: "Add two ROLLING FIRE card",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(2, {modifier: elements.FIRE, endAction: END_ACTIONS.ROLLING})
                    .cards(),
            },
            {
                description: "Add three ROLLING MUDDLE cards",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(3, {modifier: statusEffects.MUDDLE, endAction: END_ACTIONS.ROLLING})
                    .cards(),
            },
            {
                description: "Add one +1 WOUND card",
                used: [false, false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ONE, extra: statusEffects.WOUND})
                    .cards(),
            },
            {
                description: "Add one +1 IMMOBILIZE card",
                used: [false, false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ONE, extra: statusEffects.IMMOBILIZE})
                    .cards(),
            },
            {
                description: "Add one +1 Heal 2 self card",
                used: [false, false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(2, {modifier: NUMBER_MODIFIERS.PLUS_ONE, extra: bonuses.heal("+2")})
                    .cards(),
            },
            {
                description: "Add one +0 ADD TARGET card",
                used: [false],
                modifyCards: (cards) =>
                    new CardsModifier(cards)
                    .addCards(1, {modifier: bonuses.ADD_TARGET})
                    .cards(),
            },
            {
                description: "Ignore negative scenario effects",
                used: [false],
                modifyCards: (cards) => cards,
            },
        ],
    },
};

export function newPerksUsage(characterClass) {
    const classData = CLASSES[characterClass];
    if (!classData) {
        return null;
    }
    return classData.perks.map((p) => p.used);
}

export function perksForClass(characterClass) {
    const classData = CLASSES[characterClass];
    if (!classData) {
        return null;
    }
    return classData.perks;
}

export const CLASS_NAMES = Object.keys(CLASSES);

export function getCharacterStats(className, level) {
    return CLASSES[className].stats[level];
}
