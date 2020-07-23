import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { scaleH, scaleW } from 'utils/scale';
import { Images } from 'config';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: scaleW(64),
    height: scaleH(20),
    backgroundColor: '#FFEDD8',
    borderRadius: scaleH(20),
    borderWidth: 1,
    borderColor: '#FFEDD8',
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
    color: '#FF8138',
    marginLeft: scaleW(5),
  },
});

const Calory = ({ amount }) => {
  return (
    <View style={styles.container}>
      <Image source={Images.CaloryIcon} style={styles.image} />
      <Text style={styles.text}>{`${amount}Cal`}</Text>
    </View>
  );
};

export default Calory;
