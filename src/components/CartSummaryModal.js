import React, {useMemo, useRef, useState} from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scaleH, scaleW } from 'utils/scale';
import { Colors, Images, Styles } from 'config';
import FormButton from 'components/Forms/FormButton';
import FormInput from 'components/Forms/FormInput';

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    height: scaleH(350),
    borderTopLeftRadius: scaleH(15),
    borderTopRightRadius: scaleH(15),
    paddingHorizontal: scaleW(20),
    paddingTop: scaleH(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleH(10),
  },
  headerTitle: {
    fontSize: scaleH(16),
    fontWeight: '500',
    color: '#2A2A33',
    marginLeft: scaleW(10),
  },
  cartSummaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleH(5),
  },
  rowText: {
    fontSize: scaleH(14),
    fontWeight: '500',
    lineHeight: scaleH(24),
    color: Colors.formText,
  },
  addCoupon: {
    fontSize: scaleH(12),
    fontWeight: '500',
    color: Colors.primary,
    paddingTop: scaleH(7),
    paddingBottom: scaleH(3),
    paddingHorizontal: scaleW(7),
    borderRadius: 5,
    borderColor: Colors.primary,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.linkNormalLabel,
  },
  formButton: {
    height: scaleH(45),
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.33,
    shadowRadius: 8,
  },
});

const CartSummaryModal = ({
  visible,
  closeModal,
  addCoupon,
  handlePay,
  subTotal,
  totalCount,
  promotionalDiscount,
  shippingFee,
  coupon,
}) => {
  const total = useMemo(() => {
    return subTotal - promotionalDiscount + shippingFee - coupon;
  }, [subTotal, promotionalDiscount, shippingFee, coupon]);
  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <View style={styles.cartSummaryContainer}>
            <Image source={Images.cart} />
            <Text style={styles.headerTitle}>YOUR CART SUMMARY</Text>
          </View>
          <TouchableOpacity onPress={closeModal}>
            <Icon name="close" color={Colors.primary} size={scaleH(25)} />
          </TouchableOpacity>
        </View>
        <View style={{ paddingVertical: scaleH(5) }}>
          <View style={styles.row}>
            <Text style={{ ...styles.rowText, color: '#2A2A33' }}>
              {`Subtotal (${totalCount}items)`}
            </Text>
            <Text style={{ ...styles.rowText, color: '#2A2A33' }}>
              {`Rs. ${subTotal.toFixed(2).toString()}`}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>Promotion discounts</Text>
            <Text style={styles.rowText}>{`Rs. ${promotionalDiscount}`}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={{ paddingVertical: scaleH(5) }}>
          <View style={styles.row}>
            <Text style={styles.rowText}>Delivery charge(Home delivery)</Text>
            <Text style={styles.rowText}>{`Rs. ${shippingFee}`}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>Add Coupon</Text>
            <TouchableOpacity onPress={addCoupon}>
              <Text style={styles.addCoupon}>ADD COUPON</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={{ ...styles.row, paddingVertical: scaleH(10) }}>
          <Text style={{ ...styles.rowText, color: '#2A2A33' }}>
            Est. Total
          </Text>
          <Text
            style={{
              ...styles.rowText,
              color: '#2A2A33',
              fontSize: scaleH(20),
            }}
          >
            {`Rs. ${total.toFixed(2).toString()}`}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <FormButton
              buttonStyle={{
                ...Styles.formButton,
                ...styles.formButton,
                backgroundColor: '#B8B7B7',
                borderColor: '#B8B7B7',
                shadowColor: '#00C0FB',
              }}
              titleStyle={{ fontSize: scaleH(15), fontWeight: '800' }}
              onPress={closeModal}
              title="Cancel"
            />
          </View>
          <View style={{ flex: 1, marginLeft: scaleW(25) }}>
            <FormButton
              buttonStyle={{
                ...Styles.formButton,
                ...styles.formButton,
                shadowColor: '#29C17E',
              }}
              titleStyle={{ fontSize: scaleH(15), fontWeight: '800' }}
              onPress={handlePay}
              title="Pay Now"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CartSummaryModal;
