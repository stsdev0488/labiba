import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';
import {scaleH, scaleW} from 'utils/scale';
import { Colors } from 'config';

const styles = StyleSheet.create({
  container: {
    height: scaleH(145),
    backgroundColor: Colors.white,
    borderRadius: scaleH(10),
    shadowOffset: {
      width: 0,
      height: scaleH(10),
    },
    shadowRadius: scaleH(15),
    shadowColor: Colors.shadow,
    shadowOpacity: 0.15,
    elevation: scaleH(10),
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: scaleH(16),
    color: Colors.lightLabel,
    marginTop: scaleH(10),
  },
  icon: {
    position: 'absolute',
    top: scaleH(10),
    right: scaleW(10),
  },
});

const MedicalRecordItem = ({ data }) => {
  return (
    <View style={styles.container}>
      <Image source={data.image} />
      <Text style={styles.title}>{data.title}</Text>
      <Icon
        name="staro"
        color={Colors.lightLabel}
        size={scaleH(15)}
        style={styles.icon}
      />
    </View>
  );
};

MedicalRecordItem.defaultProps = {
  data: {},
};

MedicalRecordItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
};

export default MedicalRecordItem;
