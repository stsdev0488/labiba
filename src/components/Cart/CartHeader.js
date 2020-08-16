import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { scaleH, scaleW } from 'utils/scale';
import { Colors } from 'config';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaleW(30),
    paddingVertical: scaleH(15),
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: scaleH(15),
    borderBottomRightRadius: scaleH(15),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 6,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.2,
    elevation: 4,
  },
  totalPriceText: {
    fontSize: scaleH(13),
    color: Colors.white,
    fontWeight: '800',
  },
  scoreText: {
    fontSize: scaleH(13),
    color: Colors.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleH(5),
  },
});

const CartHeader = ({ totalPrice, averageScore, itemCount }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text
          style={styles.totalPriceText}
        >{`Subtotal (${itemCount} items)`}</Text>
        <Text style={styles.totalPriceText}>{totalPrice}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.scoreText}>Cart Average Score</Text>
        <Text style={styles.scoreText}>{averageScore}</Text>
      </View>
    </View>
  );
};

export default CartHeader;
