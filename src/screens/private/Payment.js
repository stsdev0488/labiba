import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import Container from 'components/Container';
import Header from 'components/Header/Header';
import PaymentHeader from 'components/Payment/PaymentHeader';
import PaymentCard from 'components/Payment/PaymentCard';
import { Styles } from 'config';
import { CartActions } from 'reduxs/actions';
import * as CardService from 'services/localServices/cardService';
import { discountApi, feeApi } from 'services/apis';
import { scaleH, scaleW } from 'utils/scale';

const HeaderRight = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={Styles.headerRightText}>Preview Order</Text>
  </TouchableOpacity>
);

const Payment = ({ navigation }) => {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.cart);
  const [selectedCard, setSelectedCard] = useState({});
  const [allCards, setAllCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllCards = async () => {
    setLoading(true);
    const cards = await CardService.getAllCards();
    setAllCards(Array.from(cards));
    setLoading(false);
  };

  const handleCardRemove = async (id) => {
    await CardService.deleteCard(id);
    getAllCards();
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getAllCards();
    }
  }, [isFocused]);

  return (
    <Container>
      <Header
        navigation={navigation}
        title="Payment"
        right={
          <HeaderRight
            onPress={async () => {
              const discount = await discountApi.getDiscount();
              dispatch(CartActions.setPromotionalDiscount(discount.data));
              const shippingFee = await feeApi.getShippingFee(
                order.shipping.zip,
              );
              dispatch(CartActions.setShippingFee(shippingFee.data.fee));
              navigation.navigate('Scan', { previewOrder: true });
            }}
          />
        }
      />
      <PaymentHeader
        data={selectedCard}
        onAddPayment={() => navigation.navigate('AddCard')}
      />
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: scaleW(15),
          paddingVertical: scaleH(15),
        }}
        data={allCards}
        renderItem={({ item, index }) => (
          <PaymentCard
            data={item}
            selected={selectedCard.id === item.id}
            onPress={() => setSelectedCard(item)}
            onDelete={() => handleCardRemove(item.id)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </Container>
  );
};

export default Payment;
