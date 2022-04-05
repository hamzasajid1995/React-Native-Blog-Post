import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AddPostScreen from '../components/screens/AddPostScreen';
import HomeScreen from '../components/screens/HomeScreen';
import UserFormScreen from '../components/screens/UserFormScreen';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../redux/userSlice';
import Layout from '../components/constants/layout';

const Stack = createStackNavigator();
const config = {
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: Layout.primaryColor,
  },
};
function AppNavigator() {
  const {userData} = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(userData);
    // dispatch(setUser(null));
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!userData ? (
          <Stack.Screen
            name="UserForm"
            component={UserFormScreen}
            options={{
              ...config,
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
            ...config,
            title: 'Home',
            headerTitle: 'Home',
            headerBackTitle: '',
          }}
        />
        <Stack.Screen
          name="AddPost"
          component={AddPostScreen}
          options={{
            ...config,
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
