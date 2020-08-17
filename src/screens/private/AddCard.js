import React, { Fragment } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import * as Yup from 'yup';
import { Formik } from 'formik';
import uuid from 'uuid-random';
import Container from 'components/Container';
import Header from 'components/Header/Header';
import DismissKeyboard from 'components/DismissKeyboard';
import FormInput from 'components/Forms/FormInput';
import FormButton from 'components/Forms/FormButton';
import { Colors, Images, Styles } from 'config';
import * as CardService from 'services/localServices/cardService';
import { scaleH, scaleW } from 'utils/scale';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: scaleW(20),
    paddingTop: scaleH(20),
    paddingBottom: scaleH(100),
  },
  cardImageContainer: {
    alignItems: 'center',
    marginBottom: scaleH(25),
  },
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  formButton: {
    height: scaleH(45),
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.33,
    shadowRadius: 8,
    shadowColor: '#29C17E',
    borderWidth: 0,
  },
  saveButtonContainer: {
    marginTop: scaleH(30),
    paddingHorizontal: scaleW(30),
  },
  imageCardNumberContainer: {
    position: 'absolute',
    top: scaleH(50),
    left: scaleW(10),
    flexDirection: 'row',
  },
  numberField: {
    fontSize: scaleH(15),
    fontWeight: '600',
    color: Colors.white,
  },
  imageCardholderContainer: {
    position: 'absolute',
    left: scaleW(10),
    right: scaleW(10),
    bottom: scaleH(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardholderName: {
    fontSize: scaleH(13),
    fontWeight: '600',
    color: Colors.white,
  },
});

const validationSchema = Yup.object().shape({
  cardholderName: Yup.string()
    .label('Cardholder Name')
    .required('Cardholder Name is required'),
  numberField1: Yup.string()
    .label('numberField1')
    .required('Card Number is required'),
  numberField2: Yup.string()
    .label('numberField2')
    .required('Card Number is required'),
  numberField3: Yup.string()
    .label('numberField3')
    .required('Card Number is required'),
  numberField4: Yup.string()
    .label('numberField4')
    .required('Card Number is required'),
  expirationDate: Yup.string()
    .label('Expiration Date')
    .required('Expiration Date is required'),
  cvv_cvc: Yup.string().label('CVV/CVC').required('CVV/CVC is required'),
});

const AddCard = ({ navigation }) => {
  const handleAddCard = async (values) => {
    await CardService.saveCard({
      id: uuid(),
      number: `${values.numberField1} ${values.numberField2} ${values.numberField3} ${values.numberField4}`,
      expiry: values.expirationDate,
      cvc: values.cvv_cvc,
      type: 'mastercard',
      cardholderName: values.cardholderName,
    });
    navigation.goBack();
  };

  return (
    <Container style={styles.container}>
      <Header title="Add Card" navigation={navigation} />
      <DismissKeyboard>
        <KeyboardAwareScrollView>
          <View style={styles.formContainer}>
            <Formik
              initialValues={{
                cardholderName: '',
                numberField1: '',
                numberField2: '',
                numberField3: '',
                numberField4: '',
                expirationDate: '',
                cvv_cvc: '',
              }}
              onSubmit={(values) => {
                handleAddCard(values);
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
                  <View style={styles.cardImageContainer}>
                    <View>
                      <Image source={Images.card} />
                      <View style={styles.imageCardNumberContainer}>
                        <Text style={styles.numberField}>
                          {values.numberField1}
                        </Text>
                        <Text style={{ ...styles.numberField, marginLeft: 10 }}>
                          {values.numberField2}
                        </Text>
                        <Text style={{ ...styles.numberField, marginLeft: 10 }}>
                          {values.numberField3}
                        </Text>
                        <Text style={{ ...styles.numberField, marginLeft: 10 }}>
                          {values.numberField4}
                        </Text>
                      </View>
                      <View style={styles.imageCardholderContainer}>
                        <Text style={styles.cardholderName}>
                          {values.cardholderName}
                        </Text>
                        <Image source={Images.masterCard} />
                      </View>
                    </View>
                  </View>
                  <FormInput
                    label="Cardholder Name"
                    inputContainerStyle={{
                      ...Styles.formInput,
                      height: scaleH(45),
                      paddingHorizontal: scaleW(10),
                    }}
                    inputStyle={{
                      ...Styles.formInputStyle,
                      color: Colors.formText,
                    }}
                    name="cardholderName"
                    value={values.cardholderName}
                    onChangeText={handleChange('cardholderName')}
                    onBlur={handleBlur('cardholderName')}
                  />
                  <View style={styles.cardNumberContainer}>
                    <View style={{ flex: 1 }}>
                      <FormInput
                        label="Card Number"
                        inputContainerStyle={{
                          ...Styles.formInput,
                          height: scaleH(45),
                          paddingHorizontal: scaleW(10),
                        }}
                        inputStyle={{
                          ...Styles.formInputStyle,
                          color: Colors.formText,
                          textAlign: 'center',
                        }}
                        name="numberField1"
                        keyboardType="number-pad"
                        value={values.numberField1}
                        onChangeText={handleChange('numberField1')}
                        onBlur={handleBlur('numberField1')}
                      />
                    </View>
                    <View style={{ flex: 1, marginLeft: 4 }}>
                      <FormInput
                        inputContainerStyle={{
                          ...Styles.formInput,
                          height: scaleH(45),
                          paddingHorizontal: scaleW(10),
                        }}
                        inputStyle={{
                          ...Styles.formInputStyle,
                          color: Colors.formText,
                          textAlign: 'center',
                        }}
                        name="numberField2"
                        keyboardType="number-pad"
                        value={values.numberField2}
                        onChangeText={handleChange('numberField2')}
                        onBlur={handleBlur('numberField2')}
                      />
                    </View>
                    <View style={{ flex: 1, marginLeft: 4 }}>
                      <FormInput
                        inputContainerStyle={{
                          ...Styles.formInput,
                          height: scaleH(45),
                          paddingHorizontal: scaleW(10),
                        }}
                        inputStyle={{
                          ...Styles.formInputStyle,
                          color: Colors.formText,
                          textAlign: 'center',
                        }}
                        name="numberField3"
                        keyboardType="number-pad"
                        value={values.numberField3}
                        onChangeText={handleChange('numberField3')}
                        onBlur={handleBlur('numberField3')}
                      />
                    </View>
                    <View style={{ flex: 1, marginLeft: 4 }}>
                      <FormInput
                        inputContainerStyle={{
                          ...Styles.formInput,
                          height: scaleH(45),
                          paddingHorizontal: scaleW(10),
                        }}
                        inputStyle={{
                          ...Styles.formInputStyle,
                          color: Colors.formText,
                          textAlign: 'center',
                        }}
                        name="numberField4"
                        keyboardType="number-pad"
                        value={values.numberField4}
                        onChangeText={handleChange('numberField4')}
                        onBlur={handleBlur('numberField4')}
                      />
                    </View>
                  </View>
                  <FormInput
                    label="Expiration Date"
                    inputContainerStyle={{
                      ...Styles.formInput,
                      height: scaleH(45),
                      paddingHorizontal: scaleW(10),
                    }}
                    inputStyle={{
                      ...Styles.formInputStyle,
                      color: Colors.formText,
                    }}
                    name="expirationDate"
                    value={values.expirationDate}
                    onChangeText={handleChange('expirationDate')}
                    onBlur={handleBlur('expirationDate')}
                  />
                  <View style={styles.cardNumberContainer}>
                    <View style={{ flex: 1 }}>
                      <FormInput
                        label="CVV/CVC"
                        inputContainerStyle={{
                          ...Styles.formInput,
                          height: scaleH(45),
                          paddingHorizontal: scaleW(10),
                        }}
                        inputStyle={{
                          ...Styles.formInputStyle,
                          color: Colors.formText,
                        }}
                        name="cvv_cvc"
                        keyboardType="number-pad"
                        value={values.cvv_cvc}
                        onChangeText={handleChange('cvv_cvc')}
                        onBlur={handleBlur('cvv_cvc')}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        marginLeft: scaleW(15),
                        marginBottom: scaleH(15),
                      }}
                    >
                      <Text style={Styles.formLabel}>3 or 4 digit code</Text>
                    </View>
                  </View>
                  <View style={styles.saveButtonContainer}>
                    <FormButton
                      buttonStyle={{
                        ...Styles.formButton,
                        ...styles.formButton,
                      }}
                      titleStyle={{ fontSize: scaleH(15), fontWeight: '800' }}
                      onPress={handleSubmit}
                      title="Save My Card"
                      disabled={!isValid}
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

export default AddCard;
