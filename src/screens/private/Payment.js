import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import Container from 'components/Container';
import Header from 'components/Header/Header';
import PaymentHeader from 'components/Payment/PaymentHeader';
import PaymentCard from 'components/Payment/PaymentCard';
import CartSummaryModal from 'components/CartSummaryModal';
import { Styles } from 'config';
import { CartActions } from 'reduxs/actions';
import * as CardService from 'services/localServices/cardService';
import { couponApi, discountApi, feeApi, orderApi } from 'services/apis';
import { scaleH, scaleW } from 'utils/scale';

const HeaderRight = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={Styles.headerRightText}>Preview Order</Text>
  </TouchableOpacity>
);

const Payment = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    subTotal,
    totalCount,
    promotionalDiscount,
    shippingFee,
    order,
  } = useSelector((state) => state.cart);

  const [selectedCard, setSelectedCard] = useState({});
  const [allCards, setAllCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartSummaryVisible, setCartSummaryVisible] = useState(false);
  const [coupon, setCoupon] = useState(0);

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

  const handleAddCoupon = async () => {
    const coupon = await couponApi.getCoupon('L2020');
    if (coupon.data.isValid) {
      setCoupon(coupon.data.discount);
    }
  };

  const handlePay = async () => {
    setLoading(true);
    const orderResponse = await orderApi.getOrder({ ...order });
    const fromDate = new Date(orderResponse.data.from);
    const toDate = new Date(orderResponse.data.to);
    setLoading(false);
    Alert.alert(
      'Your Order',
      `Your order is from ${fromDate.toLocaleDateString()} to ${toDate.toLocaleDateString()}`,
      [{ text: 'OK', onPress: () => setCartSummaryVisible(false) }],
    );
  };

  const handlePreviewOrder = async () => {
    if (Object.keys(selectedCard).length) {
      setLoading(true);
      const discount = await discountApi.getDiscount();
      dispatch(CartActions.setPromotionalDiscount(discount.data));
      const shippingFee = await feeApi.getShippingFee(order.shipping.zip);
      dispatch(CartActions.setShippingFee(shippingFee.data.fee));
      setLoading(false);
      setCartSummaryVisible(true);
    } else {
      showMessage({
        type: 'danger',
        message: 'No credit card!',
      });
    }
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getAllCards();
    }
  }, [isFocused]);

  return (
    <Container>
      <Spinner visible={loading} />
      <Header
        navigation={navigation}
        title="Payment"
        right={<HeaderRight onPress={handlePreviewOrder} />}
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
      <CartSummaryModal
        visible={cartSummaryVisible}
        subTotal={subTotal}
        totalCount={totalCount}
        promotionalDiscount={promotionalDiscount}
        shippingFee={shippingFee}
        coupon={coupon}
        closeModal={() => setCartSummaryVisible(false)}
        addCoupon={handleAddCoupon}
        handlePay={handlePay}
      />
    </Container>
  );
};

export default Payment;
