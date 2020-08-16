import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductItem from 'components/Product/ProductItem';
import { Colors, Images } from 'config';
import { scaleH, scaleW } from 'utils/scale';
import ListEmptyComponent from 'components/Product/ListEmptyComponent';

const styles = StyleSheet.create({
  container: {
    marginTop: scaleH(15),
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleW(10),
  },
  hamburgerIcon: {
    width: scaleH(14),
    height: scaleH(10),
    resizeMode: 'stretch',
  },
  headerTitle: {
    fontSize: scaleH(14),
    fontWeight: '500',
    color: Colors.label,
    marginLeft: scaleW(5),
  },
  viewAllTitle: {
    fontSize: scaleH(12),
    fontWeight: '500',
    color: Colors.primary,
  },
});

const ProductSection = ({
  products,
  productCategory,
  productAction,
  productActionPress,
  product,
  onRemoveFavorite,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={Images.hamburger} style={styles.hamburgerIcon} />
          <Text style={styles.headerTitle}>{productCategory.name}</Text>
        </View>
        <TouchableOpacity
          onPress={productActionPress}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Text style={styles.viewAllTitle}>{productAction}</Text>
          <Icon
            name="keyboard-arrow-right"
            color={Colors.primary}
            size={scaleH(18)}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={{
          paddingVertical: scaleH(20),
          paddingHorizontal: scaleW(5),
          flexGrow: 1,
        }}
        ListEmptyComponent={
          <ListEmptyComponent text="Ready to add products!" />
        }
        data={products}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ProductItem
            data={item}
            product={product}
            onRemoveFavorite={() =>
              onRemoveFavorite(item.code, productCategory.id)
            }
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ProductSection;
