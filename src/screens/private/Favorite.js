import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import CartListItem from 'components/Cart/CartListItem';
import Container from 'components/Container';
import Header from 'components/Header/Header';
import ProductSection from 'components/Product/ProductSection';
import { Colors, Images } from 'config';
import { scaleH, scaleW } from 'utils/scale';

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

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: Colors.white,
    paddingBottom: scaleH(5),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: '#2F3432',
    shadowOpacity: 0.1,
    elevation: 4,
    marginTop: scaleH(-3),
  },
});

const Favorite = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const renderFavorite = () => {
    return (
      <View>
        <ProductSection
          product
          products={data}
          productCategory="Daily List"
          productAction="Buy Now"
          productActionPress={() => navigation.navigate('Cart')}
        />
        <ProductSection
          product
          products={data}
          productCategory="Party List"
          productAction="Buy Now"
          productActionPress={() => navigation.navigate('Cart')}
        />
        <ProductSection
          product
          products={[]}
          productCategory="Kids Snacks List"
          productAction="Buy Now"
          productActionPress={() => navigation.navigate('Cart')}
        />
      </View>
    );
  };

  const renderCart = () => {
    return (
      <FlatList
        contentContainerStyle={{ padding: scaleW(10) }}
        style={{ flex: 1 }}
        data={data}
        renderItem={({ item }) => <CartListItem key={item.id} data={item} />}
      />
    );
  };

  return (
    <Container>
      <Header navigation={navigation} title="Favorite" />
      <View style={styles.tabContainer}>
        <ButtonGroup
          buttons={['Favorite', 'Orders']}
          onPress={setSelectedTab}
          selectedIndex={selectedTab}
          containerStyle={{
            height: scaleH(40),
            borderRadius: scaleH(5),
            borderWidth: 2,
            borderColor: Colors.primary,
          }}
          selectedButtonStyle={{
            backgroundColor: Colors.primary,
          }}
          selectedTextStyle={{
            color: Colors.white,
            fontSize: scaleH(16),
            fontWeight: '500',
          }}
          buttonStyle={{
            backgroundColor: Colors.white,
          }}
          textStyle={{
            color: Colors.primary,
            fontSize: scaleH(16),
            fontWeight: '500',
          }}
        />
      </View>
      {!selectedTab ? renderFavorite() : renderCart()}
    </Container>
  );
};

export default Favorite;
