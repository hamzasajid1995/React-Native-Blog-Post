import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import {View, Text, FlatList, Pressable} from 'react-native';
import Toast from 'react-native-root-toast';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {setPosts} from '../../redux/postSlice';
import PostService from '../../services/post.service';
import Loader from '../common/Loader';
import MyText from '../common/MyText';
import Layout from '../constants/layout';

function HomeScreen() {
  const [isLoading, setLoading] = useState(true);
  const {posts = []} = useSelector(state => state.post);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
    PostService.fetchPosts()
      .then(response => {
        if (response?.length > 0) {
          dispatch(setPosts(response));
        } else {
          throw 'Posts Not found';
        }
      })
      .catch(error => {
        console.log(error);
        Toast.show('Something went wrong!');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom', 'left', 'right']}>
      <Loader show={isLoading} />
      <View style={{flex: 1}}>
        <FlatList
          contentContainerStyle={{padding: 16}}
          data={posts}
          renderItem={({item}) => (
            <View style={{borderWidth: 1, marginBottom: 16, padding: 8}}>
              <MyText style={{fontWeight: 'bold'}}>{item.title}</MyText>
              <MyText>{item.body}</MyText>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <View
        style={{
          flex: 0,
          padding: 16,
          paddingTop: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        <Pressable
          onPress={() => {
            navigation.navigate('AddPost');
          }}
          style={{
            backgroundColor: Layout.primaryColor,
            padding: 16,
          }}>
          <MyText style={{color: '#fff', textAlign: 'center'}}>
            Add New Post
          </MyText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
