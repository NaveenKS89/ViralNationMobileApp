import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import BadgeIcon from '../../assets/svg/badge.svg';
import MoreIcon from '../../assets/svg/more_vert_24px.svg';
import {useSelector} from 'react-redux';
import validator from 'validator';
import DropDownContainer from '../DropDownContainer/DropDownContainer';

const Card = ({
  profile: {
    first_name,
    last_name,
    email,
    is_verified,
    image_url,
    description,
    id,
  },
  onClickMore,
}) => {
  const DEFAULT_IMAGE =
    'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png';

  const theme = useSelector(state => state.theme);

  const options = [
    {label: 'Edit profile', value: 'edit_profile'},
    {label: 'Remove profile', value: 'remove_profile'},
  ];

  return (
    <View
      style={
        theme.mode === 'light'
          ? styles.cardContainer_light
          : styles.cardContainer_dark
      }>
      <View style={styles.cardTopContainer}>
        <Image
          alt={`${first_name} ${last_name}`}
          style={styles.cardImageContainer}
          source={{
            uri: validator.isURL(image_url, {require_protocol: true})
              ? image_url
              : DEFAULT_IMAGE,
          }}
        />
        <View style={styles.cardTopLeftContainer}>
          <View style={styles.cardTopEmailNameContainer}>
            <View style={styles.cardTopNameContainer}>
              <Text
                numberOfLines={1}
                style={
                  theme.mode === 'light'
                    ? styles.cardNameText_light
                    : styles.cardNameText_dark
                }>
                {first_name + ' ' + last_name}
              </Text>
              {is_verified ? (
                <BadgeIcon width="16" height="16" fill={'#3B94ED'} />
              ) : (
                ''
              )}
            </View>
            <Text
              numberOfLines={1}
              style={
                theme.mode === 'light'
                  ? styles.cardEmailText_light
                  : styles.cardEmailText_dark
              }>
              {email}
            </Text>
          </View>
          <DropDownContainer
            options={options}
            rippleConfig={{radius: 12}}
            onClickOption={type =>
              onClickMore(type, {
                first_name,
                last_name,
                email,
                is_verified,
                image_url,
                description,
                id,
              })
            }>
            <MoreIcon width="24" height="24" fill={'#9E9E9E'} />
          </DropDownContainer>
        </View>
      </View>
      <Text
        numberOfLines={6}
        style={
          theme.mode === 'light' ? styles.cardDesc_light : styles.cardDesc_dark
        }>
        {description}
      </Text>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer_light: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    padding: 24,
    width: '100%',
    alignSelf: 'stretch',
    borderRadius: 8,
    backgroundColor: '#eee',
    maxHeight: 218,
    height: 218,
    marginBottom: 24,
  },
  cardContainer_dark: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    gap: 10,
    padding: 24,
    alignSelf: 'stretch',
    borderRadius: 8,
    backgroundColor: '#181A1C',
    maxHeight: 218,
    height: 218,
    marginBottom: 24,
  },
  cardTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    alignSelf: 'stretch',
    position: 'relative',
    zIndex: 1,
  },
  cardImageContainer: {
    borderRadius: 64,
    display: 'flex',
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  cardTopLeftContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  cardTopEmailNameContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  cardTopNameContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  cardNameText_light: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.5,
    color: '#212121',
  },
  cardNameText_dark: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.5,
    color: 'rgba(255, 255, 255, 0.95)',
  },
  cardEmailText_light: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
    color: '#2B2B2B',
  },
  cardEmailText_dark: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
    color: 'rgba(255, 255, 255, 0.50)',
  },
  cardDesc_light: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.4,
    color: '#616161',
    display: 'flex',
    flexBasis: 1,
    flexGrow: 1,
    flexShrink: 1,
  },
  cardDesc_dark: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.4,
    color: '#E0E0E0',
    display: 'flex',
    flexBasis: 1,
    flexGrow: 1,
    flexShrink: 1,
  },
});
