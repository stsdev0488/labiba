import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
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
  image: {
    height: scaleH(80),
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

const ProductItem = ({ data, product }) => {
  const [favorite, setFavorite] = useState(false);
  const toggleFavorite = () => setFavorite(!favorite);

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.header}>
        <Score score={data.score} small />
        {product ? (
          <TrashButton />
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
        <Image source={data.image} style={styles.image} />
        <Text style={styles.name}>{data.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
