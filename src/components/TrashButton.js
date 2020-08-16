import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { scaleH } from 'utils/scale';

const TrashButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="trash-outline" size={scaleH(23)} color="#FF6969" />
    </TouchableOpacity>
  );
};

export default TrashButton;
