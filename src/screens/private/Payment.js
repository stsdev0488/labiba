import React from 'react';
import Container from 'components/Container';
import Header from 'components/Header/Header';
import { Text, TouchableOpacity } from 'react-native';
import { Styles } from 'config';
import PaymentHeader from "components/Payment/PaymentHeader";

const HeaderRight = () => (
  <TouchableOpacity>
    <Text style={Styles.headerRightText}>Preview Order</Text>
  </TouchableOpacity>
);

const Payment = ({ navigation }) => {
  return (
    <Container>
      <Header navigation={navigation} title="Payment" right={<HeaderRight />} />
      <PaymentHeader />
    </Container>
  );
};

export default Payment;
