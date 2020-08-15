import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { scaleH, scaleW } from 'utils/scale';
import { Colors, Images } from 'config';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaleW(30),
    paddingVertical: scaleH(13),
    backgroundColor: Colors.white,
    borderBottomLeftRadius: scaleH(15),
    borderBottomRightRadius: scaleH(15),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 6,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.2,
    zIndex: 10000,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleH(5),
  },
  deliveryAddress: {
    fontSize: scaleH(13),
    lineHeight: scaleH(24),
    fontWeight: '500',
    color: Colors.darkLabel,
  },
  addressHeader: {
    fontSize: scaleH(11),
    fontWeight: '500',
    color: Colors.darkLabel,
  },
  address: {
    fontSize: scaleH(11),
    fontWeight: '500',
    color: '#666B6F',
  },
  addressContainer: {
    marginLeft: scaleW(10),
    marginTop: scaleH(5),
  },
});

const PaymentHeader = ({ onAddPayment }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.deliveryAddress}>Credit/Debit Cards</Text>
        <TouchableOpacity onPress={onAddPayment}>
          <Text style={[styles.deliveryAddress, { color: Colors.primary }]}>
            ADD NEW Card
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Image source={Images.creditCardIcon} />
            <View style={styles.addressContainer}>
              <Text style={styles.addressHeader}>************1234</Text>
              <Text style={styles.address}>Name Card Visa Debit Card</Text>
            </View>
          </View>
        </View>
        <Icon name="check" color={Colors.primary} size={scaleH(20)} />
      </View>
    </View>
  );
};

export default PaymentHeader;
