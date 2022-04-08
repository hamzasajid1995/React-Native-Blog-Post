import React, {useState} from 'react';
import {
  View,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Toast from 'react-native-root-toast';
import formData from '../../../form-data.json';
import DatePicker from 'react-native-date-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {setUser} from '../../redux/userSlice';
import MyText from '../common/MyText';
import Layout from '../../constants/layout';
import PrimaryButton from '../common/PrimaryButton';
import CommonSafeAreaView from '../common/CommonSafeAreaView';

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
    <CommonSafeAreaView>
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardDismissMode="interactive">
          {data.map(input => {
            return (
              <View style={styles.formItem} key={input.key}>
                <MyText style={styles.inputLabel}>
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

      <PrimaryButton label="Submit" onPress={handleSubmit} />
    </CommonSafeAreaView>
  );
}

function CustomTextInput({input, onChange}) {
  return (
    <TextInput
      style={styles.textInput}
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
    <Pressable onPress={openGallery} style={styles.imageButton}>
      <Image
        source={{uri: input.value?.uri, isStatic: true}}
        style={styles.imagePlaceholder}
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
          style={styles.radioContainer}>
          <View
            style={[
              styles.radioButton,
              input.value === option.key ? styles.radioButtonActive : null,
            ]}
          />
          <MyText style={styles.radioLabel}>{option.label}</MyText>
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
      <Pressable style={styles.dateButton} onPress={() => setShow(true)}>
        <MyText
          style={
            input.value ? styles.dateButtonTextActive : styles.dateButtonText
          }>
          {input.value ? getDateString(date) : input.placeholder}
        </MyText>
      </Pressable>
      <DatePicker
        modal
        mode="date"
        open={show}
        date={date}
        maximumDate={new Date()}
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

const styles = StyleSheet.create({
  scrollView: {
    padding: 16,
  },
  formItem: {marginBottom: 16},
  inputLabel: {
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 18,
  },
  textInput: {
    backgroundColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    color: '#000',
    fontSize: 16,
  },
  imageButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ccc',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  imagePlaceholder: {width: '100%', height: '100%'},
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  radioButton: {
    width: 15,
    height: 15,
    borderRadius: 8,
    borderWidth: 2,
    marginRight: 6,
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  radioButtonActive: {
    borderColor: Layout.primaryColor,
    backgroundColor: Layout.primaryColor,
  },
  radioLabel: {
    fontSize: 16,
  },
  dateButton: {
    backgroundColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    paddingVertical: 16,
    // height: 40,
    justifyContent: 'center',
  },
  dateButtonText: {color: '#bbb', fontSize: 16},
  dateButtonTextActive: {color: '#000'},
});

export default UserFormScreen;
