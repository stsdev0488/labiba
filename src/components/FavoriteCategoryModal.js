import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import ViewPager from '@react-native-community/viewpager';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scaleH, scaleW } from 'utils/scale';
import { Colors, Styles } from 'config';
import FormButton from 'components/Forms/FormButton';

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    height: scaleH(350),
    borderTopLeftRadius: scaleH(15),
    borderTopRightRadius: scaleH(15),
    paddingHorizontal: scaleW(20),
    paddingTop: scaleH(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: scaleH(16),
    fontWeight: '500',
    color: '#FD8E4E',
  },
  listItemTitleStyle: {
    fontSize: scaleH(16),
    fontWeight: '500',
    color: Colors.label,
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleH(12),
  },
  listItemText: {
    fontSize: scaleH(15),
    color: Colors.label,
  },
});

const ListItem = ({ text, checked }) => {
  return (
    <TouchableOpacity style={styles.listItemContainer}>
      <Text style={styles.listItemText}>{text}</Text>
      {checked ? (
        <Icon name="check-circle" size={scaleH(23)} color={Colors.primary} />
      ) : (
        <Icon
          name="checkbox-blank-circle-outline"
          size={scaleH(23)}
          color="989FAA"
        />
      )}
    </TouchableOpacity>
  );
};

const FavoriteCategoryModal = ({ visible, closeModal }) => {
  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>ADD TO LIST</Text>
          <TouchableOpacity onPress={closeModal}>
            <Icon name="close" color={Colors.primary} size={scaleH(25)} />
          </TouchableOpacity>
        </View>
        <ViewPager style={{ marginTop: scaleH(15) }} initialPage={0}>
          <View key={1}>
            <View>
              <ListItem checked={true} text="Weekend List" />
              <ListItem checked={true} text="Healthy List" />
              <ListItem checked={true} text="Favorite List" />
              <ListItem checked={true} text="Other List" />
            </View>
            <View style={{ flexDirection: 'row', marginTop: scaleH(10) }}>
              <View style={{ flex: 1 }}>
                <FormButton
                  buttonStyle={{ ...Styles.formButton, height: scaleH(45) }}
                  titleStyle={{ fontSize: scaleH(15), fontWeight: '800' }}
                  onPress={closeModal}
                  title="Done"
                />
              </View>
              <View style={{ flex: 1, marginLeft: scaleW(25) }}>
                <FormButton
                  buttonStyle={{
                    ...Styles.formButton,
                    backgroundColor: '#00C0FB',
                    height: scaleH(45),
                  }}
                  titleStyle={{ fontSize: scaleH(15), fontWeight: '800' }}
                  onPress={closeModal}
                  title="Create New"
                />
              </View>
            </View>
          </View>
        </ViewPager>
      </View>
    </Modal>
  );
};

export default FavoriteCategoryModal;
