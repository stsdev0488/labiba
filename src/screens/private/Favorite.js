import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonGroup } from 'react-native-elements';
import CartListItem from 'components/Cart/CartListItem';
import Container from 'components/Container';
import Header from 'components/Header/Header';
import ProductSection from 'components/Product/ProductSection';
import { Colors, Images } from 'config';
import * as ProductService from 'services/productService';
import { scaleH, scaleW } from 'utils/scale';
import { useIsFocused } from '@react-navigation/native';

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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Favorite = ({ navigation }) => {
  const { favoriteList } = useSelector((state) => state.favoriteList);
  const [selectedTab, setSelectedTab] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    setLoading(true);
    const products = await ProductService.getAllProducts();
    setAllProducts(products);
    setLoading(false);
  };

  const handleRemoveFavorite = async (code, favoriteId) => {
    await ProductService.removeFromFavoriteList(code, favoriteId);
    getAllProducts();
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getAllProducts();
    }
  }, [isFocused]);

  const renderFavorite = () => {
    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <ScrollView contentContainerStyle={{ paddingBottom: scaleH(100) }}>
          {favoriteList.data?.map((item, index) => (
            <ProductSection
              key={index}
              product
              navigation={navigation}
              products={Array.from(allProducts).filter((product) =>
                Array.from(product.favorite).includes(item.id),
              )}
              productCategory={item}
              productAction="Buy Now"
              onRemoveFavorite={handleRemoveFavorite}
            />
          ))}
        </ScrollView>
      );
    }
  };

  const renderCart = () => {
    return (
      <FlatList
        contentContainerStyle={{ padding: scaleW(10) }}
        style={{ flex: 1 }}
        data={[]}
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
