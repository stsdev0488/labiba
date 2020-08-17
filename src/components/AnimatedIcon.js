import React from 'react';
import Animated, {
  block,
  cond,
  eq,
  set,
  useCode,
  Value,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors } from 'config';

const AnimatedIcon = ({ name, progress, size }) => {
  const isActive = new Value(1);
  useCode(
    () =>
      block([cond(eq(progress, 1), [set(isActive, 1)], [set(isActive, 0)])]),
    [progress],
  );

  return (
    <Icon
      name={name}
      size={size}
      color={progress.current === 1 ? 'white' : 'black'}
    />
  );
};

export default AnimatedIcon;
