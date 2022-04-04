import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AddPostScreen from '../components/screens/AddPostScreen';
import HomeScreen from '../components/screens/HomeScreen';
import UserFormScreen from '../components/screens/UserFormScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="UserForm"
          component={UserFormScreen}
          options={{
            title: 'Personal Info',
            headerTitle: 'Personal Info',
            headerBackTitle: '',
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerTitle: 'Home',
            headerBackTitle: '',
          }}
        />
        <Stack.Screen
          name="AddPost"
          component={AddPostScreen}
          options={{
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
