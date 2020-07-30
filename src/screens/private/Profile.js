import React from 'react';
import { View } from 'react-native';
import Container from 'components/Container';
import Header from 'components/Header/Header';
import CustomSlider from 'components/Product/CustomSlider';
import DetailItem from 'components/Product/DetailItem';
import { Images } from 'config';

const Profile = ({ navigation }) => {
  return (
    <Container>
      <Header navigation={navigation} title="Profile" />
    </Container>
  );
};

export default Profile;
