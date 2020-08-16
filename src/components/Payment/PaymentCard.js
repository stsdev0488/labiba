import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors, Images } from 'config';
import { scaleH, scaleW } from 'utils/scale';
import TrashButton from 'components/TrashButton';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: scaleH(10),
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 8,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.2,
    elevation: 4,
    paddingHorizontal: scaleW(15),
    paddingTop: scaleH(40),
    paddingBottom: scaleH(10),
    marginBottom: scaleH(10),
  },
  cardNumber: {
    fontSize: scaleH(15),
    lineHeight: scaleH(19),
    color: Colors.darkLabel,
    fontWeight: '500',
  },
  dateHeader: {
    fontSize: scaleH(14),
    lineHeight: scaleH(19),
    color: Colors.formText,
    marginTop: scaleH(15),
  },
  date: {
    fontSize: scaleH(14),
    fontWeight: '800',
    color: Colors.darkLabel,
    marginTop: scaleH(5),
  },
  cardName: {
    fontSize: scaleH(16),
    fontWeight: 'bold',
    color: '#2A2A33',
  },
  cardNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scaleH(20),
  },
  actionContainer: {
    position: 'absolute',
    right: scaleW(10),
    top: scaleH(10),
  },
});

const PaymentCard = ({ data, selected, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.cardNumber}>{data.cardNumber}</Text>
        <Text style={styles.dateHeader}>Month / Year</Text>
        <Text style={styles.date}>{data.date}</Text>
        <View style={styles.cardNameContainer}>
          <Text style={styles.cardName}>{data.cardName}</Text>
          <Image
            source={
              data.type === 'visa'
                ? Images.visa
                : data.type === 'paypal'
                ? Images.paypal
                : Images.masterCard
            }
          />
        </View>
        <View style={styles.actionContainer}>
          {selected ? (
            <Icon name="checkcircle" size={scaleH(20)} color={Colors.primary} />
          ) : (
            <TrashButton />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PaymentCard;
