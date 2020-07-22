import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Input from 'react-native-debounce-input';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import { Colors, Images } from 'config';
import { scaleH, scaleW } from 'utils/scale';
import styles from './styles';

const SearchHeader = ({ navigation, title }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" color={Colors.label} size={scaleH(34)} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity>
          <Image source={Images.NotificationIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Input
          style={styles.searchInput}
          placeholder="Search medical records"
          placeholderTextColor="#81868C"
        />
        <Image source={Images.SearchIcon} style={styles.searchIcon} />
      </View>
    </View>
  );
};

SearchHeader.defaultProps = {
  navigation: null,
  title: null,
};

SearchHeader.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  title: PropTypes.string,
};

export default SearchHeader;
