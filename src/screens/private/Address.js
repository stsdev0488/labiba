import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import Container from 'components/Container';
import Header from 'components/Header/Header';
import AddressHeader from 'components/Address/AddressHeader';
import { Styles } from 'config';
import { scaleH, scaleW } from 'utils/scale';
import AddressList from 'components/Address/AddressList';
import * as DeliveryAddressService from 'services/localServices/deliveryAddressService';
import { useIsFocused } from '@react-navigation/native';
import { CartActions } from 'reduxs/actions';

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
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState({});
  const [allDeliveryAddresses, setAllDeliveryAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllAddresses = async () => {
    setLoading(true);
    const deliveryAddresses = await DeliveryAddressService.getAllDeliveryAddresses();
    setAllDeliveryAddresses(Array.from(deliveryAddresses));
    setLoading(false);
  };

  const handleNext = async () => {
    if (Object.keys(selectedAddress).length) {
      dispatch(CartActions.setOrder({ shipping: { ...selectedAddress } }));
      navigation.navigate('Payment');
    } else {
      showMessage({
        type: 'danger',
        message: 'No delivery address',
      });
    }
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getAllAddresses();
    }
  }, [isFocused]);

  return (
    <Container>
      <Header
        title="Address"
        navigation={navigation}
        right={<HeaderRight onPress={handleNext} />}
      />
      <AddressHeader
        data={selectedAddress}
        onAddAddress={() => navigation.navigate('AddAddress')}
      />
      <View style={styles.container}>
        <Text style={styles.addressListHeader}>All Delivery Addresses</Text>
        {allDeliveryAddresses.length ? (
          <View style={{ marginTop: scaleH(15) }}>
            <AddressList
              options={allDeliveryAddresses}
              selected={selectedAddress}
              onItemPress={setSelectedAddress}
            />
          </View>
        ) : null}
      </View>
    </Container>
  );
};

export default Address;
