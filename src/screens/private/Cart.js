import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import CartListItem from 'components/Cart/CartListItem';
import CartHeader from 'components/Cart/CartHeader';
import Container from 'components/Container';
import Header from 'components/Header/Header';
import { Images, Styles } from 'config';
import { scaleH, scaleW } from 'utils/scale';
import { productApi } from 'services/apis';
import { CartActions } from 'reduxs/actions';

const HeaderRight = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={Styles.headerRightText}>Checkout</Text>
  </TouchableOpacity>
);

const Cart = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRemoveFromCart = (code) => {
    const removedData = data.filter((item) => item.data.code !== code);
    setData(removedData);
  };

  const handleMinusCount = (code) => {
    const newData = data.map((item) => {
      if (item.data.code !== code) {
        return item;
      } else {
        let count = item.count - 1;
        if (count < 1) {
          count = 1;
        }
        return {
          ...item,
          count,
        };
      }
    });
    setData(newData);
  };

  const handlePlusCount = (code) => {
    const newData = data.map((item) => {
      if (item.data.code !== code) {
        return item;
      } else {
        return {
          ...item,
          count: item.count + 1,
        };
      }
    });
    setData(newData);
  };

  const getData = async () => {
    setLoading(true);
    const { items } = route.params;
    const { data } = await productApi.getProductPrices(
      items.map((item) => item.code),
    );
    setData(
      items.map((item) => ({
        data: item,
        price: data.products.find((price) => price.code === item.code).price,
        count: 1,
      })),
    );
    setLoading(false);
  };

  const subTotal = useMemo(() => {
    if (!data.length) {
      return 0;
    } else {
      let total = 0;
      data.forEach((item) => (total += item.count * item.price));
      return total;
    }
  }, [data]);

  const averageScore = useMemo(() => {
    if (!data.length) {
      return '0';
    } else {
      let totalScore = 0;
      let totalCount = 0;
      data.forEach((item) => {
        totalScore += item.count * item.data.score;
        totalCount += item.count;
      });

      return (totalScore / totalCount).toFixed(1).toString();
    }
  }, [data]);

  const totalCount = useMemo(() => {
    if (!data.length) {
      return 0;
    } else {
      let totalCount = 0;
      data.forEach((item) => (totalCount += item.count));
      return totalCount.toString();
    }
  }, [data]);

  const handleCheckout = async () => {
    if (totalCount) {
      setLoading(true);
      dispatch(CartActions.setSubtotal({ subTotal, totalCount }));
      dispatch(
        CartActions.setOrder({
          products: data.map((item) => ({
            code: item.data.code,
            quantity: item.count,
          })),
        }),
      );
      setLoading(false);
      navigation.navigate('Address');
    } else {
      showMessage({
        type: 'danger',
        message: 'No product!',
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Spinner visible={loading} />
      <Header
        navigation={navigation}
        title="My Cart"
        right={<HeaderRight onPress={handleCheckout} />}
      />
      <CartHeader
        averageScore={averageScore}
        itemCount={totalCount}
        totalPrice={subTotal}
      />
      <FlatList
        contentContainerStyle={{
          padding: scaleW(10),
          paddingBottom: scaleH(100),
        }}
        style={{ flex: 1 }}
        data={data}
        renderItem={({ item }) => (
          <CartListItem
            data={item}
            onRemoveFromCart={() => handleRemoveFromCart(item.data.code)}
            onMinusCount={() => handleMinusCount(item.data.code)}
            onPlusCount={() => handlePlusCount(item.data.code)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </Container>
  );
};

export default Cart;
