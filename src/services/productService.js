import Realm from 'realm';
import {
  PRODUCT_SCHEMA,
  ProductSchema,
  NutrimentSchema,
  NutrimentLevelSchema,
} from 'config/dataSchema';

let realm = new Realm({
  schema: [ProductSchema, NutrimentSchema, NutrimentLevelSchema],
});

const saveProduct = (data) => {
  realm.write(() => {
    realm.create(PRODUCT_SCHEMA, data);
  });
};
