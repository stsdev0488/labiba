import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import { Colors, Images } from 'config';
import { scaleH, scaleW } from 'utils/scale';
import styles from './styles';

const Header = ({ navigation, title, right }) => {
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
        <View style={styles.left}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" color={Colors.label} size={scaleH(32)} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.right}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            {right ? (
              right
            ) : (
              <TouchableOpacity>
                <Image source={Images.NotificationIcon} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

Header.defaultProps = {
  title: null,
};

Header.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  title: PropTypes.string,
};

export default Header;
