import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, Images } from 'config';
import { scaleH, scaleW } from 'utils/scale';
import Score from './Score';
import Amount from './Amount';
import Calory from './Calory';
import Time from 'components/History/Time';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: scaleH(10),
    shadowOffset: {
      width: 0,
      height: scaleH(5),
    },
    shadowRadius: scaleH(10),
    shadowColor: Colors.shadow,
    shadowOpacity: 0.2,
    elevation: 8,
    padding: scaleH(10),
    marginVertical: scaleH(5),
  },
  image: {
    width: scaleH(85),
    height: scaleH(85),
    resizeMode: 'cover',
  },
  name: {
    fontSize: scaleH(15),
    lineHeight: scaleH(19),
    fontWeight: '500',
    color: Colors.darkLabel,
  },
  category: {
    fontSize: scaleH(12),
    lineHeight: scaleH(24),
    color: Colors.darkLabel,
  },
  content: {
    flex: 1,
    marginLeft: scaleW(10),
  },
  nameContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scaleH(Platform.OS === 'ios' ? 3 : 6),
  },
});

const FoodListItem = ({ data, onPress, noHistory }) => {
  return (
    <TouchableOpacity
      style={
        noHistory
          ? [styles.container, { shadowColor: 'transparent', elevation: 0 }]
          : styles.container
      }
      onPress={onPress}
    >
      <Image source={data.image} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.nameContent}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.category}>{data.category}</Text>
          </View>
          <Score score={data.score} />
        </View>
        {noHistory ? (
          <View style={styles.detailContent}>
            <Amount amount={data.amount} />
            <Calory amount={data.calory} />
          </View>
        ) : (
          <View style={styles.detailContent}>
            <View style={{ flexDirection: 'row' }}>
              <Amount amount={data.amount} />
              <View style={{ marginLeft: scaleW(5) }}>
                <Calory amount={data.calory} />
              </View>
            </View>
            <Time time={data.time} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FoodListItem;
