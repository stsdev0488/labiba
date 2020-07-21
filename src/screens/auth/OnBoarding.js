import React from 'react';
import { StyleSheet, View } from 'react-native';
import Container from 'components/Container';
import FormButton from 'components/Forms/FormButton';
import { Colors, Styles } from 'config';
import { scaleH, scaleW } from 'utils/scale';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    paddingHorizontal: scaleW(45),
  },
});

const OnBoarding = ({ navigation }) => {
  return (
    <Container style={styles.container}>
      <FormButton
        buttonStyle={Styles.formButton}
        disabledStyle={Styles.formDisabledButton}
        titleStyle={{ fontSize: scaleH(20) }}
        onPress={() => navigation.navigate('SignUp')}
        title="Get Started"
      />
      <FormButton
        buttonStyle={Styles.formButton}
        disabledStyle={Styles.formDisabledButton}
        titleStyle={{ fontSize: scaleH(20) }}
        onPress={() => navigation.navigate('Login')}
        title="Login"
      />
    </Container>
  );
};

export default OnBoarding;
