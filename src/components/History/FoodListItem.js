import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import Icon from 'react-native-vector-icons/AntDesign';
import Score from './Score';
import Amount from './Amount';
import Calory from './Calory';
import Time from 'components/History/Time';
import { Colors, Images } from 'config';
import { scaleH, scaleW } from 'utils/scale';

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
  imageContainer: {
    width: scaleH(85),
    height: scaleH(85),
    borderRadius: scaleH(10),
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
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
    marginTop: scaleH(Platform.OS === 'ios' ? 10 : 15),
  },
});

const FoodListItem = ({ data, onPress, noHistory, handleAddFavorite }) => {
  console.log('FoodListItem.data ', data);
  return (
    <TouchableOpacity
      style={
        noHistory
          ? [styles.container, { shadowColor: 'transparent', elevation: 0 }]
          : styles.container
      }
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        {data.image?.includes('.svg') ? (
          <SvgUri uri={data.image} width="100%" height="100%" />
        ) : (
          <Image source={{ uri: data.image }} style={styles.image} />
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.nameContent}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.category}>{data.category}</Text>
          </View>
          <Score score={data.score} />
        </View>
        <View style={styles.detailContent}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginLeft: scaleW(5) }}>
              <Calory amount={data.calory} />
            </View>
          </View>
          {!noHistory ? (
            <Time time={data.time} />
          ) : data.favorite?.length ? (
            <TouchableOpacity onPress={handleAddFavorite}>
              <Icon
                name="heart"
                color={Colors.primary}
                size={scaleH(22)}
                style={{ marginRight: scaleW(10) }}
              />
            </TouchableOpacity>
          ) : (
            // </TouchableOpacity>
            <TouchableOpacity onPress={handleAddFavorite}>
              <Icon
                name="hearto"
                color={Colors.formInputBorder}
                size={scaleH(22)}
                style={{ marginRight: scaleW(10) }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodListItem;
