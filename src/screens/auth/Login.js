import React, { Fragment, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Formik } from 'formik';
import { showMessage } from 'react-native-flash-message';
import * as Yup from 'yup';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import DismissKeyboard from 'components/DismissKeyboard';
import FormInput from 'components/Forms/FormInput';
import FormButton from 'components/Forms/FormButton';
import Header from 'components/Header/Header';
import Container from 'components/Container';
import { Colors, Images, Styles } from 'config';
import { AuthActions } from 'reduxs/actions';
import { scaleH, scaleW } from 'utils/scale';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password must have more than 6 characters '),
});

const FormLeftIcon = (image) => (
  <Image source={image} style={{ width: 50, height: 50 }} />
);

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const goToSignup = () => navigation.navigate('SignUp');

  const handleLogin = (values) => {
    dispatch(AuthActions.login(values));
  };

  const _responseInfoCallback = (error, result) => {
    if (error) {
      showMessage({
        type: 'danger',
        message: 'Error fetching data: ' + JSON.stringify(error),
      });
    } else {
      console.log('result ', result);
      const data = {
        fbId: result.id,
        fullname: `${result.first_name} ${result.last_name}`,
        email: result.email,
        picture: result.picture,
        birthday: result.birthday,
      };
      dispatch(AuthActions.loginWithFB(data));
    }
  };

  const infoRequest = new GraphRequest(
    '/me',
    {
      parameters: {
        fields: {
          string:
            'id, email, picture.type(large), first_name, last_name, age_range, birthday ',
        },
      },
    },
    _responseInfoCallback,
  );

  const startFbLogin = () =>
    new GraphRequestManager().addRequest(infoRequest).start();

  const handleFacebookLogin = () => {
    LoginManager.logInWithPermissions([
      'public_profile',
      'user_birthday',
      'email',
    ]).then(
      function (result) {
        if (result.isCancelled) {
          showMessage({
            type: 'warning',
            message: 'Login was cancelled',
          });
        } else {
          startFbLogin();
          console.log(
            'Login was successful with permissions: ' +
              result.grantedPermissions.toString(),
          );
        }
      },
      function (error) {
        showMessage({
          type: 'warning',
          message: 'Login failed with error: ' + error,
        });
      },
    );
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const info = await GoogleSignin.signIn();
      console.log('google info ', info);
      const data = {
        fullname: info.user.name,
        email: info.user.email,
        id: info.user.id,
        picture: info.user.photo,
        token: info.idToken,
      };
      dispatch(AuthActions.loginWithGoogle(data));
    } catch (e) {
      console.log(e);
      if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        showMessage({
          type: 'warning',
          message: 'Google signin canceled.',
        });
      } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        showMessage({
          type: 'danger',
          message: 'Please setup Google Play Service.',
        });
      }
    }
  };

  useEffect(() => {
    if (!loading && error) {
      showMessage({
        message: error,
        type: 'danger',
      });
    }
  }, [loading, error]);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '246340283742-hnqubt93ivg5bcovfacdiuphogl8d3do.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      hostedDomain: '',
      forceConsentPrompt: true,
      accountName: '',
    });
  }, []);

  return (
    <Container style={styles.container}>
      <Header navigation={navigation} title="Login" />
      <DismissKeyboard>
        <KeyboardAwareScrollView>
          <View style={styles.formContainer}>
            <View style={styles.logoContainer}>
              <Image source={Images.OnBoardingImage1} style={styles.logo} />
            </View>
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={(values) => {
                handleLogin(values);
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
                    name="email"
                    inputContainerStyle={[
                      Styles.formInput,
                      { marginBottom: scaleH(10) },
                    ]}
                    inputStyle={Styles.formInputStyle}
                    keyboardType="email-address"
                    leftIcon={<Image source={Images.emailIcon} />}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    autoCapitalize="none"
                    onBlur={handleBlur('email')}
                    placeholder="Email"
                  />
                  <FormInput
                    name="password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    secureTextEntry
                    leftIcon={<Image source={Images.passwordIcon} />}
                    inputContainerStyle={Styles.formInput}
                    inputStyle={Styles.formInputStyle}
                    onBlur={handleBlur('password')}
                    placeholder="Password"
                  />
                  <View style={styles.buttonContainer}>
                    <FormButton
                      buttonStyle={Styles.formButton}
                      titleStyle={{ fontSize: scaleH(20) }}
                      disabledStyle={Styles.formDisabledButton}
                      disabledTitleStyle={Styles.formDisabledButtonText}
                      icon={
                        <Image
                          source={Images.loginIcon}
                          style={Styles.formButtonIconContainer}
                        />
                      }
                      onPress={handleSubmit}
                      title="Login"
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
                          onPress={handleFacebookLogin}
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
                          onPress={handleGoogleLogin}
                          title="Google"
                          disabled={!isValid || loading}
                        />
                      </View>
                    </View>
                    <View style={Styles.linkContainer}>
                      <Text style={Styles.normalLabel}>
                        Don't have an account?{' '}
                      </Text>
                      <TouchableOpacity onPress={goToSignup}>
                        <Text style={Styles.link}>Register</Text>
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
  logoContainer: {
    alignItems: 'center',
    paddingTop: scaleH(75),
    paddingBottom: scaleH(45),
  },
  logo: {
    width: scaleH(252),
    height: scaleH(241),
    resizeMode: 'stretch',
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

export default Login;
