import React from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import Container from 'components/Container';
import { Colors } from 'config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});

const AuthLoading = () => {
  return (
    <Container style={styles.container}>
      <ActivityIndicator />
    </Container>
  );
};

export default AuthLoading;
