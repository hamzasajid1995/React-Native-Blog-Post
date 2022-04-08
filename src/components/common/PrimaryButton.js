import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import Layout from '../../constants/layout';
import MyText from './MyText';

function PrimaryButton({label, onPress}) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable onPress={onPress} style={styles.button}>
        <MyText style={styles.buttonText}>{label}</MyText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
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
  },
  button: {
    backgroundColor: Layout.primaryColor,
    padding: 16,
  },
  buttonText: {color: '#fff', textAlign: 'center', fontSize: 24},
});
export default PrimaryButton;
