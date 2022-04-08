import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AddPostScreen from '../screens/AddPostScreen';
import HomeScreen from '../screens/HomeScreen';
import UserFormScreen from '../screens/UserFormScreen';
import {useSelector} from 'react-redux';

import Layout from '../constants/layout';

const Stack = createStackNavigator();

const optionsConfig = {
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: Layout.primaryColor,
  },
};

function AppNavigator() {
  const {userData} = useSelector(state => state.user);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!userData ? (
          <Stack.Screen
            name="UserForm"
            component={UserFormScreen}
            options={{
              ...optionsConfig,
              title: 'Personal Info',
              headerTitle: 'Personal Info',
              headerBackTitle: '',
            }}
          />
        ) : null}

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            ...optionsConfig,
            title: 'Home',
            headerTitle: 'Home',
            headerBackTitle: '',
          }}
        />
        <Stack.Screen
          name="AddPost"
          component={AddPostScreen}
          options={{
            ...optionsConfig,
            title: 'Add Post',
            headerTitle: 'Add Post',
            headerBackTitle: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
