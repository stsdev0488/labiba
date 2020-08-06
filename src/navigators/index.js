import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import AuthLoading from 'screens/AuthLoading';
import Login from 'screens/auth/Login';
import SignUp from 'screens/auth/Signup';
import OnBoarding from 'screens/auth/OnBoarding';
import Home from 'screens/private/Home';
import MainTabNavigator from 'navigators/BottomTab';
import { AuthActions } from 'reduxs/actions';

const AuthStack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator headerMode="none" initialRouteName="OnBoarding">
      <AuthStack.Screen name="OnBoarding" component={OnBoarding} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};

const MainStack = createStackNavigator();
const MainNavigator = () => {
  return (
    <MainStack.Navigator headerMode="none">
      <MainStack.Screen name="Home" component={Home} />
    </MainStack.Navigator>
  );
};

const AppStack = createStackNavigator();
const AppNavigator = () => {
  const dispatch = useDispatch();
  const { initialLoading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let user;

      try {
        user = await AsyncStorage.getItem('user');
      } catch (e) {
        // Restoring token failed
      }
      dispatch(
        AuthActions.restoreToken(user !== null ? JSON.parse(user) : null),
      );
    };
    bootstrapAsync();
  }, [dispatch, user]);

  return (
    <AppStack.Navigator>
      {initialLoading ? (
        <AppStack.Screen
          name="AuthLoading"
          component={AuthLoading}
          options={{ headerShown: false }}
        />
      ) : !user ? (
        <AppStack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <AppStack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
      )}
    </AppStack.Navigator>
  );
};

export default AppNavigator;
