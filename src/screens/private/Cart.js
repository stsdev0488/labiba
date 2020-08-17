import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CartListItem from 'components/Cart/CartListItem';
import CartHeader from 'components/Cart/CartHeader';
import Container from 'components/Container';
import Header from 'components/Header/Header';
import { Images, Styles } from 'config';
import { scaleH, scaleW } from 'utils/scale';
import { productApi } from 'services/apis';

const HeaderRight = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={Styles.headerRightText}>Checkout</Text>
  </TouchableOpacity>
);

const Cart = ({ navigation, route }) => {
  const [data, setData] = useState([]);

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
  };

  const subTotal = useMemo(() => {
    if (!data.length) {
      return '0';
    } else {
      let total = 0;
      data.forEach((item) => (total += item.count * item.price));
      return `$${total.toFixed(2).toString()}`;
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
      return '0';
    } else {
      let totalCount = 0;
      data.forEach((item) => (totalCount += item.count));
      return totalCount.toString();
    }
  }, [data]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Header
        navigation={navigation}
        title="My Cart"
        right={
          <HeaderRight
            onPress={() =>
              navigation.navigate('SettingTab', { screen: 'Address' })
            }
          />
        }
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
