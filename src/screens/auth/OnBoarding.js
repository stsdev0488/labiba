import React, { useRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Container from 'components/Container';
import FormButton from 'components/Forms/FormButton';
import { Colors, Images, Styles } from 'config';
import { scaleH, scaleW } from 'utils/scale';
import { node } from 'prop-types';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingTop: scaleH(80),
  },
  slide: {
    width: '100%',
    alignItems: 'center',
    marginTop: scaleH(80),
  },
  image: {
    width: scaleH(252),
    height: scaleH(241),
    resizeMode: 'stretch',
  },
  title: {
    fontSize: scaleH(44),
    lineHeight: scaleH(64),
    color: Colors.primary,
    marginTop: scaleH(50),
    textAlign: 'center',
    shadowOffset: {
      width: 0,
      height: scaleH(2),
    },
    shadowRadius: scaleH(4),
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  description: {
    fontSize: scaleH(15),
    color: Colors.darkLabel,
    marginTop: scaleH(15),
    textAlign: 'center',
    paddingHorizontal: scaleW(35),
  },
  skip: {
    color: Colors.skip,
    fontSize: scaleH(16),
    lineHeight: scaleH(21),
    marginRight: scaleW(20),
  },
  skipContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  nextButton: {
    paddingHorizontal: scaleW(50),
    marginBottom: scaleH(30),
    marginTop: scaleH(40),
    marginRight: scaleW(10),
  },
});

const slides = [
  {
    key: 1,
    title: 'Welcome!',
    text:
      'Labiba is a completely independent App that help you choose the right product',
    image: Images.OnBoardingImage1,
    backgroundColor: Colors.white,
  },
  {
    key: 2,
    title: 'Product analysis',
    text: 'Labiba scans products and assesses their health benefits',
    image: Images.OnBoardingImage2,
    backgroundColor: Colors.white,
  },
  {
    key: 3,
    title: 'Recommendations',
    text: 'Labiba recommends healthier alternatives products and other...',
    image: Images.OnBoardingImage3,
    backgroundColor: Colors.white,
  },
];

const OnBoarding = ({ navigation }) => {
  const slide = useRef(null);

  const handleSkip = () => {
    if (slides) {
      slide.current.goToSlide(2);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.text}</Text>
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <FormButton
          title="Next"
          disabled
          disabledStyle={{ backgroundColor: Colors.primary }}
          disabledTitleStyle={{ color: Colors.white }}
          buttonStyle={[Styles.formButton, styles.nextButton]}
          titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
        />
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <FormButton
          title="Link your medical records"
          disabled
          disabledStyle={{ backgroundColor: Colors.primary }}
          disabledTitleStyle={{ color: Colors.white }}
          buttonStyle={[Styles.formButton, styles.nextButton]}
          titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
        />
      </View>
    );
  };

  return (
    <Container style={styles.container}>
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>
      <AppIntroSlider
        ref={slide}
        activeDotStyle={{ backgroundColor: Colors.primary + '46' }}
        bottomButton={true}
        data={slides}
        dotStyle={{ backgroundColor: Colors.primary }}
        renderItem={renderItem}
        renderNextButton={renderNextButton}
        renderDoneButton={renderDoneButton}
        onDone={() => navigation.navigate('Main')}
      />
    </Container>
  );
};

export default OnBoarding;
