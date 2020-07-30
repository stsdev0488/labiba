import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from 'config';
import { scaleH, scaleW } from 'utils/scale';
import { getValueColor } from 'utils/getScoreColor';
import CustomSlider from 'components/Product/CustomSlider';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingTop: 10,
  },
  thumbContainer: {
    width: scaleW(30),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  thumb: {
    width: scaleH(20),
    height: scaleH(20),
  },
  detailContainer: {
    marginLeft: scaleW(8),
    flex: 1,
  },
  categoryText: {
    fontSize: scaleH(12),
    color: Colors.darkLabel,
  },
  statusText: {
    fontSize: scaleH(12),
    color: Colors.lightLabel,
    marginTop: scaleH(2),
  },
  currentValueText: {
    fontSize: scaleH(12),
    color: Colors.lightLabel,
  },
  statusBubble: {
    width: scaleH(10),
    height: scaleH(10),
    borderRadius: scaleH(10),
    marginLeft: scaleW(6),
  },
  currentStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const DetailItem = ({ thumb, category, statusCategory, value, steps }) => {
  return (
    <View style={styles.container}>
      <View style={styles.thumbContainer}>
        <Image source={thumb} />
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.content}>
          <View>
            <Text style={styles.categoryText}>{category}</Text>
            <Text style={styles.statusText}>
              {getValueColor(value, steps, 0, statusCategory).status}
            </Text>
          </View>
          <View style={styles.currentStatusContainer}>
            <Text style={styles.currentValueText}>{value}</Text>
            <View
              style={[
                styles.statusBubble,
                {
                  backgroundColor: getValueColor(
                    value,
                    steps,
                    0,
                    statusCategory,
                  ).color,
                },
              ]}
            />
          </View>
        </View>
        <CustomSlider steps={steps} value={value} category={statusCategory} />
      </View>
    </View>
  );
};

export default DetailItem;
