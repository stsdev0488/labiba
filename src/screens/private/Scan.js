import React, { useEffect, useRef } from 'react';
import { Text } from 'react-native';
import {
  BarcodePicker,
  ScanditModule,
  Barcode,
  ScanSettings,
} from 'scandit-react-native';
import Container from 'components/Container';
import { SCANDIT_KEY } from 'config';

const Scan = () => {
  ScanditModule.setAppKey(SCANDIT_KEY);
  const scanSettings = new ScanSettings();
  scanSettings.setSymbologyEnabled(Barcode.Symbology.EAN13, true);
  scanSettings.setSymbologyEnabled(Barcode.Symbology.EAN8, true);
  scanSettings.setSymbologyEnabled(Barcode.Symbology.UPCA, true);
  const scanner = useRef(null);

  const handleScan = (session) => {
    alert(
      session.newlyRecognizedCodes[0].data +
        ' ' +
        session.newlyRecognizedCodes[0].symbology,
    );
  };

  useEffect(() => {
    console.log('useEffect');
    if (scanner) {
      scanner.current.startScanning();
    }
  }, []);

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
