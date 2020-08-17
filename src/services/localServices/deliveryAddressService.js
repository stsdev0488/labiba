import Realm from 'realm';
import {
  DELIVERY_ADDRESS_SCHEMA,
  DeliveryAddressSchema,
} from 'config/dataSchema';

export const saveDeliveryAddress = (data) => {
  Realm.open({ schema: [DeliveryAddressSchema] })
    .then((realm) => {
      realm.write(() => {
        realm.create(DELIVERY_ADDRESS_SCHEMA, data);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAllDeliveryAddresses = () => {
  return Realm.open({
    schema: [DeliveryAddressSchema],
  })
    .then((realm) => {
      return realm.objects(DELIVERY_ADDRESS_SCHEMA);
    })
    .catch((error) => {
      console.log(error);
    });
};
