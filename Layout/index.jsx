import React from 'react';
import {View, SafeAreaView} from 'react-native';
import style from './styles';
import {useSelector} from 'react-redux';
import Header from '../components/Header/Header';

const Layout = ({children}) => {
  const theme = useSelector(state => state.theme);

  return (
    <SafeAreaView>
      <View
        style={
          theme.mode === 'light' ? style.container_light : style.container_dark
        }>
        <Header />
        {children}
      </View>
    </SafeAreaView>
  );
};

export default Layout;
