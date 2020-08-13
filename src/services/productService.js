import Realm from 'realm';
import {
  NutrimentLevelSchema,
  NutrimentSchema,
  PRODUCT_SCHEMA,
  ProductSchema,
} from 'config/dataSchema';
import _ from 'lodash';

export const saveProduct = (data) => {
  Realm.open({ schema: [ProductSchema, NutrimentSchema, NutrimentLevelSchema] })
    .then((realm) => {
      realm.write(() => {
        realm.create(PRODUCT_SCHEMA, data);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const findProduct = (code) => {
  return Realm.open({
    schema: [ProductSchema, NutrimentSchema, NutrimentLevelSchema],
  })
    .then((realm) => {
      return realm.objects(PRODUCT_SCHEMA).filtered('code = $0', code);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const findAllProducts = (code) => {
  return Realm.open({
    schema: [ProductSchema, NutrimentSchema, NutrimentLevelSchema],
  })
    .then((realm) => {
      return _.values(realm.objects(PRODUCT_SCHEMA));
    })
    .catch((error) => {
      console.log(error);
    });
};
