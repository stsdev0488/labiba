import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Container = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

Container.defaultProps = {
  children: null,
  style: null,
};

Container.propTypes = {
  children: PropTypes.node,
  style: PropTypes.objectOf(PropTypes.any),
};

export default Container;
