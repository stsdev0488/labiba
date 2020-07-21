import React, { Fragment, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Formik } from 'formik';
import { showMessage } from 'react-native-flash-message';
import * as Yup from 'yup';
import DismissKeyboard from 'components/DismissKeyboard';
import FormInput from 'components/Forms/FormInput';
import FormButton from 'components/Forms/FormButton';
import ErrorMessage from 'components/Forms/ErrorMessage';
import SafeAreaContainer from 'components/SafeAreaContainer';
import { Colors, Styles } from 'config';
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

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const goToSignup = () => navigation.navigate('SignUp');

  const handleLogin = (values) => {
    dispatch(AuthActions.login(values));
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
    <SafeAreaContainer style={styles.container}>
      <DismissKeyboard>
        <KeyboardAwareScrollView>
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
                  label="Email"
                  labelStyle={Styles.formLabel}
                  inputContainerStyle={Styles.formInput}
                  inputStyle={Styles.formInputStyle}
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  autoCapitalize="none"
                  onBlur={handleBlur('email')}
                />
                {/*<ErrorMessage errorValue={touched.email && errors.email} />*/}
                <FormInput
                  name="password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  secureTextEntry
                  label="Password"
                  leftIcon={null}
                  labelStyle={Styles.formLabel}
                  inputContainerStyle={Styles.formInput}
                  inputStyle={Styles.formInputStyle}
                  onBlur={handleBlur('password')}
                />
                {/*<ErrorMessage errorValue={touched.password && errors.password} />*/}
                <View style={styles.buttonContainer}>
                  <FormButton
                    buttonStyle={{
                      ...Styles.formButton,
                      backgroundColor: Colors.white,
                    }}
                    titleStyle={{ color: Colors.primary, fontSize: scaleH(20) }}
                    disabledStyle={Styles.formDisabledButton}
                    disabledTitleStyle={Styles.formDisabledButtonText}
                    onPress={handleSubmit}
                    title="Login"
                    disabled={!isValid || loading}
                    loading={loading}
                  />
                  <FormButton
                    buttonStyle={Styles.formButton}
                    disabledStyle={Styles.formDisabledButton}
                    disabledTitleStyle={Styles.formDisabledButtonText}
                    titleStyle={{ fontSize: scaleH(20) }}
                    onPress={goToSignup}
                    title="Register"
                    disabled={!isValid || loading}
                  />
                </View>
              </Fragment>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </DismissKeyboard>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: scaleW(45),
  },
  buttonContainer: {
    marginTop: scaleH(30),
  },
});

export default Login;
