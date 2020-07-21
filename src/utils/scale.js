import { isIphoneX } from 'react-native-iphone-x-helper';
import { Platform, StatusBar, Dimensions } from 'react-native';

const standardScreenWidth = 375; // Change with design width
const standardScreenHeight = 812; // Change with design height

const { width, height } = Dimensions.get('window');
const standardLength = width > height ? width : height;
const offset =
  width > height ? 0 : Platform.OS === 'ios' ? 78 : StatusBar.currentHeight;

const deviceHeight =
  isIphoneX() || Platform.OS === 'android'
    ? standardLength - offset
    : standardLength;
const deviceWidth = width;

export const scaleH = (height) => {
  const heightPercent = (height * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
};

export const scaleW = (width) => {
  const widthPercent = (width * deviceWidth) / standardScreenWidth;
  return Math.round(widthPercent);
};
