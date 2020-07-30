import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Triangle from 'react-native-triangle';
import { scaleH } from 'utils/scale';
import { Colors } from 'config';
import { getValueColor } from 'utils/getScoreColor';

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 22,
  },
  stepLabel: {
    width: 50,
    fontSize: 8,
    color: Colors.label,
    textAlign: 'center',
    marginLeft: -25,
    marginTop: 2,
  },
  stepBar: {
    flex: 1,
  },
  trackContainer: {
    height: 3,
    flexDirection: 'row',
  },
  stepItemContainer: {
    position: 'absolute',
    top: 0,
  },
  stepItemBar: {
    height: 3,
    width: 1,
    backgroundColor: Colors.white,
  },
});

const CustomSlider = ({ value, steps, category }) => {
  const [width, setWidth] = useState(0);
  const onLayout = (event) => {
    setWidth(event.nativeEvent.layout.width);
  };

  return (
    <View onLayout={onLayout} style={styles.container}>
      <View style={styles.trackContainer}>
        <View style={[styles.stepBar, { backgroundColor: Colors.topScore }]} />
        <View style={[styles.stepBar, { backgroundColor: Colors.goodScore }]} />
        <View
          style={[styles.stepBar, { backgroundColor: Colors.warningScore }]}
        />
        <View style={[styles.stepBar, { backgroundColor: Colors.badScore }]} />
      </View>
      {steps.map((item, index) => (
        <View style={[styles.stepItemContainer, { left: (index * width) / 4 }]}>
          <View style={styles.stepItemBar} />
          <Text style={styles.stepLabel}>{steps[index]}</Text>
        </View>
      ))}
      <Triangle
        width={10}
        height={8}
        color={getValueColor(value, steps, category).color}
        direction="down"
        style={{
          position: 'absolute',
          bottom: 3,
          left: getValueColor(value, steps, width, category).width - 5,
        }}
      />
    </View>
  );
};

export default CustomSlider;
