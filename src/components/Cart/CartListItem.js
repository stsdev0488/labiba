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
import TrashButton from 'components/TrashButton';
import AmountController from 'components/Cart/AmountController';
import { Colors } from 'config';
import { scaleH, scaleW } from 'utils/scale';
import Score from 'components/History/Score';

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
    paddingVertical: scaleH(13),
    paddingHorizontal: scaleW(13),
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
  price: {
    fontSize: scaleH(13),
    fontWeight: '800',
    lineHeight: scaleH(24),
    color: Colors.darkLabel,
  },
  scoreContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

const CartListItem = ({
  data,
  onPress,
  onRemoveFromCart,
  onMinusCount,
  onPlusCount,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <View style={styles.imageContainer}>
          {data.data.image_url?.includes('.svg') ? (
            <SvgUri uri={data.data.image_url} width="100%" height="100%" />
          ) : (
            <Image source={{ uri: data.data.image_url }} style={styles.image} />
          )}
        </View>
        <View style={styles.scoreContainer}>
          <Score score={data.data.score} small={true} />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.nameContent}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{data.data.product_name}</Text>
            <Text style={styles.category}>{data.data.brands}</Text>
          </View>
          <View style={{ marginLeft: scaleW(20) }}>
            <TrashButton onPress={onRemoveFromCart} />
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.price}>{`$${data.price}`}</Text>
          <AmountController
            value={data.count}
            onMinus={onMinusCount}
            onPlus={onPlusCount}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartListItem;
