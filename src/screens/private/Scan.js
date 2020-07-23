import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  BarcodePicker,
  ScanditModule,
  Barcode,
  ScanSettings,
} from 'scandit-react-native';
import Container from 'components/Container';
import { SCANDIT_KEY } from 'config';

ScanditModule.setAppKey(SCANDIT_KEY);
const scanSettings = new ScanSettings();
scanSettings.setSymbologyEnabled(Barcode.Symbology.EAN13, true);
scanSettings.setSymbologyEnabled(Barcode.Symbology.EAN8, true);
scanSettings.setSymbologyEnabled(Barcode.Symbology.UPCA, true);

const Scan = ({ navigation }) => {
  const [, setFocused] = useState();
  const scanner = useRef(null);

  const handleScan = (session) => {
    alert(
      session.newlyRecognizedCodes[0].data +
        ' ' +
        session.newlyRecognizedCodes[0].symbology,
    );
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
    </Container>
  );
};

export default Scan;
