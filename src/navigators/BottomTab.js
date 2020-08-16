import React, { Fragment } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar from 'curved-bottom-navigation-bar';
import Favorite from 'screens/private/Favorite';
import MedicalRecord from 'screens/private/MedicalRecord';
import Address from 'screens/private/Address';
import AddAddress from 'screens/private/AddAddress';
import Cart from 'screens/private/Cart';
import History from 'screens/private/History';
import Scan from 'screens/private/Scan';
import Profile from 'screens/private/Profile';
import Setting from 'screens/private/Setting';
import Payment from 'screens/private/Payment';
import AddCard from 'screens/private/AddCard';
import AnimatedIcon from 'components/AnimatedIcon';
import { Colors } from 'config';

const tabs = {
  HistoryTab: {
    icon: ({ progress }) => (
      <AnimatedIcon name="clockcircleo" size={28} progress={progress} />
    ),
  },
  FavoriteTab: {
    icon: ({ progress }) => (
      <AnimatedIcon name="staro" size={28} progress={progress} />
    ),
  },
  ScanTab: {
    icon: ({ progress }) => (
      <AnimatedIcon name="scan1" size={28} progress={progress} />
    ),
  },
  ProfileTab: {
    icon: ({ progress }) => (
      <AnimatedIcon name="user" size={28} progress={progress} />
    ),
  },
  SettingTab: {
    icon: ({ progress }) => (
      <AnimatedIcon name="setting" size={28} progress={progress} />
    ),
  },
};

const HistoryStack = createStackNavigator();
const HistoryNavigator = () => (
  <HistoryStack.Navigator>
    <HistoryStack.Screen
      name="History"
      component={History}
      options={{ headerShown: false }}
    />
  </HistoryStack.Navigator>
);

const FavoriteStack = createStackNavigator();
const FavoriteNavigator = () => (
  <FavoriteStack.Navigator>
    <FavoriteStack.Screen
      name="Favorite"
      component={Favorite}
      options={{ headerShown: false }}
    />
    <FavoriteStack.Screen
      name="Cart"
      component={Cart}
      options={{ headerShown: false }}
    />
  </FavoriteStack.Navigator>
);

const ScanStack = createStackNavigator();
const ScanNavigator = () => (
  <ScanStack.Navigator>
    <ScanStack.Screen
      name="Scan"
      component={Scan}
      options={{ headerShown: false }}
    />
  </ScanStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileNavigator = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      component={Profile}
      options={{ headerShown: false }}
    />
  </ProfileStack.Navigator>
);

const SettingStack = createStackNavigator();
const SettingNavigator = () => (
  <SettingStack.Navigator>
    <SettingStack.Screen
      name="Setting"
      component={Setting}
      options={{ headerShown: false }}
    />
    <SettingStack.Screen
      name="Address"
      component={Address}
      options={{ headerShown: false }}
    />
    <SettingStack.Screen
      name="AddAddress"
      component={AddAddress}
      options={{ headerShown: false }}
    />
    <SettingStack.Screen
      name="Payment"
      component={Payment}
      options={{ headerShown: false }}
    />
    <SettingStack.Screen
      name="AddCard"
      component={AddCard}
      options={{ headerShown: false }}
    />
  </SettingStack.Navigator>
);

const MainTab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      initialRouteName="ScanTab"
      tabBarOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: Colors.label,
      }}
      tabBar={(props) => (
        <AnimatedTabBar
          barColor={Colors.white}
          color={Colors.white}
          dotColor={Colors.primary}
          tabs={tabs}
          {...props}
        />
      )}
    >
      <MainTab.Screen name="HistoryTab" component={HistoryNavigator} />
      <MainTab.Screen name="FavoriteTab" component={FavoriteNavigator} />
      <MainTab.Screen name="ScanTab" component={ScanNavigator} />
      <MainTab.Screen name="ProfileTab" component={ProfileNavigator} />
      <MainTab.Screen name="SettingTab" component={SettingNavigator} />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
