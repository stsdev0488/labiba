import React from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { scaleW, scaleH } from 'utils/scale';

const FormInput = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  ...rest
}) => (
  <View>
    <Input
      {...rest}
      leftIcon={
        <Ionicons name={iconName} size={scaleH(28)} color={iconColor} />
      }
      leftIconContainerStyle={styles.iconStyle}
      keyboardType={keyboardType}
      placeholderTextColor="grey"
      name={name}
      placeholder={placeholder}
      style={styles.input}
      containerStyle={styles.containerStyle}
      errorStyle={styles.errorStyle}
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
