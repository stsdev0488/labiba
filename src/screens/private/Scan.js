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
import Container from 'components/Container';
import FoodListItem from 'components/History/FoodListItem';
import DetailItem from 'components/Product/DetailItem';
import { Colors, Images, SCANDIT_KEY } from 'config';
import { scaleH, scaleW } from 'utils/scale';
import AlternativeItem from 'components/Product/AlternativeItem';

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

const Scan = ({ navigation }) => {
  const [, setFocused] = useState();
  const scanner = useRef(null);
  const bottomSheet = useRef(null);

  const handleScan = (session) => {
    // alert(
    //   session.newlyRecognizedCodes[0].data +
    //     ' ' +
    //     session.newlyRecognizedCodes[0].symbology,
    // );
    bottomSheet.current.snapTo(1);
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
        bottomSheerColor="#FF0000"
        containerStyle={{ backgroundColor: Colors.white }}
        initialPosition={0}
        snapPoints={['0%', '35%', '100%']}
        isBackDrop={true}
        isBackDropDismissByPress={true}
        isRoundBorderWithTipHeader={true}
        headerStyle={{ paddingBottom: 0 }}
        body={
          <View style={styles.popupContainer}>
            <View style={styles.popupItemDetailContainer}>
              <FoodListItem data={data} noHistory />
              <View
                style={{
                  borderColor: Colors.border,
                  borderBottomWidth: 1,
                  paddingVertical: 5,
                }}
              />
              <DetailItem
                category="Saturated Fat"
                value={7}
                steps={[0, 2, 4, 7, 10]}
                statusCategory="fatty"
                thumb={Images.FatIcon}
              />
              <DetailItem
                category="Sugar"
                value={5}
                steps={[0, 2, 4, 7, 10]}
                statusCategory="sweet"
                thumb={Images.SugarIcon}
              />
              <DetailItem
                category="Additives"
                value={2}
                steps={[0, 2, 4, 7, 10]}
                statusCategory="additive"
                thumb={Images.AdditiveIcon}
              />
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
                style={{ width: '100%' }}
                contentContainerStyle={{ paddingVertical: scaleH(20) }}
                data={alternatives}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <AlternativeItem data={item} key={item.id} />
                )}
              />
            </View>
          </View>
        }
      />
    </Container>
  );
};

export default Scan;
