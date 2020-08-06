import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import SafeAreaContainer from 'components/SafeAreaContainer';
import { logout } from 'reduxs/actions/auth';

const Setting = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaContainer>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaContainer>
  );
};

export default Setting;
