import Realm from 'realm';
import {
  NutrimentLevelSchema,
  NutrimentSchema,
  PRODUCT_SCHEMA,
  ProductSchema,
} from 'config/dataSchema';

let realm = new Realm({
  schema: [ProductSchema, NutrimentSchema, NutrimentLevelSchema],
});

export const findProduct = (barcode) => {
  return realm.objects(PRODUCT_SCHEMA).filtered(`code = ${barcode}`);
};

export const saveProduct = (data) => {
  realm.write(() => {
    realm.create(PRODUCT_SCHEMA, data);
  });
};
