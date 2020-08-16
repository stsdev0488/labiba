import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Container from 'components/Container';
import Header from 'components/Header/Header';
import AddressHeader from 'components/Address/AddressHeader';
import { Styles } from 'config';
import { scaleH, scaleW } from 'utils/scale';
import AddressList from 'components/Address/AddressList';

const addresses = [
  {
    id: 0,
    address: 'Redmond, WA 98052',
    state: 'United State',
  },
  {
    id: 1,
    address: 'Redmond, WA 98052',
    state: 'United State',
  },
  {
    id: 2,
    address: 'Redmond, WA 98052',
    state: 'United State',
  },
  {
    id: 3,
    address: 'Redmond, WA 98052',
    state: 'United State',
  },
];

const styles = StyleSheet.create({
  container: {
    paddingTop: scaleH(30),
    paddingHorizontal: scaleW(18),
  },
  addressListHeader: {
    fontSize: scaleH(16),
    fontWeight: '800',
    lineHeight: scaleH(19),
  },
});

const HeaderRight = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={Styles.headerRightText}>Next</Text>
  </TouchableOpacity>
);

const Address = ({ navigation }) => {
  const [selectedAddress, setSelectedAddress] = useState(0);
  return (
    <Container>
      <Header
        title="Address"
        navigation={navigation}
        right={<HeaderRight onPress={() => navigation.navigate('Payment')} />}
      />
      <AddressHeader onAddAddress={() => navigation.navigate('AddAddress')} />
      <View style={styles.container}>
        <Text style={styles.addressListHeader}>All Delivery Addresses</Text>
        <View style={{ marginTop: scaleH(15) }}>
          <AddressList
            options={addresses}
            selected={selectedAddress}
            onItemPress={setSelectedAddress}
          />
        </View>
      </View>
    </Container>
  );
};

export default Address;
