import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import {View, FlatList, StyleSheet} from 'react-native';
import Toast from 'react-native-root-toast';
import {useDispatch, useSelector} from 'react-redux';
import {setPosts} from '../../redux/postSlice';
import PostService from '../../services/post.service';
import CommonSafeAreaView from '../common/CommonSafeAreaView';
import Loader from '../common/Loader';
import MyText from '../common/MyText';
import PrimaryButton from '../common/PrimaryButton';

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
  }, [dispatch]);

  return (
    <CommonSafeAreaView>
      <Loader show={isLoading} />
      <View style={styles.postsContainer}>
        <FlatList
          contentContainerStyle={styles.postsScrollview}
          data={posts}
          renderItem={({item}) => <PostItem post={item} />}
          keyExtractor={item => item.id}
        />
      </View>

      <PrimaryButton
        label="Add new post"
        onPress={() => navigation.navigate('AddPost')}
      />
    </CommonSafeAreaView>
  );
}

function PostItem({post}) {
  return (
    <View style={styles.post}>
      <MyText style={styles.postTitle}>{post.title}</MyText>
      <MyText style={styles.postBody}>{post.body}</MyText>
    </View>
  );
}

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
  },
  postsScrollview: {padding: 16},
  post: {borderWidth: 1, marginBottom: 16, padding: 8},
  postTitle: {fontWeight: 'bold', fontSize: 18, textTransform: 'capitalize'},
  postBody: {fontSize: 16, textTransform: 'capitalize'},
});

export default HomeScreen;
