import React, {useEffect, useState} from 'react';
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

import Loader from '../common/Loader';

import formData from '../../../form-data.json';
import DatePicker from 'react-native-date-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../redux/userSlice';

function UserFormScreen() {
  const [data, setData] = useState(formData);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(data);
  }, []);

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
    <SafeAreaView style={{flex: 1}}>
      <ScrollView keyboardDismissMode="interactive">
        {data.map(input => {
          switch (input.type) {
            case 'image':
              return (
                <ImagePicker
                  key={input.key}
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
                  key={input.key}
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
                  key={input.key}
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
                  key={input.key}
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
        })}
        <Pressable onPress={handleSubmit}>
          <Text>Submit</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function CustomTextInput({input, onChange}) {
  return (
    <View>
      <Text>
        {input.label} {input.required ? '*' : ''}
      </Text>
      <TextInput
        value={input.value}
        onChangeText={text => onChange(text)}
        placeholder={input.placeholder}
        keyboardType={input.key === 'email' ? 'email-address' : 'default'}
        textContentType={input.key === 'email' ? 'emailAddress' : 'none'}
        autoCapitalize="none"
      />
    </View>
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
    <View>
      <Text>{input.label}</Text>
      <Pressable
        onPress={openGallery}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: '#ccc',
          overflow: 'hidden',
        }}>
        <Image
          source={{uri: input.value?.uri, isStatic: true}}
          style={{width: '100%', height: '100%'}}
        />
      </Pressable>
    </View>
  );
}

function RadioOptions({input, onChange}) {
  return (
    <View>
      <Text>{input.label}</Text>
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
              marginRight: 6,
            }}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                borderWidth: 2,
                borderColor: '#000',
                backgroundColor: input.value === option.key ? '#000' : '#fff',
                marginRight: 6,
              }}
            />
            <Text>{option.label}</Text>
          </Pressable>
        ))}
      </View>
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
      <Text>{input.label}</Text>
      <Pressable onPress={() => setShow(true)}>
        <Text>{input.value ? getDateString(date) : input.placeholder}</Text>
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
