import React from 'react';
import {Text} from 'react-native';

function MyText(props) {
  return <Text style={{color: '#000', ...props.style}}>{props.children}</Text>;
}

export default MyText;
