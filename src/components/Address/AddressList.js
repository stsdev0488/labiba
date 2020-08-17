import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import AddressItem from 'components/Address/AddressItem';
import Separator from 'components/Separator';
import { scaleH, scaleW } from 'utils/scale';
import { Colors } from 'config';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: scaleH(10),
    shadowOffset: {
      width: 0,
      height: scaleH(6),
    },
    shadowRadius: scaleH(12),
    shadowColor: '#2F3432',
    shadowOpacity: 0.1,
    elevation: 4,
  },
});

const AddressList = ({ options, selected, onItemPress }) => {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: scaleW(10),
          paddingVertical: scaleH(10),
        }}
        data={options}
        renderItem={({ item, index }) => (
          <AddressItem
            address={item.addressLine1}
            state={item.country}
            selected={item.id === selected.id}
            onPress={() => onItemPress(item)}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
        keyExtractor={(item, index) => item.id.toString()}
      />
    </View>
  );
};

export default AddressList;
