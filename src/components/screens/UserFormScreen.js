import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-root-toast';
import {SafeAreaView} from 'react-native-safe-area-context';

import formData from '../../../form-data.json';
import DatePicker from 'react-native-date-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {setUser} from '../../redux/userSlice';
import MyText from '../common/MyText';
import Layout from '../constants/layout';

function UserFormScreen() {
  const [data, setData] = useState(formData);
  const dispatch = useDispatch();

  const updateData = (key, value) => {
    setData(prevData => {
      return prevData.map(el => (el.key === key ? {...el, value} : el));
    });
  };

  const handleSubmit = () => {
    let errorMsg = [];
    for (let input of data) {
      if (input.required && !input.value) {
        errorMsg.push(input.key);
      }
    }
    if (errorMsg.length > 0) {
      Toast.show(
        `${errorMsg.join(', ')} ${
          errorMsg.length > 1 ? 'are' : 'is'
        } required!`,
      );
      return;
    }
    dispatch(setUser(data));
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom', 'left', 'right']}>
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{padding: 16}}
          keyboardDismissMode="interactive">
          {data.map(input => {
            return (
              <View style={{marginBottom: 16}} key={input.key}>
                <MyText style={{marginBottom: 8, fontWeight: 'bold'}}>
                  {`${input.label} ${input.required ? '*' : ''}`}
                </MyText>
                {(function () {
                  switch (input.type) {
                    case 'image':
                      return (
                        <ImagePicker
                          input={input}
                          onChange={value => {
                            console.log(value);
                            updateData(input.key, value);
                          }}
                        />
                      );
                    case 'text':
                      return (
                        <CustomTextInput
                          input={input}
                          onChange={value => {
                            console.log(value);
                            updateData(input.key, value);
                          }}
                        />
                      );
                    case 'radio':
                      return (
                        <RadioOptions
                          input={input}
                          onChange={value => {
                            console.log(value);
                            updateData(input.key, value);
                          }}
                        />
                      );
                    case 'date':
                      return (
                        <CustomDatePicker
                          input={input}
                          onChange={value => {
                            console.log(value);
                            updateData(input.key, value);
                          }}
                        />
                      );

                    default:
                      return null;
                  }
                })()}
              </View>
            );
          })}
        </ScrollView>
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
          onPress={handleSubmit}
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

function CustomTextInput({input, onChange}) {
  return (
    <TextInput
      style={{
        backgroundColor: '#ddd',
        borderRadius: 8,
        padding: 8,
        height: 40,
        color: '#000',
      }}
      value={input.value}
      onChangeText={text => onChange(text)}
      placeholder={input.placeholder}
      placeholderTextColor="#bbb"
      keyboardType={input.key === 'email' ? 'email-address' : 'default'}
      textContentType={input.key === 'email' ? 'emailAddress' : 'none'}
      autoCapitalize="none"
    />
  );
}

function ImagePicker({input, onChange}) {
  const openGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });
      if (result?.assets?.[0]?.uri) {
        onChange(result.assets[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(input.value?.uri);
  return (
    <Pressable
      onPress={openGallery}
      style={{
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#ccc',
        overflow: 'hidden',
        alignSelf: 'center',
      }}>
      <Image
        source={{uri: input.value?.uri, isStatic: true}}
        style={{width: '100%', height: '100%'}}
      />
    </Pressable>
  );
}

function RadioOptions({input, onChange}) {
  return (
    <View style={{flexDirection: 'row'}}>
      {input.options.map(option => (
        <Pressable
          key={option.key}
          onPress={() => {
            onChange(option.key);
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 12,
          }}>
          <View
            style={{
              width: 15,
              height: 15,
              borderRadius: 8,
              borderWidth: 2,
              borderColor:
                input.value === option.key ? Layout.primaryColor : '#000',
              backgroundColor:
                input.value === option.key ? Layout.primaryColor : '#fff',
              marginRight: 6,
            }}
          />
          <MyText>{option.label}</MyText>
        </Pressable>
      ))}
    </View>
  );
}

function getDateString(date) {
  return `${date.getFullYear()} / ${+date.getMonth() + 1} / ${date.getDate()}`;
}

function CustomDatePicker({input, onChange}) {
  const [show, setShow] = useState(false);
  const onDateChange = selectedDate => {
    onChange(selectedDate.toString());
  };

  const date = input.value ? new Date(input.value) : new Date();
  return (
    <View>
      <Pressable
        style={{
          backgroundColor: '#ddd',
          borderRadius: 8,
          padding: 8,
          height: 40,
          justifyContent: 'center',
        }}
        onPress={() => setShow(true)}>
        <MyText
          style={{
            color: input.value ? '#000' : '#bbb',
          }}>
          {input.value ? getDateString(date) : input.placeholder}
        </MyText>
      </Pressable>
      <DatePicker
        modal
        mode="date"
        open={show}
        date={date}
        onConfirm={newDate => {
          setShow(false);
          onDateChange(newDate);
        }}
        onCancel={() => {
          setShow(false);
        }}
      />
    </View>
  );
}

export default UserFormScreen;
