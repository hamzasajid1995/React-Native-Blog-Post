import {nanoid} from '@reduxjs/toolkit';
import React, {useRef, useState} from 'react';

import {View, TextInput, ScrollView, StyleSheet} from 'react-native';
import Toast from 'react-native-root-toast';
import {useDispatch} from 'react-redux';
import {addPost} from '../../redux/postSlice';
import CommonSafeAreaView from '../common/CommonSafeAreaView';
import MyText from '../common/MyText';
import PrimaryButton from '../common/PrimaryButton';

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
    dispatch(addPost(newPost));
    Toast.show('New Post Added');
    setTitle('');
    setDescription('');
  };

  return (
    <CommonSafeAreaView>
      <ScrollView
        contentContainerStyle={styles.scrollview}
        keyboardDismissMode={'interactive'}>
        <View style={styles.inputContainer}>
          <MyText style={styles.label}>Title</MyText>
          <TextInput
            style={styles.titleInput}
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
        <View style={styles.inputContainer}>
          <MyText style={styles.label}>Description</MyText>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Enter The Description"
            placeholderTextColor="#bbb"
            value={description}
            ref={descriptionRef}
            onChangeText={text => setDescription(text)}
            multiline={true}
            numberOfLines={4}
            onSubmitEditing={handleSubmit}
          />
        </View>
      </ScrollView>

      <PrimaryButton label="Submit" onPress={handleSubmit} />
    </CommonSafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollview: {flex: 1, padding: 16},
  inputContainer: {marginBottom: 16},
  titleInput: {
    backgroundColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    color: '#000',
    fontSize: 16,
  },
  descriptionInput: {
    backgroundColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    textAlignVertical: 'top',
    height: 100,
    color: '#000',
    fontSize: 16,
  },
  label: {marginBottom: 8, fontWeight: 'bold', fontSize: 18},
});
export default AddPostScreen;
