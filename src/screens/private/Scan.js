import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import BottomPanel from 'react-native-bottomsheet-reanimated';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  BarcodePicker,
  ScanditModule,
  Barcode,
  ScanSettings,
} from 'scandit-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from 'react-native-flash-message';
import Container from 'components/Container';
import FoodListItem from 'components/History/FoodListItem';
import DetailItem from 'components/Product/DetailItem';
import { Colors, Constants, Images, SCANDIT_KEY } from 'config';
import { scaleH, scaleW } from 'utils/scale';
import ProductItem from 'components/Product/ProductItem';
import * as ProductService from 'services/productService';
import { productApi } from 'services/apis';
import FavoriteCategoryModal from 'components/FavoriteCategoryModal';
import ProductSection from 'components/Product/ProductSection';
import CartSummaryModal from 'components/CartSummaryModal';
import { FavoriteActions } from 'reduxs/actions';

const alternatives = [];

const styles = StyleSheet.create({
  popupContainer: {
    paddingHorizontal: scaleW(15),
    height: Constants.deviceHeight,
  },
  popupItemDetailContainer: {
    shadowOffset: {
      width: 0,
      height: scaleH(5),
    },
    shadowRadius: scaleH(10),
    shadowColor: Colors.shadow,
    shadowOpacity: 0.2,
    backgroundColor: Colors.white,
    borderRadius: scaleH(10),
    paddingBottom: scaleH(20),
    paddingHorizontal: scaleW(5),
  },
  alternativeContainer: {
    paddingVertical: scaleH(20),
    width: '100%',
  },
  alternativeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hamburgerIcon: {
    width: scaleH(14),
    height: scaleH(10),
    resizeMode: 'stretch',
  },
  alternativeHeaderTitle: {
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

ScanditModule.setAppKey(SCANDIT_KEY);
const scanSettings = new ScanSettings();
scanSettings.setSymbologyEnabled(Barcode.Symbology.EAN13, true);
scanSettings.setSymbologyEnabled(Barcode.Symbology.EAN8, true);
scanSettings.setSymbologyEnabled(Barcode.Symbology.UPCA, true);
scanSettings.codeDuplicateFilter = 3000;

const Scan = ({ navigation }) => {
  const dispatch = useDispatch();
  const { favoriteList, create } = useSelector((state) => state.favoriteList);
  const [, setFocused] = useState();
  const [product, setProduct] = useState({});
  const [favoriteCategoryVisible, setFavoriteCategoryVisible] = useState(false);
  const [cartSummaryVisible, setCartSummaryVisible] = useState(false);
  const [selectedFavoriteCategory, setSelectedFavoriteCategory] = useState([]);
  const [newFavoriteItem, setNewFavoriteItem] = useState('');
  const scanner = useRef(null);
  const bottomSheet = useRef(null);

  const handleScan = async (session) => {
    const code = session.newlyRecognizedCodes[0].data;
    const products = await ProductService.findProduct(code);
    console.log('local products ', products.length);
    if (!products.length) {
      productApi
        .getProduct(code)
        .then((response) => {
          if (response.data.product.code) {
            console.log('online product ', response.data.product);
            ProductService.saveProduct(response.data.product);
            setProduct(response.data.product);
            bottomSheet.current.snapTo(1);
          } else {
            showMessage({
              type: 'warning',
              message: 'No product found!',
            });
          }
        })
        .catch((error) => {
          showMessage({
            type: 'danger',
            message: 'Get product info failed!',
          });
        });
    } else {
      console.log('local product ', products[0]);
      setProduct(products[0]);
      bottomSheet.current.snapTo(1);
    }
  };

  const handleCreateFavoriteItem = () => {
    if (!newFavoriteItem) {
      showMessage({
        type: 'danger',
        message: 'Please input category name',
      });
    } else {
      dispatch(FavoriteActions.createFavoriteItem({ name: newFavoriteItem }));
      setNewFavoriteItem('');
    }
  };

  const handleFavoriteItemPress = (item) => {
    setSelectedFavoriteCategory([...selectedFavoriteCategory, item]);
  };

  const handleAddToList = async () => {
    await ProductService.addToFavoriteList(
      product.code,
      selectedFavoriteCategory.map((item) => item.id),
    );
    setFavoriteCategoryVisible(false);
  };

  const handleAddFavorite = () => {
    bottomSheet.current.snapTo(0);
    setFavoriteCategoryVisible(true);
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (scanner && isFocused) {
      scanner.current.startScanning();
    }
  }, [isFocused]);

  useEffect(() => {
    dispatch(FavoriteActions.getFavoriteList());
  }, []);

  return (
    <Container>
      <Spinner visible={favoriteList.loading || false} />
      <BarcodePicker
        ref={scanner}
        onScan={(session) => handleScan(session)}
        scanSettings={scanSettings}
        style={{ flex: 1 }}
      />
      <BottomPanel
        ref={bottomSheet}
        bottomSheerColor={Colors.background}
        containerStyle={{ backgroundColor: Colors.background }}
        initialPosition={0}
        snapPoints={['0%', '33%', '100%']}
        isBackDrop={true}
        isBackDropDismissByPress={true}
        isRoundBorderWithTipHeader={true}
        headerStyle={{ paddingBottom: 0 }}
        body={
          <View style={styles.popupContainer}>
            <View style={styles.popupItemDetailContainer}>
              <FoodListItem
                data={{
                  id: 1,
                  name: product.product_name,
                  category: product.brands,
                  score: product.score,
                  amount: '350',
                  calory: '120',
                  time: '8 day ago',
                  image: product.image_url,
                  favorite: product.favorite,
                }}
                noHistory
                handleAddFavorite={handleAddFavorite}
              />
              <View
                style={{
                  borderColor: Colors.border,
                  borderBottomWidth: 1,
                  paddingVertical: 5,
                }}
              />
              <View style={{ paddingRight: scaleW(10) }}>
                <DetailItem
                  key="fatty"
                  category="Saturated Fat"
                  value={7}
                  steps={[0, 2, 4, 7, 10]}
                  statusCategory="fatty"
                  thumb={Images.FatIcon}
                />
                <DetailItem
                  key="sugar"
                  category="Sugar"
                  value={5}
                  steps={[0, 2, 4, 7, 10]}
                  statusCategory="sweet"
                  thumb={Images.SugarIcon}
                />
                <DetailItem
                  key="additive"
                  category="Additives"
                  value={2}
                  steps={[0, 2, 4, 7, 10]}
                  statusCategory="additive"
                  thumb={Images.AdditiveIcon}
                />
              </View>
            </View>
            <ProductSection
              products={alternatives}
              productCategory="Product Alternatives"
              productAction="View all"
            />
          </View>
        }
      />
      <FavoriteCategoryModal
        visible={favoriteCategoryVisible}
        closeModal={() => setFavoriteCategoryVisible(false)}
        categories={favoriteList.data || []}
        selectedFavoriteCategory={selectedFavoriteCategory}
        onItemPress={handleFavoriteItemPress}
        newFavoriteItem={newFavoriteItem}
        setNewFavoriteItem={setNewFavoriteItem}
        onCreateNewItem={handleCreateFavoriteItem}
        creatingNewItem={create.loading}
        onAddToList={handleAddToList}
      />
      <CartSummaryModal
        visible={cartSummaryVisible}
        closeModal={() => setCartSummaryVisible(false)}
      />
    </Container>
  );
};

export default Scan;
