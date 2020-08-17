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

export const getAllProducts = () => {
  return Realm.open({
    schema: [ProductSchema, NutrimentSchema, NutrimentLevelSchema],
  })
    .then((realm) => {
      return realm.objects(PRODUCT_SCHEMA);
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

export const addToFavoriteList = (code, favoriteList) => {
  Realm.open({
    schema: [ProductSchema, NutrimentSchema, NutrimentLevelSchema],
  })
    .then((realm) => {
      return realm.write(() => {
        const product = realm
          .objects(PRODUCT_SCHEMA)
          .filtered('code = $0', code);
        if (product.length > 0) {
          product[0].favorite = favoriteList;
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const removeFromFavoriteList = (code, favoriteId) => {
  Realm.open({
    schema: [ProductSchema, NutrimentSchema, NutrimentLevelSchema],
  })
    .then((realm) => {
      return realm.write(() => {
        const product = realm
          .objects(PRODUCT_SCHEMA)
          .filtered('code = $0', code);
        if (product.length > 0) {
          const favoriteList = Array.from(product[0].favorite);
          product[0].favorite = favoriteList.filter(
            (item) => item !== favoriteId,
          );
        }
      });
    })
    .catch((error) => console.log(error));
};
