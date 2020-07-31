import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scaleH } from 'utils/scale';
import { Colors } from 'config';
import getScoreColor from 'utils/getScoreColor';

const styles = StyleSheet.create({
  container: {
    width: scaleH(50),
    height: scaleH(50),
    borderRadius: scaleH(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: scaleH(12),
    fontWeight: 'bold',
    color: Colors.white,
  },
  score: {
    fontSize: scaleH(22),
    fontWeight: 'bold',
    color: Colors.white,
  },
});

const Score = ({ score, small }) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: scaleH(small ? 25 : 50),
          height: scaleH(small ? 25 : 50),
          borderRadius: scaleH(small ? 5 : 10),
        },
        { backgroundColor: getScoreColor(score) },
      ]}
    >
      <Text style={[styles.title, { fontSize: scaleH(small ? 6 : 12) }]}>
        Score
      </Text>
      <Text style={[styles.score, { fontSize: scaleH(small ? 12 : 22) }]}>
        {score}
      </Text>
    </View>
  );
};

export default Score;
