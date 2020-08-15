import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from 'config';
import { scaleH } from 'utils/scale';

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
  },
});

const PaymentCard = () => {
  return <View />;
};
