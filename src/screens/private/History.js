import React, { useState } from 'react';
import { FlatList, ScrollView, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Header from 'components/Header/SearchHeader';
import Container from 'components/Container';
import Category from 'components/History/Category';
import { scaleH, scaleW } from 'utils/scale';
import { Images } from 'config';
import HistoryItem from 'components/History/HistoryItem';

const categories = ['Health', 'Sport', 'Medical', 'Music', 'Food'];
const items = [
  {
    title: 'Fitbit Versa 2',
    image: Images.FitbitVersa,
  },
  {
    title: 'Pedometer Fitness',
    image: Images.Pedometer,
  },
  {
    title: 'S Health',
    image: Images.SHealth,
  },
  {
    title: 'Healthy Food',
    image: Images.HealthyFood,
  },
];

const History = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(-1);
  return (
    <Container>
      <Header navigation={navigation} title="History" />
      <ScrollView>
        <ScrollView>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Category
                key={index}
                text={item}
                selected={selectedCategory === index}
                onPress={() => setSelectedCategory(index)}
              />
            )}
            contentContainerStyle={{
              paddingVertical: scaleH(10),
              paddingHorizontal: scaleW(8),
            }}
          />
          <FlatGrid
            itemDimension={scaleW(160)}
            spacing={scaleW(15)}
            data={items}
            renderItem={({ item, index }) => (
              <HistoryItem key={index} data={item} />
            )}
            contentContainerStyle={{ paddingVertical: scaleH(15) }}
          />
        </ScrollView>
      </ScrollView>
    </Container>
  );
};

export default History;
