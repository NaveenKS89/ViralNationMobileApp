import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {rippleConfig as androidRippleConfig} from '../../utils';

const DropDownContainer = ({
  options,
  onClickOption,
  children,
  className,
  rippleConfig,
}) => {
  const theme = useSelector(state => state.theme);
  const [isOpen, setIsOpen] = useState(false);

  let dropdownref = useRef(null);

  return (
    <Pressable
      android_ripple={{...androidRippleConfig, ...rippleConfig}}
      style={[styles.container, className ? ` ${className}` : '']}
      onPress={() => isOpen === false && setIsOpen(true)}>
      {children}
      {isOpen === true ? (
        <>
          <View
            onStartShouldSetResponder={evt => true}
            onResponderStart={evt => setIsOpen(false)}
            style={{
              position: 'absolute',
              top: -500,
              left: -500,
              zIndex: 1,
              height: 1500,
              width: 1500,
            }}
          />
          <View
            style={
              theme.mode === 'light'
                ? styles.dropdownContainer_light
                : styles.dropdownContainer_dark
            }
            ref={dropdownref}
            onStartShouldSetResponder={evt => true}
            onResponderRelease={evt => {}}>
            {_.map(options, (option, index) => {
              return (
                <Pressable
                  android_ripple={androidRippleConfig}
                  key={option.value + index}
                  onPress={e => {
                    e.stopPropagation();
                    onClickOption(option.value);
                    setIsOpen(false);
                  }}>
                  <Text
                    style={
                      theme.mode === 'light'
                        ? styles.dropdownItem_light
                        : styles.dropdownItem_dark
                    }>
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </>
      ) : (
        ''
      )}
    </Pressable>
  );
};

export default DropDownContainer;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
  },
  pressableContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    minHeight: '100%',
    minWidth: '100%',
    backgroundColor: 'red',
    zIndex: 1,
    top: 0,
    left: 0,
  },
  dropdownContainer_light: {
    position: 'absolute',
    minWidth: 143,
    backgroundColor: '#F5F5F5',
    right: 0,
    top: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    zIndex: 2,
  },
  dropdownContainer_dark: {
    position: 'absolute',
    minWidth: 143,
    backgroundColor: '#232425',
    right: 0,
    top: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    zIndex: 2,
  },
  dropdownItem_light: {
    display: 'flex',
    minWidth: 143,
    padding: 12,
    alignItems: 'center',
    gap: 8,
    color: '#2b2b2b',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  dropdownItem_dark: {
    display: 'flex',
    minWidth: 143,
    padding: 12,
    alignItems: 'center',
    gap: 8,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
  },
});
