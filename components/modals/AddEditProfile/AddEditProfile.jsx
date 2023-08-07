import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  ActivityIndicator,
  Switch,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {useSelector} from 'react-redux';
import {
  addProfileMutation,
  updateProfileMutation,
  getProfilesQuery,
} from '../../../queries/profileQueries';
import {rippleConfig} from '../../../utils';
import Input from '../../Input/Input';
import CloseIcon from '../../../assets/svg/close_24px.svg';
import Toast from '../Toast/Toast';

const AddEditProfile = ({
  fields,
  onClose,
  isEdit,
  onAddProfile,
  onUpdateProfile,
  isVisible,
}) => {
  const theme = useSelector(state => state.theme);
  const [isToastOpen, setIsToastOpen] = useState(false);

  const [toastText, setToastText] = useState('');
  const [isDanger, setIsDanger] = useState(false);

  const [
    doCreateProfile,
    {loading: isCreatingProfile, error: creatingProfileError},
  ] = useMutation(addProfileMutation);
  const [
    doEditProfile,
    {loading: isEditProfileLoading, error: editProfileError, client},
  ] = useMutation(updateProfileMutation);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [image_url, setImage_url] = useState(
    fields?.image_url ? fields?.image_url : '',
  );
  const [image_urlError, setImage_urlError] = useState(false);
  const [first_name, setFirst_name] = useState(
    fields?.first_name ? fields?.first_name : '',
  );
  const [first_nameError, setFirst_nameError] = useState(false);
  const [last_name, setLast_name] = useState(
    fields?.last_name ? fields?.last_name : '',
  );
  const [last_nameError, setLast_nameError] = useState(false);
  const [email, setEmail] = useState(fields?.email ? fields?.email : '');
  const [emailError, setEmailError] = useState(false);
  const [is_verified, setIs_verified] = useState(
    fields?.is_verified ? fields?.is_verified : false,
  );
  const [description, setDescription] = useState(
    fields?.description ? fields?.description : '',
  );
  const [descriptionError, setDescriptionError] = useState(false);

  const handleEventChange = (value, name) => {
    switch (name) {
      case 'image_url':
        setImage_url(value);
        if (value === '') {
          setImage_urlError(true);
        } else {
          setImage_urlError(false);
        }
        break;
      case 'first_name':
        setFirst_name(value);
        if (value === '') {
          setFirst_nameError(true);
        } else {
          setFirst_nameError(false);
        }
        break;
      case 'last_name':
        setLast_name(value);
        if (value === '') {
          setLast_nameError(true);
        } else {
          setLast_nameError(false);
        }
        break;
      case 'email':
        setEmail(value);
        if (value === '') {
          setEmailError(true);
        } else {
          setEmailError(false);
        }
        break;
      case 'is_verified':
        setIs_verified(value);
        break;
      case 'description':
        setDescription(value);
        if (value === '') {
          setDescriptionError(true);
        } else {
          setDescriptionError(false);
        }
        break;
      default:
        break;
    }
  };

  const handleSubmitAdd = () => {
    setIsSubmitting(true);
    let isError = false;
    if (image_url === '') {
      setImage_urlError(true);
      isError = true;
    }
    if (first_name === '') {
      setFirst_nameError(true);
      isError = true;
    }
    if (last_name === '') {
      setLast_nameError(true);
      isError = true;
    }
    if (email === '') {
      setEmailError(true);
      isError = true;
    }
    if (description === '') {
      setDescriptionError(true);
      isError = true;
    }

    if (!isError) {
      let json = {
        firstName: first_name,
        lastName: last_name,
        email: email,
        isVerified: is_verified,
        imageUrl: image_url,
        description: description,
      };

      doCreateProfile({
        variables: json,
        onCompleted: () => {
          setIsToastOpen(true);
          setToastText('Profile added!');
          setIsDanger(false);
          onAddProfile();
          setIsSubmitting(false);
          onClose();
        },
        onError: () => {
          setIsToastOpen(true);
          setToastText('Failed to add profile!');
          setIsDanger(true);
          setIsSubmitting(false);
        },
      });
    }
  };

  const handleSubmitEdit = () => {
    setIsSubmitting(true);
    let isError = false;

    if (image_url === '') {
      setImage_urlError(true);
      isError = true;
    }
    if (first_name === '') {
      setFirst_nameError(true);
      isError = true;
    }
    if (last_name === '') {
      setLast_nameError(true);
      isError = true;
    }
    if (email === '') {
      setEmailError(true);
      isError = true;
    }
    if (description === '') {
      setDescriptionError(true);
      isError = true;
    }

    if (!isError) {
      let json = {
        updateProfileId: fields.id,
        firstName: first_name,
        lastName: last_name,
        email: email,
        isVerified: is_verified,
        imageUrl: image_url,
        description: description,
      };

      doEditProfile({
        variables: json,
        /*  refetchQueries: [
          fields?.is_verified !== is_verified
            ? {
                query: getProfilesQuery,
                variables: {
                  page: 0,
                },
              }
            : {
                query: getProfilesQuery,
              },
        ], */
        /* update: cache => {
          cache.evict({fieldName: 'profiles'});
        }, */
        /* onQueryUpdated: (observableQuery, diff, lastDiff) => {
          console.log(observableQuery, diff, lastDiff);
          return true;
        }, */
        onCompleted: () => {
          setIsToastOpen(true);
          setToastText('Profile updated!');
          setIsDanger(false);
          /* if (fields?.is_verified !== is_verified) {
            //client.clearStore();
            client.refetchQueries({
              updateCache(cache) {
                cache.evict({fieldName: 'getAllProfiles'});
              },
            });
          } else {
            client.refetchQueries({
              include: ['GetAllProfiles'],
            });
          } */
          onUpdateProfile();
          setIsSubmitting(false);
          onClose();
        },
        onError: () => {
          setIsToastOpen(true);
          setToastText('Failed to update profile');
          setIsDanger(true);
          setIsSubmitting(false);
        },
      });
    }
  };

  const clearFieldsAndErrors = () => {
    setImage_url('');
    setImage_urlError(false);
    setDescription('');
    setDescriptionError(false);
    setEmail('');
    setEmailError(false);
    setFirst_name('');
    setFirst_nameError(false);
    setLast_name('');
    setLast_nameError(false);
    setIs_verified(false);
    setIsSubmitting(false);
  };

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={() => {
        clearFieldsAndErrors();
        onClose();
      }}>
      <View
        style={
          theme.mode === 'light'
            ? styles.modalContainer_light
            : styles.modalContainer_dark
        }>
        <View
          style={
            theme.mode === 'light'
              ? styles.modalHeaderContainer_light
              : styles.modalHeaderContainer_dark
          }>
          <Text
            style={
              theme.mode === 'light'
                ? styles.modalHeaderTitle_light
                : styles.modalHeaderTitle_dark
            }>
            {isEdit ? 'Edit Profile' : 'Create Profile'}
          </Text>
          <Pressable
            android_ripple={{...rippleConfig, radius: 16}}
            onPress={() => {
              clearFieldsAndErrors();
              onClose();
            }}>
            <CloseIcon width="32" height="32" fill={'#9E9E9E'} />
          </Pressable>
        </View>
        <ScrollView style={{flex: 1}}>
          <View style={styles.modalBodyContainer}>
            <Input
              value={image_url}
              onChangeHandle={val => handleEventChange(val, 'image_url')}
              placeholder={''}
              inputMode={'url'}
              multiline={false}
              label="Image link"
              inputError={image_urlError}
              errorMessage={image_urlError ? 'Required' : ''}
              required={true}
              returnKeyType="next"
            />
            <View style={styles.modalInputHalfContainer}>
              <Input
                value={first_name}
                onChangeHandle={val => handleEventChange(val, 'first_name')}
                placeholder={''}
                keyboardType={'text'}
                multiline={false}
                label="First name"
                inputError={first_nameError}
                errorMessage={first_nameError ? 'Required' : ''}
                required={true}
                halfWidth={true}
                returnKeyType="next"
              />
              <Input
                value={last_name}
                onChangeHandle={val => handleEventChange(val, 'last_name')}
                placeholder={''}
                keyboardType={'text'}
                multiline={false}
                label="Last name"
                inputError={last_nameError}
                errorMessage={last_nameError ? 'Required' : ''}
                required={true}
                halfWidth={true}
                returnKeyType="next"
              />
            </View>
            <Input
              value={email}
              onChangeHandle={val => handleEventChange(val, 'email')}
              placeholder={''}
              inputMode={'email'}
              multiline={false}
              label="Email"
              inputError={emailError}
              errorMessage={emailError ? 'Required' : ''}
              required={true}
              returnKeyType="next"
            />
            <Input
              value={description}
              onChangeHandle={val => handleEventChange(val, 'description')}
              placeholder={'Write a description for the talent'}
              inputMode={'text'}
              multiline={true}
              label="Description"
              inputError={descriptionError}
              errorMessage={descriptionError ? 'Required' : ''}
              required={true}
              numberOfLines={5}
              returnKeyType="next"
            />
            <View style={styles.modalVerifyContainer}>
              <Text
                style={
                  theme.mode === 'light'
                    ? styles.modalVerifyLabel_light
                    : styles.modalVerifyLabel_dark
                }
              />
              <View
                style={
                  theme.mode === 'light'
                    ? styles.modalToggleContainer_light
                    : styles.modalToggleContainer_dark
                }>
                <Text
                  style={
                    theme.mode === 'light'
                      ? styles.modalToggleText_light
                      : styles.modalToggleText_dark
                  }>
                  {is_verified
                    ? 'Talent is verified'
                    : 'Talent is not verified'}
                </Text>
                <Switch
                  trackColor={{
                    false: 'rgba(97, 97, 97, 1)',
                    true: 'rgba(146, 208, 255, 1)',
                  }}
                  thumbColor={
                    is_verified
                      ? 'rgba(61, 172, 255, 1)'
                      : 'rgba(228, 229, 231, 1)'
                  }
                  ios_backgroundColor="#616161"
                  onValueChange={() => setIs_verified(value => !value)}
                  value={is_verified}
                />
              </View>
            </View>
          </View>
          <View style={styles.modalTailContainer}>
            <Pressable
              android_ripple={rippleConfig}
              style={styles.modalSubmitBtn}
              onPress={() => {
                if (!isEdit) {
                  if (!isSubmitting && !isCreatingProfile) {
                    handleSubmitAdd();
                  }
                } else {
                  if (!isSubmitting && !isEditProfileLoading) {
                    handleSubmitEdit();
                  }
                }
              }}>
              {isCreatingProfile || isEditProfileLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.modalSubmitBtnTxt}>
                  {isEdit ? 'Edit Profile' : 'Create Profile'}
                </Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
        {isToastOpen && (
          <Toast
            isDanger={isDanger}
            text={toastText}
            onClose={() => {
              setIsToastOpen(false);
              setToastText('');
              setIsDanger(false);
            }}
          />
        )}
      </View>
    </Modal>
  );
};

export default AddEditProfile;

const styles = StyleSheet.create({
  modalContainer_light: {
    flexDirection: 'column',
    backgroundColor: '#fcfcfd',
    height: '100%',
    width: '100%',
  },
  modalContainer_dark: {
    flexDirection: 'column',
    backgroundColor: '#121212',
    height: '100%',
    width: '100%',
  },
  modalHeaderContainer_light: {
    height: 96,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 32,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    borderStyle: 'solid',
  },
  modalHeaderContainer_dark: {
    height: 96,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 32,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2B2B2B',
    borderStyle: 'solid',
  },
  modalHeaderTitle_light: {
    color: '#212121',
    fontFamily: 'Roboto',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  modalHeaderTitle_dark: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontFamily: 'Roboto',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  modalBodyContainer: {
    display: 'flex',
    width: '100%',
    paddingVertical: 32,
    paddingHorizontal: 24,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 24,
    flex: 1,
  },
  modalInputHalfContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalVerifyContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 16,
    alignSelf: 'stretch',
  },
  modalVerifyLabel_light: {
    color: '#2B2B2B',
    fontFamily: 'Roboto',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  modalVerifyLabel_dark: {
    color: 'rgba(255, 255, 255, 0.50)',
    fontFamily: 'Roboto',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  modalToggleContainer_light: {
    display: 'flex',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#EEE',
    flexDirection: 'row',
  },
  modalToggleContainer_dark: {
    display: 'flex',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#2B2B2B',
    backgroundColor: '#212121',
    flexDirection: 'row',
  },
  modalToggleText_light: {
    color: '#2B2B2B',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  modalToggleText_dark: {
    color: '#EEE',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  modalTailContainer: {
    display: 'flex',
    width: '100%',
    padding: 24,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },
  modalSubmitBtn: {
    display: 'flex',
    height: 44,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderRadius: 4,
    backgroundColor: '#3DACFF',
    shadowColor: 'rgba(0, 0, 0, 0.00)',
    shadowRadius: 4,
    width: 120,
  },
  modalSubmitBtnTxt: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: 0.25,
  },
});
