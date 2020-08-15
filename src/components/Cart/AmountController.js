import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Colors } from 'config';
import { scaleH, scaleW } from 'utils/scale';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaleH(5),
  },
  value: {
    fontSize: scaleH(17),
    color: '#555555',
    marginHorizontal: scaleW(15),
  },
});

const AmountController = ({ value, onPlus, onMinus }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMinus}>
        <Icon name="minus" color={Colors.primary} size={scaleH(20)} />
      </TouchableOpacity>
      <Text style={styles.value}>{value}</Text>
      <TouchableOpacity onPress={onPlus}>
        <Icon name="plus" color={Colors.primary} size={scaleH(20)} />
      </TouchableOpacity>
    </View>
  );
};

export default AmountController;
