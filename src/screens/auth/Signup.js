import React, { Fragment, useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import { Colors, Images, Styles } from 'config';
import Container from 'components/Container';
import FormInput from 'components/Forms/FormInput';
import FormButton from 'components/Forms/FormButton';
import ErrorMessage from 'components/Forms/ErrorMessage';
import Header from 'components/Header/Header';
import { AuthActions } from 'reduxs/actions';
import { scaleH, scaleW } from 'utils/scale';
import DismissKeyboard from 'components/DismissKeyboard';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const validationSchema = Yup.object().shape({
  name: Yup.string().label('Name').required('Name is required'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required('Password is required')
    .min(6, 'Password must have more than 4 characters '),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
    .required('Confirm Password is required'),
});

const Signup = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(false);

  const handleRegister = (values) => {
    dispatch(AuthActions.register(values));
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    if (!loading && error) {
      showMessage({
        message: error,
        type: 'danger',
      });
    }
  }, [loading, error]);

  return (
    <Container style={styles.container}>
      <Header navigation={navigation} title="Register" />
      <DismissKeyboard>
        <KeyboardAwareScrollView>
          <View style={styles.formContainer}>
            <View style={styles.avatarContainer}>
              <View>
                <Image source={Images.avatar} style={styles.avatar} />
                <TouchableOpacity style={styles.uploadIcon}>
                  <Icon
                    name="arrow-up-circle"
                    color="#FD8E4E"
                    size={scaleH(30)}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
              }}
              onSubmit={(values) => {
                handleRegister(values);
              }}
              validationSchema={validationSchema}
            >
              {({
                handleChange,
                values,
                handleSubmit,
                errors,
                isValid,
                touched,
                handleBlur,
              }) => (
                <Fragment>
                  <FormInput
                    inputContainerStyle={Styles.formInput}
                    inputStyle={Styles.formInputStyle}
                    leftIcon={<Image source={Images.userIcon} />}
                    name="name"
                    placeholder="Name"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                  />
                  <FormInput
                    inputContainerStyle={Styles.formInput}
                    inputStyle={Styles.formInputStyle}
                    name="email"
                    keyboardType="email-address"
                    leftIcon={<Image source={Images.emailIcon} />}
                    placeholder="Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    autoCapitalize="none"
                    onBlur={handleBlur('email')}
                  />
                  {/*<ErrorMessage errorValue={touched.email && errors.email} />*/}
                  <FormInput
                    inputContainerStyle={Styles.formInput}
                    inputStyle={Styles.formInputStyle}
                    leftIcon={<Image source={Images.passwordIcon} />}
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    secureTextEntry
                    onBlur={handleBlur('password')}
                  />
                  {/*<ErrorMessage errorValue={touched.password && errors.password} />*/}
                  <FormInput
                    inputContainerStyle={Styles.formInput}
                    inputStyle={Styles.formInputStyle}
                    leftIcon={<Image source={Images.passwordIcon} />}
                    name="password"
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    secureTextEntry
                    onBlur={handleBlur('confirmPassword')}
                  />
                  {/*<ErrorMessage errorValue={touched.confirmPassword && errors.confirmPassword} />*/}
                  <View style={styles.buttonContainer}>
                    <FormButton
                      buttonStyle={Styles.formButton}
                      titleStyle={{ fontSize: scaleH(20) }}
                      disabledStyle={Styles.formDisabledButton}
                      disabledTitleStyle={Styles.formDisabledButtonText}
                      icon={
                        <Image
                          source={Images.registerIcon}
                          style={Styles.formButtonIconContainer}
                        />
                      }
                      // onPress={handleSubmit}
                      onPress={() => navigation.navigate('Main')}
                      title="Register"
                      disabled={!isValid || loading}
                      loading={loading}
                    />
                    <View style={styles.socialButtonContainer}>
                      <View style={styles.facebookButtonContainer}>
                        <FormButton
                          buttonStyle={Styles.formButton}
                          disabledStyle={Styles.formDisabledButton}
                          disabledTitleStyle={Styles.formDisabledButtonText}
                          icon={
                            <SimpleLineIcon
                              name="social-facebook"
                              color={Colors.white}
                              size={scaleH(25)}
                            />
                          }
                          titleStyle={{ fontSize: scaleH(20) }}
                          // onPress={goToSignup}
                          title="Facebook"
                          disabled={!isValid || loading}
                        />
                      </View>
                      <View style={styles.googleButtonContainer}>
                        <FormButton
                          buttonStyle={Styles.formButton}
                          disabledStyle={Styles.formDisabledButton}
                          disabledTitleStyle={Styles.formDisabledButtonText}
                          icon={
                            <SimpleLineIcon
                              name="social-google"
                              color={Colors.white}
                              size={scaleH(25)}
                              style={{ marginRight: scaleW(7) }}
                            />
                          }
                          titleStyle={{ fontSize: scaleH(20) }}
                          // onPress={goToSignup}
                          title="Google"
                          disabled={!isValid || loading}
                        />
                      </View>
                    </View>
                    <View style={Styles.linkContainer}>
                      <Text style={Styles.normalLabel}>
                        Already have an account?{' '}
                      </Text>
                      <TouchableOpacity onPress={goToLogin}>
                        <Text style={Styles.link}>Login</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Fragment>
              )}
            </Formik>
          </View>
        </KeyboardAwareScrollView>
      </DismissKeyboard>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: scaleW(30),
  },
  buttonContainer: {
    marginTop: scaleH(0),
  },
  avatar: {
    width: scaleH(115),
    height: scaleH(115),
    resizeMode: 'stretch',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: scaleH(70),
    marginBottom: scaleH(40),
  },
  uploadIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderRadius: 50,
  },
  socialButtonContainer: {
    flexDirection: 'row',
  },
  facebookButtonContainer: {
    flex: 1,
  },
  googleButtonContainer: {
    flex: 1,
    marginLeft: scaleW(10),
  },
});

export default Signup;
