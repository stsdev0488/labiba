import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import { Colors } from 'config';
import { scaleH } from 'utils/scale';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

const SafeAreaContainer = ({ children, style }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }, style]}>
      {children}
    </View>
  );
};

SafeAreaContainer.defaultProps = {
  children: null,
  style: null,
};

SafeAreaContainer.propTypes = {
  children: PropTypes.node,
  style: PropTypes.objectOf(PropTypes.any),
};

export default SafeAreaContainer;
