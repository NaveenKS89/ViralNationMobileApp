import React from 'react';
import {View, Text, Switch} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
// actions
import {switchMode} from '../../redux-store/actions';
import style from './style';
import Logo from '../../assets/svg/vn-logo.svg';
import MoonIcon from '../../assets/svg/moon.svg';
import SunIcon from '../../assets/svg/sun.svg';
const Header = () => {
  // get the current theme
  const theme = useSelector(state => state.theme);
  // initialize action dispatcher
  const dispatch = useDispatch();

  // Handle changing the theme mode
  const handleThemeChange = () => {
    dispatch(switchMode(theme.mode === 'light' ? 'dark' : 'light'));
  };

  return (
    <View
      style={
        theme.mode === 'light'
          ? style.headerContainer_light
          : style.headerContainer_dark
      }>
      <View style={style.headerLeftContainer}>
        <Logo
          width={32}
          height={32}
          fill={theme.mode === 'light' ? '#212121' : '#ffffff'}
        />
        <Text
          style={
            theme.mode === 'light'
              ? style.headerLogoText_light
              : style.headerLogoText_dark
          }>
          iral Nation
        </Text>
      </View>
      <View style={style.headerRightContainer}>
        <SunIcon
          width={24}
          height={24}
          fill={theme.mode === 'light' ? '#212121' : '#9E9E9E'}
        />
        <Switch
          trackColor={{false: '#616161', true: '#616161'}}
          thumbColor={'#E4E5E7'}
          ios_backgroundColor="#616161"
          onValueChange={() => handleThemeChange()}
          value={theme.mode === 'dark'}
        />
        <MoonIcon
          width={24}
          height={24}
          fill={theme.mode === 'light' ? '#9E9E9E' : '#fafafa'}
        />
      </View>
    </View>
  );
};

export default Header;
