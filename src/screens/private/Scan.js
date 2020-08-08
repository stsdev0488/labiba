import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import BottomPanel from 'react-native-bottomsheet-reanimated';
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
import AlternativeItem from 'components/Product/AlternativeItem';
import * as ProductService from 'services/productService';
import { getProduct } from 'services/apis/product';

const data = {
  id: 4,
  name: 'Quality Street Chocolates & Toffees',
  category: 'Nestle',
  score: 8.3,
  amount: '350',
  calory: '120',
  time: '8 day ago',
  image: Images.Food4,
};

const alternatives = [
  {
    id: 1,
    name: 'Halo Top Ice Cream Pint, MInt Chip',
    category: 'Nestle',
    score: 9.5,
    amount: '350',
    calory: '120',
    time: '8 day ago',
    image: Images.alternative1,
  },
  {
    id: 2,
    name: 'Halo Top Ice Cream Pint, MInt Chip',
    category: 'Nestle',
    score: 7.3,
    amount: '350',
    calory: '120',
    time: '8 day ago',
    image: Images.alternative2,
  },
  {
    id: 3,
    name: 'Halo Top Ice Cream Pint, MInt Chip',
    category: 'Nestle',
    score: 7.5,
    amount: '350',
    calory: '120',
    time: '8 day ago',
    image: Images.alternative3,
  },
];

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
  const [, setFocused] = useState();
  const [product, setProduct] = useState({});
  const scanner = useRef(null);
  const bottomSheet = useRef(null);

  const handleScan = async (session) => {
    const code = session.newlyRecognizedCodes[0].data;
    const products = await ProductService.findProduct(code);
    console.log('local products ', products.length);
    if (!products.length) {
      getProduct(code)
        .then((response) => {
          if (response.data.product.code) {
            console.log('online product ', response.data.product);
            ProductService.saveProduct(response.data.product);
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

  const isFocused = useIsFocused();

  useEffect(() => {
    if (scanner && isFocused) {
      scanner.current.startScanning();
    }
  }, [isFocused]);

  return (
    <Container>
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
        snapPoints={['0%', '30%', '100%']}
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
                  name: 'Halo Top Ice Cream Pint, MInt Chip',
                  category: 'Nestle',
                  score: product.score,
                  amount: '350',
                  calory: '120',
                  time: '8 day ago',
                  image: { uri: product.image_url },
                }}
                noHistory
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
            <View style={styles.alternativeContainer}>
              <View style={styles.alternativeHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={Images.hamburger}
                    style={styles.hamburgerIcon}
                  />
                  <Text style={styles.alternativeHeaderTitle}>
                    Product Alternatives
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.viewAllTitle}>View all</Text>
                  <Icon
                    name="keyboard-arrow-right"
                    color={Colors.primary}
                    size={scaleH(18)}
                  />
                </View>
              </View>
              <FlatList
                style={{ height: scaleH(500) }}
                contentContainerStyle={{
                  paddingTop: scaleH(20),
                  paddingHorizontal: scaleW(5),
                }}
                data={alternatives}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <AlternativeItem data={item} key={item.id} />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        }
      />
    </Container>
  );
};

export default Scan;
