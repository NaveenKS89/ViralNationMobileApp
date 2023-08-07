import React, {useState, useEffect} from 'react';

import {View, Text, Modal, StyleSheet, Pressable} from 'react-native';
import {useSelector} from 'react-redux';

const Toast = ({isDanger, text, onClose}) => {
  const theme = useSelector(state => state.theme);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      onClose();
      setIsVisible(false);
    }, 1000);
  }, [onClose]);

  return (
    <Modal animationType="fade" visible={isVisible} transparent={true}>
      <Pressable
        onPress={() => {
          onClose();
          setIsVisible(false);
        }}>
        <View
          style={
            theme.mode === 'light'
              ? styles.modalOuterContainer_light
              : styles.modalOuterContainer_dark
          }>
          <View
            style={[
              theme.mode === 'light'
                ? styles.modalContainer_light
                : styles.modalContainer_dark,
              isDanger ? {backgroundColor: 'red'} : {},
            ]}>
            <Text
              style={[
                theme.mode === 'light'
                  ? styles.modalBodyText_light
                  : styles.modalBodyText_dark,
                isDanger ? {color: '#fff'} : {},
              ]}>
              {text}
            </Text>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOuterContainer_light: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalOuterContainer_dark: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalContainer_light: {
    flexDirection: 'column',
    backgroundColor: '#fcfcfd',
    maxWidth: 200,
    borderRadius: 40,
    display: 'flex',
    height: 'auto',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  modalContainer_dark: {
    flexDirection: 'column',
    backgroundColor: '#121212',
    maxWidth: 400,
    borderRadius: 40,
    display: 'flex',
    height: 'auto',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  modalBodyText_light: {
    color: '#212121',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
    alignSelf: 'stretch',
  },
  modalBodyText_dark: {
    color: '#E0E0E0',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
    alignSelf: 'stretch',
  },
});

export default Toast;
