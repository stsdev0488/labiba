import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import AppNavigator from './src/navigators';
import store from './src/reduxs/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
        <FlashMessage position="bottom" />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
