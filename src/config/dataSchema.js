export const NUTRIMENT_SCHEMA = 'Nutriments';

export const NutrimentSchema = {
  name: NUTRIMENT_SCHEMA,
  properties: {
    'vitamin-c': 'float?',
    sugars: 'float?',
    'nova-group_100g': 'float?',
    iron_serving: 'float?',
    'trans-fat_serving': 'float?',
    'saturated-fat_value': 'float?',
    'energy-kcal_unit': {
      type: 'string?',
      default: 'kcal',
    },
    'nova-group_serving': 'float?',
    proteins_value: 'float?',
    'vitamin-c_serving': 'float?',
    fiber_value: 'float?',
    'energy-kcal_serving': 'float?',
    'vitamin-a_value': 'float?',
    'energy-kcal_100g': 'float?',
    sugars_100g: 'float?',
    'energy-kcal_value': 'float?',
    fiber_100g: 'float?',
    'vitamin-a_unit': {
      type: 'string?',
      default: 'IU',
    },
    'nutrition-score-fr_100g': 'float?',
    salt: 'float?',
    'vitamin-a_serving': 'float?',
    'saturated-fat_unit': {
      type: 'string?',
      default: 'g',
    },
    sugars_unit: {
      type: 'string?',
      default: 'g',
    },
    'vitamin-c_unit': {
      type: 'string?',
      default: 'mg',
    },
    'trans-fat_100g': 'float?',
    fat: 'float?',
    cholesterol_100g: 'float?',
    sodium_100g: 'float?',
    'saturated-fat': 'float?',
    'nutrition-score-fr_serving': 'float?',
    'fruits-vegetables-nuts-estimate-from-ingredients_100g': 'float?',
    proteins: 'float?',
    cholesterol: 'float?',
    salt_100g: 'float?',
    'trans-fat_value': 'float?',
    carbohydrates_100g: 'float?',
    energy_serving: 'float?',
    sodium: 'float?',
    proteins_serving: 'float?',
    proteins_100g: 'float?',
    fat_serving: 'float?',
    iron_unit: {
      type: 'string?',
      default: 'mg',
    },
    cholesterol_serving: 'float?',
    'energy-kcal': 'float?',
    iron: 'float?',
    salt_unit: {
      type: 'string?',
      default: 'mg',
    },
    'nova-group': 'float?',
    fat_value: 'float?',
    salt_serving: 'float?',
    calcium_100g: 'float?',
    sugars_serving: 'float?',
    energy_value: 'float?',
    iron_value: 'float?',
    calcium: 'float?',
    fiber: 'float?',
    sodium_unit: {
      type: 'string?',
      default: 'mg',
    },
    'vitamin-a': 'float?',
    energy_unit: {
      type: 'string?',
      default: 'kcal',
    },
    carbohydrates_serving: 'float?',
    sodium_value: 'float?',
    energy: 'float?',
    carbohydrates_value: 'float?',
    'saturated-fat_serving': 'float?',
    calcium_serving: 'float?',
    sugars_value: 'float?',
    'trans-fat': 'float?',
    fiber_serving: 'float?',
    cholesterol_value: 'float?',
    'nutrition-score-fr': 'float?',
    fat_100g: 'float?',
    proteins_unit: {
      type: 'string?',
      default: 'g',
    },
    sodium_serving: 'float?',
    cholesterol_unit: {
      type: 'string?',
      default: 'mg',
    },
    'vitamin-c_100g': 'float?',
    energy_100g: 'float?',
    carbohydrates_unit: {
      type: 'string?',
      default: 'g',
    },
    salt_value: 'float?',
    calcium_unit: {
      type: 'string?',
      default: 'mg',
    },
    iron_100g: 'float?',
    'trans-fat_unit': {
      type: 'string?',
      default: 'g',
    },
    calcium_value: 'float?',
    'vitamin-a_100g': 'float?',
    fat_unit: {
      type: 'string?',
      default: 'g',
    },
    'vitamin-c_value': 'float?',
    'saturated-fat_100g': 'float?',
    carbohydrates: 'float?',
    fiber_unit: {
      type: 'string?',
      default: 'g',
    },
  },
};

export const NUTRIMENT_LEVEL_SCHEMA = 'Nutriment_Level';
export const NutrimentLevelSchema = {
  name: NUTRIMENT_LEVEL_SCHEMA,
  properties: {
    fat: {
      type: 'string?',
      default: 'moderate',
    },
    'saturated-fat': {
      type: 'string?',
      default: 'moderate',
    },
    salt: {
      type: 'string?',
      default: 'moderate',
    },
    sugars: {
      type: 'string?',
      default: 'moderate',
    },
  },
};

export const PRODUCT_SCHEMA = 'product';
export const ProductSchema = {
  name: PRODUCT_SCHEMA,
  primaryKey: 'code',
  properties: {
    code: 'string',
    additives_tags: 'string?[]',
    allergens_tags: 'string?[]',
    categories_tags: 'string?[]',
    countries_tags: 'string?[]',
    product_name: 'string?',
    brands: 'string?',
    nutriments: NUTRIMENT_SCHEMA,
    score: 'float?',
    image_url: 'string?',
    serving_size: 'string?',
    favorite: 'string?[]',
  },
};

export const DELIVERY_ADDRESS_SCHEMA = 'DeliveryAddresses';
export const DeliveryAddressSchema = {
  name: DELIVERY_ADDRESS_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    country: 'string',
    firstName: 'string',
    lastName: 'string',
    addressLine1: 'string',
    addressLine2: 'string?',
    city: 'string',
    state: 'string',
    zip: 'string',
  },
};

export const CARD_SCHEMA = 'Cards';
export const CardSchema = {
  name: CARD_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    number: 'string',
    expiry: 'string',
    cvc: 'string',
    type: 'string',
    cardholderName: 'string',
  },
};
