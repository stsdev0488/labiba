import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { scaleH, scaleW } from 'utils/scale';
import { Colors } from 'config';
import Score from 'components/History/Score';
import TrashButton from 'components/TrashButton';

const styles = StyleSheet.create({
  container: {
    width: scaleW(120),
    height: scaleH(170),
    backgroundColor: Colors.white,
    borderRadius: scaleH(10),
    shadowOffset: {
      width: 0,
      height: scaleH(5),
    },
    shadowRadius: scaleH(8),
    shadowColor: Colors.shadow,
    shadowOpacity: 0.2,
    elevation: scaleH(5),
    paddingVertical: scaleH(10),
    paddingHorizontal: scaleW(12),
    marginHorizontal: scaleW(5),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    alignItems: 'center',
    marginTop: scaleH(10),
  },
  imageContainer: {
    height: scaleH(80),
    width: scaleH(80),
    borderRadius: scaleH(10),
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  name: {
    fontSize: scaleH(10),
    fontWeight: '500',
    lineHeight: scaleH(14),
    color: Colors.linkNormalLabel,
    marginTop: scaleH(8),
    textAlign: 'center',
  },
});

const ProductItem = ({ data, product, onRemoveFavorite }) => {
  const [favorite, setFavorite] = useState(false);
  const toggleFavorite = () => setFavorite(!favorite);

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.header}>
        <Score score={data.score} small />
        {product ? (
          <TrashButton onPress={onRemoveFavorite} />
        ) : (
          <TouchableWithoutFeedback onPress={toggleFavorite}>
            {favorite ? (
              <Icon name="heart" color={Colors.primary} size={scaleH(15)} />
            ) : (
              <Icon
                name="hearto"
                color={Colors.formInputBorder}
                size={scaleH(15)}
              />
            )}
          </TouchableWithoutFeedback>
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {data.image_url?.includes('.svg') ? (
            <SvgUri uri={data.image_url} width="100%" height="100%" />
          ) : (
            <Image source={{ uri: data.image_url }} style={styles.image} />
          )}
        </View>
        <Text style={styles.name} numberOfLines={2}>
          {data.product_name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
