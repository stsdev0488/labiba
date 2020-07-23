import React, { useState } from 'react';
import { FlatList, ScrollView, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Header from 'components/Header/SearchHeader';
import Container from 'components/Container';
import MedicalRecordCategory from 'components/MedicalRecord/MedicalRecordCategory';
import { scaleH, scaleW } from 'utils/scale';
import { Images } from 'config';
import MedicalRecordItem from 'components/MedicalRecord/MedicalRecordItem';

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

const MedicalRecord = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(-1);
  return (
    <Container>
      <Header navigation={navigation} title="MedicalRecord" />
      <ScrollView>
        <ScrollView>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <MedicalRecordCategory
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
              <MedicalRecordItem key={index} data={item} />
            )}
            contentContainerStyle={{ paddingVertical: scaleH(15) }}
          />
        </ScrollView>
      </ScrollView>
    </Container>
  );
};

export default MedicalRecord;
