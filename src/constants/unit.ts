// src/constants/units.ts

export interface UnitDefinition {
  /** The full name in singular form. e.g., "cup" */
  singular: string;
  /** The full name in plural form. e.g., "cups" */
  plural: string;
  /** The common abbreviation. e.g., "c" */
  abbreviation: string;
  /** The measurement system. */
  system: "metric" | "imperial" | "none";
  /** The type of measurement. Critical for conversion logic. */
  type: "volume" | "mass" | "quantity";
}

// The Single Source of Truth for all unit information.
// We use a Record to create a dictionary-like object.
export const UNITS: Record<string, UnitDefinition> = {
  // --- Volume ---
  cup: {
    singular: "cup",
    plural: "cups",
    abbreviation: "c",
    system: "imperial",
    type: "volume",
  },
  tablespoon: {
    singular: "tablespoon",
    plural: "tablespoons",
    abbreviation: "tbsp",
    system: "imperial",
    type: "volume",
  },
  teaspoon: {
    singular: "teaspoon",
    plural: "teaspoons",
    abbreviation: "tsp",
    system: "imperial",
    type: "volume",
  },
  milliliter: {
    singular: "milliliter",
    plural: "milliliters",
    abbreviation: "ml",
    system: "metric",
    type: "volume",
  },
  liter: {
    singular: "liter",
    plural: "liters",
    abbreviation: "l",
    system: "metric",
    type: "volume",
  },
  fluid_ounce: {
    singular: "fluid ounce",
    plural: "fluid ounces",
    abbreviation: "fl oz",
    system: "imperial",
    type: "volume",
  },

  // --- Mass ---
  gram: {
    singular: "gram",
    plural: "grams",
    abbreviation: "g",
    system: "metric",
    type: "mass",
  },
  kilogram: {
    singular: "kilogram",
    plural: "kilograms",
    abbreviation: "kg",
    system: "metric",
    type: "mass",
  },
  ounce: {
    singular: "ounce",
    plural: "ounces",
    abbreviation: "oz",
    system: "imperial",
    type: "mass",
  },
  pound: {
    singular: "pound",
    plural: "pounds",
    abbreviation: "lb",
    system: "imperial",
    type: "mass",
  },

  // --- Quantity ---
  piece: {
    singular: "piece",
    plural: "pieces",
    abbreviation: "pc",
    system: "none",
    type: "quantity",
  },
  clove: {
    singular: "clove",
    plural: "cloves",
    abbreviation: "clove",
    system: "none",
    type: "quantity",
  },
  sprig: {
    singular: "sprig",
    plural: "sprigs",
    abbreviation: "sprig",
    system: "none",
    type: "quantity",
  },
  pinch: {
    singular: "pinch",
    plural: "pinches",
    abbreviation: "pinch",
    system: "none",
    type: "quantity",
  },
  dash: {
    singular: "dash",
    plural: "dashes",
    abbreviation: "dash",
    system: "none",
    type: "quantity",
  },
  can: {
    singular: "can",
    plural: "cans",
    abbreviation: "can",
    system: "none",
    type: "quantity",
  },
  whole: {
    singular: "whole",
    plural: "whole",
    abbreviation: "whole",
    system: "none",
    type: "quantity",
  },
};

/**
 * A type representing all valid measurement unit keys.
 * This is dynamically generated from the keys of the UNITS object,
 * ensuring it's always in sync.
 */
export type UnitKey = keyof typeof UNITS;

/**
 * An array of all valid unit keys.
 * Useful for populating UI elements like dropdowns.
 */
export const ALL_UNIT_KEYS: UnitKey[] = Object.keys(UNITS) as UnitKey[];

/**
 * A utility function to get the correct display name for a unit based on quantity.
 * @example getUnitDisplayName('cup', 2) // returns "cups"
 * @example getUnitDisplayName('cup', 1) // returns "cup"
 */
export function getUnitDisplayName(key: UnitKey, quantity: number): string {
  const unit = UNITS[key];
  if (!unit) return key; // Fallback
  return quantity === 1 ? unit.singular : unit.plural;
}
