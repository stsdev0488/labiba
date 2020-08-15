import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { scaleH } from 'utils/scale';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: scaleH(14),
    lineHeight: scaleH(24),
    fontWeight: '500',
    color: '#9B9FAA',
    textAlign: 'center',
  },
});

const ListEmptyComponent = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default ListEmptyComponent;
