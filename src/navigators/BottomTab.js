import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomFabBar } from 'rn-wave-bottom-bar';
import Icon from 'react-native-vector-icons/AntDesign';
import Favorite from 'screens/private/Favorite';
import History from 'screens/private/History';
import Scan from 'screens/private/Scan';
import Profile from 'screens/private/Profile';
import Setting from 'screens/private/Setting';

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
  </SettingStack.Navigator>
);

const MainTab = createBottomTabNavigator();
const tabBarIcon = (name) => ({ focused, color, size }) => (
  <Icon name={name} size={28} color={color} />
);

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      initialRouteName="ScanTab"
      tabBarOptions={{
        activeTintColor: '#29C172',
        inactiveTintColor: '#565658',
        showLabel: true,
      }}
      tabBar={(props) => <BottomFabBar color="white" {...props} />}
    >
      <MainTab.Screen
        name="HistoryTab"
        component={HistoryNavigator}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: tabBarIcon('clockcircleo'),
        }}
      />
      <MainTab.Screen
        name="FavoriteTab"
        component={FavoriteNavigator}
        options={{ tabBarLabel: 'Favorite', tabBarIcon: tabBarIcon('staro') }}
      />
      <MainTab.Screen
        name="ScanTab"
        component={ScanNavigator}
        options={{ tabBarLabel: '', tabBarIcon: tabBarIcon('scan1') }}
      />
      <MainTab.Screen
        name="ProfileTab"
        component={ProfileNavigator}
        options={{ tabBarLabel: 'Profile', tabBarIcon: tabBarIcon('user') }}
      />
      <MainTab.Screen
        name="SettingTab"
        component={SettingNavigator}
        options={{ tabBarLabel: 'Setting', tabBarIcon: tabBarIcon('setting') }}
      />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
