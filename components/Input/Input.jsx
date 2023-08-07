import React from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import {useSelector} from 'react-redux';

const Input = ({
  value,
  onChangeHandle,
  placeholder,
  inputMode,
  multiline,
  label,
  inputError,
  errorMessage,
  required,
  halfWidth,
  numberOfLines,
  returnKeyType,
  ...rest
}) => {
  const theme = useSelector(state => state.theme);

  console.log(inputError);
  return (
    <View
      style={[styles.inputContainer, halfWidth === true ? {width: '45%'} : {}]}>
      <Text
        style={[
          theme.mode === 'light'
            ? styles.inputLabel_light
            : styles.inputLabel_dark,
          inputError === true ? styles.errorText : {},
        ]}>
        {label}
        {required ? '*' : ''}
        {inputError ? ` ${errorMessage}` : ''}
      </Text>
      <TextInput
        style={[
          theme.mode === 'light' ? styles.input_light : styles.input_dark,
          inputError ? styles.errorInput : {},
          multiline && numberOfLines > 1
            ? {height: 20 + numberOfLines * 20, textAlignVertical: 'top'}
            : {},
        ]}
        onChangeText={onChangeHandle}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={'#757575'}
        inputMode={inputMode}
        numberOfLines={numberOfLines ? numberOfLines : 1}
        multiline={multiline ? multiline : false}
        returnKeyType={returnKeyType ? returnKeyType : 'default'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    width: '100%',
  },
  inputLabel_light: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.4,
    color: '#2b2b2b',
  },
  inputLabel_dark: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.4,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  input_light: {
    height: 40,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderColor: '#bdbdbd',
    borderStyle: 'solid',
    color: '#616161',
    backgroundColor: 'transparent',
    letterSpacing: 0.25,
    borderRadius: 4,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
  },
  input_dark: {
    height: 40,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderStyle: 'solid',
    color: 'rgba(255, 255, 255, 0.7)',
    backgroundColor: 'transparent',
    letterSpacing: 0.25,
    borderRadius: 4,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
  },
  errorInput: {
    borderBottomColor: 'red',
  },
  errorText: {
    color: 'red',
  },
});

export default Input;
