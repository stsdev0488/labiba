import React from 'react';
import { FlatList, Text } from 'react-native';
import Container from 'components/Container';
import Header from 'components/Header/Header';
import FoodListItem from 'components/History/FoodListItem';
import { Images } from 'config';
import { scaleW } from 'utils/scale';

const data = [
  {
    id: 1,
    name: 'Quality Street Chocolates & Toffees',
    category: 'Nestle',
    score: 9.5,
    amount: '350',
    calory: '120',
    time: '8 day ago',
    image: Images.Food1,
  },
  {
    id: 2,
    name: 'Quality Street Chocolates & Toffees',
    category: 'Nestle',
    score: 7.3,
    amount: '350',
    calory: '120',
    time: '8 day ago',
    image: Images.Food2,
  },
  {
    id: 3,
    name: 'Quality Street Chocolates & Toffees',
    category: 'Nestle',
    score: 7.5,
    amount: '350',
    calory: '120',
    time: '8 day ago',
    image: Images.Food3,
  },
  {
    id: 4,
    name: 'Quality Street Chocolates & Toffees',
    category: 'Nestle',
    score: 8.3,
    amount: '350',
    calory: '120',
    time: '8 day ago',
    image: Images.Food4,
  },
];

const Favorite = ({ navigation }) => {
  return (
    <Container>
      <Header navigation={navigation} title="Favorite" />
      <FlatList
        contentContainerStyle={{ padding: scaleW(10) }}
        style={{ flex: 1 }}
        data={data}
        renderItem={({ item }) => <FoodListItem key={item.id} data={item} />}
      />
    </Container>
  );
};

export default Favorite;
