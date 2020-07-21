import React, { Fragment, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CheckBox } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Colors, Styles } from 'config';
import FormInput from 'components/Forms/FormInput';
import FormButton from 'components/Forms/FormButton';
import ErrorMessage from 'components/Forms/ErrorMessage';
import SafeAreaContainer from 'components/SafeAreaContainer';
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
    .min(6, 'Password must have more than 4 characters '),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
    .required('Confirm Password is required'),
});

const Signup = (props) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(false);

  const handleRegister = (values) => {
    dispatch(AuthActions.register(values));
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
      <Formik
        initialValues={{
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
              labelStyle={Styles.formLabel}
              inputContainerStyle={Styles.formInput}
              name="email"
              label="Email"
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange('email')}
              autoCapitalize="none"
              onBlur={handleBlur('email')}
            />
            {/*<ErrorMessage errorValue={touched.email && errors.email} />*/}
            <FormInput
              labelStyle={Styles.formLabel}
              inputContainerStyle={Styles.formInput}
              name="password"
              label="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry
              onBlur={handleBlur('password')}
            />
            {/*<ErrorMessage errorValue={touched.password && errors.password} />*/}
            <FormInput
              labelStyle={Styles.formLabel}
              inputContainerStyle={Styles.formInput}
              name="password"
              label="Confirm Password"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              secureTextEntry
              onBlur={handleBlur('confirmPassword')}
            />
            {/*<ErrorMessage errorValue={touched.confirmPassword && errors.confirmPassword} />*/}
            <CheckBox
              iconType="material"
              checkedIcon="check-box"
              uncheckedIcon="check-box-outline-blank"
              checkedColor={Colors.primary}
              uncheckedColor={Colors.primary}
              title="I have read and agree to the Terms and Privacy Policy"
              checked={checked}
              onPress={() => setChecked(!checked)}
              containerStyle={Styles.checkBoxContainer}
              textStyle={Styles.checkBoxText}
              size={scaleH(16)}
            />
            <View style={styles.buttonContainer}>
              <FormButton
                buttonStyle={{
                  ...Styles.formButton,
                  backgroundColor: Colors.white,
                }}
                titleStyle={{ color: Colors.primary }}
                disabledStyle={Styles.formDisabledButton}
                disabledTitleStyle={Styles.formDisabledButtonText}
                onPress={handleSubmit}
                title="Register"
                disabled={!isValid || loading}
                loading={loading}
              />
            </View>
          </Fragment>
        )}
      </Formik>
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
    marginTop: scaleH(25),
  },
});

export default Signup;
