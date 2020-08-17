import Realm from 'realm';
import { CARD_SCHEMA, CardSchema } from 'config/dataSchema';

export const saveCard = (data) => {
  Realm.open({ schema: [CardSchema] })
    .then((realm) => {
      realm.write(() => {
        realm.create(CARD_SCHEMA, data);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAllCards = () => {
  return Realm.open({
    schema: [CardSchema],
  })
    .then((realm) => {
      return realm.objects(CARD_SCHEMA);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteCard = (id) => {
  Realm.open({ schema: [CardSchema] })
    .then((realm) => {
      realm.write(() => {
        let cards = realm.objects(CARD_SCHEMA).filtered('id = $0', id);
        return realm.delete(cards);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
