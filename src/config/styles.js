import * as Colors from './colors';
import { scaleW, scaleH } from 'utils/scale';

export const formButton = {
  height: scaleH(55),
  borderRadius: scaleH(55),
  color: Colors.white,
  backgroundColor: Colors.primary,
  fontSize: scaleH(18),
  borderWidth: 1,
  borderColor: Colors.primary,
  marginVertical: scaleH(10),
  padding: 0,
};

export const formLabel = {
  color: Colors.label,
  fontWeight: '500',
  fontSize: scaleH(16),
  paddingBottom: scaleH(10),
};

export const formInput = {
  height: scaleH(55),
  backgroundColor: Colors.white,
  borderRadius: scaleH(55),
  borderWidth: 1,
  fontSize: scaleH(8),
  borderColor: Colors.formInputBorder,
};

export const formInputStyle = {
  fontSize: scaleH(16),
  color: Colors.black,
};

export const formDisabledButton = {
  backgroundColor: '#CCCCCC',
  borderColor: '#CCCCCC',
};

export const formDisabledButtonText = {
  color: Colors.white,
};

export const formLeftIconContainer = {
  width: scaleW(40),
  alignItems: 'center',
  marginLeft: scaleW(5),
};

export const formButtonIconContainer = {
  marginRight: scaleW(8),
};

export const checkBoxContainer = {
  width: '100%',
  backgroundColor: Colors.white,
  marginLeft: 0,
  padding: 0,
  borderWidth: 0,
};

export const checkBoxText = {
  fontSize: scaleH(11),
  lineHeight: scaleH(13),
  fontWeight: '500',
  color: Colors.primary,
  marginLeft: scaleW(5),
};

export const linkContainer = {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: scaleH(20),
};

export const normalLabel = {
  fontSize: scaleH(15),
  color: Colors.linkNormalLabel,
};

export const link = {
  fontSize: scaleH(15),
  fontWeight: 'bold',
  color: Colors.placeholderText,
};

export const headerRightText = {
  fontSize: scaleH(16),
  color: Colors.primary,
  fontWeight: '500',
};
