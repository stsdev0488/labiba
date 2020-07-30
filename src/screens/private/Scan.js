import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import BottomPanel from 'react-native-bottomsheet-reanimated';
import {
  BarcodePicker,
  ScanditModule,
  Barcode,
  ScanSettings,
} from 'scandit-react-native';
import Container from 'components/Container';
import FoodListItem from 'components/History/FoodListItem';
import DetailItem from 'components/Product/DetailItem';
import { Colors, Images, SCANDIT_KEY } from 'config';
import { scaleW } from 'utils/scale';

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
          <View>
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
        }
        bodyStyle={{ paddingHorizontal: scaleW(10) }}
      />
    </Container>
  );
};

export default Scan;
