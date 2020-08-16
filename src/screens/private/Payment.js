import React, { useState } from 'react';
import Container from 'components/Container';
import Header from 'components/Header/Header';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Styles } from 'config';
import PaymentHeader from 'components/Payment/PaymentHeader';
import PaymentCard from 'components/Payment/PaymentCard';
import { scaleH, scaleW } from 'utils/scale';

const HeaderRight = () => (
  <TouchableOpacity>
    <Text style={Styles.headerRightText}>Preview Order</Text>
  </TouchableOpacity>
);

const cards = [
  {
    cardNumber: '1234 2345 3456 4567',
    date: '06 / 2022',
    cardName: 'Cardholder Name',
    type: 'visa',
  },
  {
    cardNumber: '1234 2345 3456 4567',
    date: '08 / 2022',
    cardName: 'Cardholder Name',
    type: 'mastercard',
  },
  {
    cardNumber: '1234 2345 3456 4567',
    date: '06 / 2022',
    cardName: 'Cardholder Name',
    type: 'paypal',
  },
  {
    cardNumber: '1234 2345 3456 4567',
    date: '06 / 2022',
    cardName: 'Cardholder Name',
    type: 'paypal',
  },
];

const Payment = ({ navigation }) => {
  const [selectedCard, setSelectedCard] = useState(0);
  return (
    <Container>
      <Header navigation={navigation} title="Payment" right={<HeaderRight />} />
      <PaymentHeader onAddPayment={() => navigation.navigate('AddCard')} />
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: scaleW(15),
          paddingVertical: scaleH(15),
        }}
        data={cards}
        renderItem={({ item, index }) => (
          <PaymentCard
            data={item}
            selected={selectedCard === index}
            onPress={() => setSelectedCard(index)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </Container>
  );
};

export default Payment;
