import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { scaleH, scaleW } from 'utils/scale';
import { Colors } from 'config';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: scaleW(5),
    height: scaleH(40),
    width: scaleW(100),
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: scaleH(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: scaleH(19),
    color: Colors.lightLabel,
  },
});

const Category = ({ selected, text, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: selected ? Colors.primary : Colors.white },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          { color: selected ? Colors.white : Colors.lightLabel },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

Category.defaultProps = {
  selected: false,
  text: null,
};

Category.propTypes = {
  selected: PropTypes.bool,
  text: PropTypes.string,
};

export default Category;
