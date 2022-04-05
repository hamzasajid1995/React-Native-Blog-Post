import {nanoid} from '@reduxjs/toolkit';
import React, {useRef, useState} from 'react';

import {Text, View, Pressable, TextInput, ScrollView} from 'react-native';
import Toast from 'react-native-root-toast';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {addPost} from '../../redux/postSlice';
import MyText from '../common/MyText';
import Layout from '../constants/layout';

function AddPostScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const descriptionRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    let errorMsg = [];
    if (!title) {
      errorMsg.push('Title');
    }
    if (!description) {
      errorMsg.push('Description');
    }
    if (errorMsg.length > 0) {
      Toast.show(
        `${errorMsg.join(', ')} ${
          errorMsg.length > 1 ? 'are' : 'is'
        } required!`,
      );
      return;
    }
    const newPost = {userId: 1, id: nanoid(), title, body: description};
    console.log({newPost});
    dispatch(addPost(newPost));
    Toast.show('New Post Added');
    setTitle('');
    setDescription('');
  };
  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={{flex: 1, padding: 16}}
        keyboardDismissMode={'interactive'}>
        <View style={{marginBottom: 16}}>
          <MyText style={{marginBottom: 8, fontWeight: 'bold'}}>Title</MyText>
          <TextInput
            style={{
              backgroundColor: '#ddd',
              borderRadius: 8,
              padding: 8,
              color: '#000',
            }}
            placeholder="Enter The Title"
            placeholderTextColor="#bbb"
            autoFocus={true}
            value={title}
            onChangeText={text => setTitle(text)}
            returnKeyLabel="Next"
            returnKeyType="next"
            onSubmitEditing={() => {
              descriptionRef?.current?.focus?.();
            }}
          />
        </View>
        <View style={{marginBottom: 16}}>
          <MyText style={{marginBottom: 8, fontWeight: 'bold'}}>
            Description
          </MyText>
          <TextInput
            style={{
              backgroundColor: '#ddd',
              borderRadius: 8,
              padding: 8,
              textAlignVertical: 'top',
              height: 100,
              color: '#000',
            }}
            placeholder="Enter The Description"
            placeholderTextColor="#bbb"
            value={description}
            ref={descriptionRef}
            onChangeText={text => setDescription(text)}
            multiline={true}
            // numberOfLines={4}
            onSubmitEditing={handleSubmit}
          />
        </View>
      </ScrollView>
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
            handleSubmit();
          }}
          style={{
            backgroundColor: Layout.primaryColor,
            padding: 16,
          }}>
          <MyText style={{color: '#fff', textAlign: 'center'}}>Submit</MyText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default AddPostScreen;
