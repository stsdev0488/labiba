import React, { useEffect, useRef } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import ViewPager from '@react-native-community/viewpager';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scaleH, scaleW } from 'utils/scale';
import { Colors, Images, Styles } from 'config';
import FormButton from 'components/Forms/FormButton';
import FormInput from 'components/Forms/FormInput';

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
  viewPager: {
    flex: 1,
    marginTop: scaleH(15),
  },
  pagerView: {
    flex: 1,
    paddingBottom: scaleH(30),
    justifyContent: 'space-between',
  },
  formButton: {
    height: scaleH(45),
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.33,
    shadowRadius: 8,
  },
});

const ListItem = ({ text, checked, onPress }) => {
  return (
    <TouchableOpacity style={styles.listItemContainer} onPress={onPress}>
      <Text style={styles.listItemText}>{text}</Text>
      {checked ? (
        <Icon name="check-circle" size={scaleH(23)} color={Colors.primary} />
      ) : (
        <Icon
          name="checkbox-blank-circle-outline"
          size={scaleH(23)}
          color="#989FAA"
        />
      )}
    </TouchableOpacity>
  );
};

const FavoriteCategoryModal = ({
  visible,
  closeModal,
  categories,
  selectedFavoriteCategory,
  onItemPress,
  newFavoriteItem,
  setNewFavoriteItem,
  onCreateNewItem,
  creatingNewItem,
  onAddToList,
}) => {
  const viewPager = useRef(null);

  useEffect(() => {
    if (!creatingNewItem && viewPager && viewPager.current) {
      viewPager.current.setPage(0);
    }
  }, [creatingNewItem, viewPager]);

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
        <ViewPager
          style={styles.viewPager}
          initialPage={0}
          ref={viewPager}
          scrollEnabled={false}
        >
          <View key={1} style={styles.pagerView}>
            <ScrollView>
              <View>
                {categories.map((item, index) => (
                  <ListItem
                    key={index}
                    checked={selectedFavoriteCategory
                      .map((item) => item.id)
                      .includes(item.id)}
                    text={item.name}
                    onPress={() => onItemPress(item)}
                  />
                ))}
              </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', marginTop: scaleH(10) }}>
              <View style={{ flex: 1 }}>
                <FormButton
                  buttonStyle={{
                    ...Styles.formButton,
                    ...styles.formButton,
                    shadowColor: '#29C17E',
                  }}
                  titleStyle={{ fontSize: scaleH(15), fontWeight: '800' }}
                  onPress={onAddToList}
                  title="Done"
                />
              </View>
              <View style={{ flex: 1, marginLeft: scaleW(25) }}>
                <FormButton
                  buttonStyle={{
                    ...Styles.formButton,
                    ...styles.formButton,
                    backgroundColor: '#00C0FB',
                    borderColor: '#00C0FB',
                    shadowColor: '#00C0FB',
                  }}
                  titleStyle={{ fontSize: scaleH(15), fontWeight: '800' }}
                  onPress={() => viewPager.current.setPage(1)}
                  title="Create New"
                />
              </View>
            </View>
          </View>
          <View key={2} style={styles.pagerView}>
            <Spinner visible={creatingNewItem} />
            <FormInput
              label="Category Name"
              inputContainerStyle={{
                ...Styles.formInput,
                borderRadius: scaleH(10),
                paddingHorizontal: scaleW(10),
              }}
              inputStyle={{ ...Styles.formInputStyle, color: Colors.label }}
              name="CategoryName"
              value={newFavoriteItem}
              onChangeText={(text) => setNewFavoriteItem(text)}
              // onBlur={handleBlur('fullname')}
            />
            <View style={{ flexDirection: 'row', marginTop: scaleH(10) }}>
              <View style={{ flex: 1 }}>
                <FormButton
                  buttonStyle={{
                    ...Styles.formButton,
                    ...styles.formButton,
                    shadowColor: '#29C17E',
                  }}
                  titleStyle={{ fontSize: scaleH(15), fontWeight: '800' }}
                  onPress={onCreateNewItem}
                  title="Save"
                />
              </View>
              <View style={{ flex: 1, marginLeft: scaleW(25) }}>
                <FormButton
                  buttonStyle={{
                    ...Styles.formButton,
                    ...styles.formButton,
                    backgroundColor: '#B8B7B7',
                    borderColor: '#B8B7B7',
                    shadowColor: '#00C0FB',
                  }}
                  titleStyle={{ fontSize: scaleH(15), fontWeight: '800' }}
                  onPress={closeModal}
                  title="Cancel"
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
