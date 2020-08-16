import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { scaleH, scaleW } from 'utils/scale';
import { Colors } from 'config';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleW(10),
    paddingVertical: scaleH(10),
  },
  address: {
    fontSize: scaleH(16),
    lineHeight: scaleH(19),
    color: '#4C4D4C',
  },
});

const AddressItem = ({ selected, onPress, address, state }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View>
          <Text style={styles.address}>{address}</Text>
          <Text
            style={[
              styles.address,
              { fontWeight: selected ? '800' : '300', marginTop: scaleH(3) },
            ]}
          >
            {state}
          </Text>
        </View>
        {selected ? (
          <Icon
            name="radio-button-checked"
            color={Colors.primary}
            size={scaleH(20)}
          />
        ) : (
          <Icon
            name="radio-button-unchecked"
            color={Colors.formInputBorder}
            size={scaleH(20)}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddressItem;
