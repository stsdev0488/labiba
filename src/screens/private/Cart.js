import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CartListItem from 'components/Cart/CartListItem';
import CartHeader from 'components/Cart/CartHeader';
import Container from 'components/Container';
import Header from 'components/Header/Header';
import { Images, Styles } from 'config';
import { scaleW } from 'utils/scale';

const data = [
  {
    id: 1,
    name: 'Power Beets',
    category: 'Circulation Superfood',
    score: 9.5,
    amount: '350',
    calory: '120',
    time: '8 day ago',
    image: Images.Food1,
  },
  {
    id: 2,
    name: 'Power Beets',
    category: 'Circulation Superfood',
    score: 7.3,
    amount: '350',
    calory: '120',
    time: '8 day ago',
    image: Images.Food2,
  },
  {
    id: 3,
    name: 'Power Beets',
    category: 'Circulation Superfood',
    score: 7.5,
    amount: '350',
    calory: '120',
    time: '8 day ago',
    image: Images.Food3,
  },
  {
    id: 4,
    name: 'Power Beets',
    category: 'Circulation Superfood',
    score: 8.3,
    amount: '350',
    calory: '120',
    time: '8 day ago',
    image: Images.Food4,
  },
];

const HeaderRight = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={Styles.headerRightText}>Checkout</Text>
  </TouchableOpacity>
);

const Cart = ({ navigation }) => {
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
      <CartHeader averageScore={8.5} itemCount={5} totalPrice="$1,667.00" />
      <FlatList
        contentContainerStyle={{ padding: scaleW(10) }}
        style={{ flex: 1 }}
        data={data}
        renderItem={({ item }) => <CartListItem key={item.id} data={item} />}
      />
    </Container>
  );
};

export default Cart;
