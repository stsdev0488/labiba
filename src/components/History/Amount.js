import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { scaleH, scaleW } from 'utils/scale';
import { Images } from 'config';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: scaleW(64),
    height: scaleH(20),
    backgroundColor: '#65A9E6',
    borderRadius: scaleH(20),
    borderWidth: 1,
    borderColor: '#65A9E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: scaleH(12),
    height: scaleH(12),
    resizeMode: 'stretch',
  },
  text: {
    fontSize: scaleH(10),
    color: '#2287EC',
    marginLeft: scaleW(5),
  },
});

const Amount = ({ amount }) => {
  return (
    <View style={styles.container}>
      <Image source={Images.WeightIcon} style={styles.image} />
      <Text style={styles.text}>{`${amount}g`}</Text>
    </View>
  );
};

export default Amount;
