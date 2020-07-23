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

const Score = ({ score }) => {
  return (
    <View style={[styles.container, { backgroundColor: getScoreColor(score) }]}>
      <Text style={styles.title}>Score</Text>
      <Text style={styles.score}>{score}</Text>
    </View>
  );
};

export default Score;
