import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { scaleH, scaleW } from 'utils/scale';
import { Colors, Images } from 'config';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: scaleH(16.5),
    height: scaleH(14.5),
    resizeMode: 'stretch',
  },
  text: {
    fontSize: scaleH(10),
    color: Colors.lightLabel,
    marginLeft: scaleW(5),
  },
});

const Time = ({ time }) => {
  return (
    <View style={styles.container}>
      <Image source={Images.HistoryIcon} style={styles.image} />
      <Text style={styles.text}>{time}</Text>
    </View>
  );
};

export default Time;
