import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {useSelector} from 'react-redux';

const SearchBar = ({value, onChangeHandle, placeholder, keyboardType}) => {
  const theme = useSelector(state => state.theme);
  return (
    <TextInput
      style={theme.mode === 'light' ? styles.input_light : styles.input_dark}
      onChangeText={onChangeHandle}
      value={value}
      placeholder={placeholder}
      keyboardType={keyboardType}
      placeholderTextColor={theme.mode === 'light' ? '#757575' : '#BDBDBD'}
      underlineColorAndroid="transparent"
    />
  );
};

const styles = StyleSheet.create({
  input_light: {
    height: 42,
    borderWidth: 1,
    padding: 10,
    borderColor: '#2B2B2B',
    borderStyle: 'solid',
    paddingVertical: 11,
    paddingHorizontal: 16,
    color: '#212121',
  },
  input_dark: {
    height: 42,
    borderWidth: 1,
    padding: 10,
    borderColor: '#9E9E9E',
    borderStyle: 'solid',
    paddingVertical: 11,
    paddingHorizontal: 16,
    color: '#ffffff',
  },
});

export default SearchBar;
