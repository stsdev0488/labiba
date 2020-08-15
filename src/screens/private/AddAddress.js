import React, { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Formik } from 'formik';
import Container from 'components/Container';
import Header from 'components/Header/Header';
import DismissKeyboard from 'components/DismissKeyboard';
import FormInput from 'components/Forms/FormInput';
import FormButton from 'components/Forms/FormButton';
import { Colors, Styles } from 'config';
import { scaleH, scaleW } from 'utils/scale';

const validationSchema = Yup.object().shape({
  country: Yup.string().label('Country').required('Country is required'),
  firstName: Yup.string()
    .label('First Name')
    .required('First Name is required'),
  lastName: Yup.string().label('Last Name').required('Last Name is required'),
  addressLine1: Yup.string()
    .label('Address Line 1')
    .required('Address Line 1 is required'),
  addressLine2: Yup.string().label('Address Line 2'),
  city: Yup.string().label('City').required('City is required'),
  state: Yup.string().label('State').required('State is required'),
  zip: Yup.string().label('Zip').required('Zipcode is required'),
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: scaleW(20),
    paddingTop: scaleH(10),
  },
  formButton: {
    height: scaleH(45),
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.33,
    shadowRadius: 8,
    shadowColor: '#29C17E',
  },
  saveButtonContainer: {
    marginTop: scaleH(30),
    paddingHorizontal: scaleW(30),
  },
});

const AddAddress = ({ navigation }) => {
  const handleRegister = () => {};

  return (
    <Container style={styles.container}>
      <Header title="Add Delivery Address" navigation={navigation} />
      <DismissKeyboard>
        <KeyboardAwareScrollView>
          <View style={styles.formContainer}>
            <Formik
              initialValues={{
                country: '',
                firstName: '',
                lastName: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                zip: '',
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
                    label="Country"
                    inputContainerStyle={{
                      ...Styles.formInput,
                      height: scaleH(45),
                      paddingHorizontal: scaleW(10),
                    }}
                    inputStyle={{
                      ...Styles.formInputStyle,
                      color: Colors.formText,
                    }}
                    name="country"
                    placeholder="Country"
                    placeholderTextColor={Colors.formText}
                    value={values.country}
                    onChangeText={handleChange('country')}
                    onBlur={handleBlur('country')}
                  />
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                      <FormInput
                        label="First Name"
                        inputContainerStyle={{
                          ...Styles.formInput,
                          height: scaleH(45),
                          paddingHorizontal: scaleW(10),
                        }}
                        inputStyle={{
                          ...Styles.formInputStyle,
                          color: Colors.formText,
                        }}
                        name="firstName"
                        placeholder="First Name"
                        placeholderTextColor={Colors.formText}
                        value={values.firstName}
                        onChangeText={handleChange('firstName')}
                        onBlur={handleBlur('firstName')}
                      />
                    </View>
                    <View style={{ flex: 1, marginLeft: scaleW(15) }}>
                      <FormInput
                        label="Last Name"
                        inputContainerStyle={{
                          ...Styles.formInput,
                          height: scaleH(45),
                          paddingHorizontal: scaleW(10),
                        }}
                        inputStyle={{
                          ...Styles.formInputStyle,
                          color: Colors.formText,
                        }}
                        name="lastName"
                        placeholder="Last Name"
                        placeholderTextColor={Colors.formText}
                        value={values.lastName}
                        onChangeText={handleChange('lastName')}
                        onBlur={handleBlur('lastName')}
                      />
                    </View>
                  </View>
                  <FormInput
                    label="Address Line 1"
                    inputContainerStyle={{
                      ...Styles.formInput,
                      height: scaleH(45),
                      paddingHorizontal: scaleW(10),
                    }}
                    inputStyle={{
                      ...Styles.formInputStyle,
                      color: Colors.formText,
                    }}
                    name="addressLine1"
                    placeholder="Address Line"
                    placeholderTextColor={Colors.formText}
                    value={values.addressLine1}
                    onChangeText={handleChange('addressLine1')}
                    onBlur={handleBlur('addressLine1')}
                  />
                  <FormInput
                    label="Address Line 2"
                    inputContainerStyle={{
                      ...Styles.formInput,
                      height: scaleH(45),
                      paddingHorizontal: scaleW(10),
                    }}
                    inputStyle={{
                      ...Styles.formInputStyle,
                      color: Colors.formText,
                    }}
                    name="addressLine2"
                    placeholder="Address Line"
                    placeholderTextColor={Colors.formText}
                    value={values.addressLine2}
                    onChangeText={handleChange('addressLine2')}
                    onBlur={handleBlur('addressLine2')}
                  />
                  <FormInput
                    label="City"
                    inputContainerStyle={{
                      ...Styles.formInput,
                      height: scaleH(45),
                      paddingHorizontal: scaleW(10),
                    }}
                    inputStyle={{
                      ...Styles.formInputStyle,
                      color: Colors.formText,
                    }}
                    name="city"
                    placeholder="City"
                    placeholderTextColor={Colors.formText}
                    value={values.city}
                    onChangeText={handleChange('city')}
                    onBlur={handleBlur('city')}
                  />
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                      <FormInput
                        label="State"
                        inputContainerStyle={{
                          ...Styles.formInput,
                          height: scaleH(45),
                          paddingHorizontal: scaleW(10),
                        }}
                        inputStyle={{
                          ...Styles.formInputStyle,
                          color: Colors.formText,
                        }}
                        name="state"
                        placeholder="State"
                        placeholderTextColor={Colors.formText}
                        value={values.state}
                        onChangeText={handleChange('state')}
                        onBlur={handleBlur('state')}
                      />
                    </View>
                    <View style={{ flex: 1, marginLeft: scaleW(15) }}>
                      <FormInput
                        label="Zip"
                        inputContainerStyle={{
                          ...Styles.formInput,
                          height: scaleH(45),
                          paddingHorizontal: scaleW(10),
                        }}
                        inputStyle={{
                          ...Styles.formInputStyle,
                          color: Colors.formText,
                        }}
                        name="zip"
                        placeholder="Zip"
                        placeholderTextColor={Colors.formText}
                        value={values.zip}
                        onChangeText={handleChange('zip')}
                        onBlur={handleBlur('zip')}
                      />
                    </View>
                  </View>
                  <View style={styles.saveButtonContainer}>
                    <FormButton
                      buttonStyle={{
                        ...Styles.formButton,
                        ...styles.formButton,
                        height: scaleH(45),
                        shadowColor: '#29C17E',
                      }}
                      titleStyle={{ fontSize: scaleH(15), fontWeight: '800' }}
                      // onPress={closeModal}
                      title="Save My Address"
                    />
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

export default AddAddress;
