import React from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { scaleW, scaleH } from 'utils/scale';
import { Colors, Styles } from 'config';

const FormInput = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  placeholderTextColor,
  ...rest
}) => (
  <View>
    <Input
      {...rest}
      leftIconContainerStyle={Styles.formLeftIconContainer}
      keyboardType={keyboardType}
      placeholderTextColor={placeholderTextColor || Colors.placeholderText}
      name={name}
      placeholder={placeholder}
      style={styles.input}
      containerStyle={styles.containerStyle}
      errorStyle={styles.errorStyle}
      labelStyle={styles.labelStyle}
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    paddingBottom: scaleH(5),
    position: 'relative',
  },
  iconStyle: {
    marginRight: scaleW(10),
  },
  errorStyle: {
    height: 0,
  },
  containerStyle: {
    paddingHorizontal: 0,
    marginBottom: scaleH(4),
  },
  labelStyle: {
    fontSize: scaleH(14),
    fontWeight: '300',
    lineHeight: scaleH(24),
    color: Colors.darkLabel,
    marginBottom: scaleH(5),
  },
});

FormInput.defaultProps = {
  returnKeyType: null,
  keyboardType: null,
  placeholder: null,
  iconColor: null,
  iconName: null,
};

FormInput.propTypes = {
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
  returnKeyType: PropTypes.any,
  keyboardType: PropTypes.any,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default FormInput;
