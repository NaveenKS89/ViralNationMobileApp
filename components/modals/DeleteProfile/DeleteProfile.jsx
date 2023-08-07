import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {rippleConfig} from '../../../utils';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useMutation} from '@apollo/client';
import CloseIcon from '../../../assets/svg/close_24px.svg';
import {removeProfileMutation} from '../../../queries/profileQueries';
import Toast from '../Toast/Toast';

const DeleteProfile = ({
  title,
  bodyText,
  onCancel,
  onClose,
  selectedProfile,
  onRemoveProfile,
  isVisible,
}) => {
  const theme = useSelector(state => state.theme);

  const [doRemoveProfile, {loading: isRemovingProfile}] = useMutation(
    removeProfileMutation,
  );

  const [isToastOpen, setIsToastOpen] = useState(false);

  const [toastText, setToastText] = useState('');

  const handleDeleteProfile = id => {
    doRemoveProfile({
      variables: {deleteProfileId: id},
      onCompleted: () => {
        setIsToastOpen(true);
        setToastText('Profile removed!');
        onRemoveProfile();
        onClose();
      },
      onError: () => {
        setIsToastOpen(true);
        setToastText('Failed to remove Profile');
      },
    });
  };

  return (
    <Modal
      animationType="fade"
      visible={isVisible}
      transparent={true}
      onRequestClose={() => {
        onClose();
      }}>
      <View
        style={
          theme.mode === 'light'
            ? styles.modalOuterContainer_light
            : styles.modalOuterContainer_dark
        }>
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
              {title}
            </Text>
            <Pressable
              onPress={() => {
                onClose();
              }}
              android_ripple={{...rippleConfig, radius: 16}}>
              <CloseIcon width="32" height="32" fill={'#9E9E9E'} />
            </Pressable>
          </View>
          <View style={styles.modalBodyContainer}>
            <Text
              style={
                theme.mode === 'light'
                  ? styles.modalBodyText_light
                  : styles.modalBodyText_dark
              }>
              {bodyText}
            </Text>
          </View>
          <View
            style={
              theme.mode === 'light'
                ? styles.modalTail_light
                : styles.modalTail_dark
            }>
            <Pressable
              style={
                theme.mode === 'light'
                  ? styles.modalCancelBtn_light
                  : styles.modalCancelBtn_dark
              }
              android_ripple={rippleConfig}
              onPress={onCancel}>
              <Text
                style={
                  theme.mode === 'light'
                    ? styles.cancelBtnText_light
                    : styles.cancelBtnText_dark
                }>
                Cancel
              </Text>
            </Pressable>
            <Pressable
              style={styles.modalDeleteBtn}
              android_ripple={rippleConfig}
              onPress={() =>
                isRemovingProfile === false &&
                handleDeleteProfile(selectedProfile.id)
              }>
              {isRemovingProfile ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.modalDeleteBtnText}>Delete</Text>
              )}
            </Pressable>
          </View>
        </View>
        {isToastOpen && (
          <Toast
            isDanger={true}
            text={toastText}
            onClose={() => {
              setIsToastOpen(false);
              setToastText('');
            }}
          />
        )}
      </View>
    </Modal>
  );
};

export default DeleteProfile;

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
    maxWidth: 400,
    borderRadius: 4,
    display: 'flex',
    height: 236,
  },
  modalContainer_dark: {
    flexDirection: 'column',
    backgroundColor: '#121212',
    maxWidth: 400,
    borderRadius: 4,
    display: 'flex',
    height: 236,
  },
  modalHeaderContainer_light: {
    height: 72,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 24,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    borderStyle: 'solid',
  },
  modalHeaderContainer_dark: {
    height: 72,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 24,
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
    padding: 24,
    flexDirection: 'column',
    alignItems: 'flex-start',
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
  modalTail_light: {
    display: 'flex',
    paddingTop: 16,
    paddingRight: 24,
    paddingBottom: 24,
    paddingLeft: 24,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 16,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderStyle: 'solid',
    borderTopColor: '#E0E0E0',
    flexDirection: 'row',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  modalTail_dark: {
    display: 'flex',
    paddingTop: 16,
    paddingRight: 24,
    paddingBottom: 24,
    paddingLeft: 24,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 16,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderStyle: 'solid',
    borderTopColor: '#2B2B2B',
    flexDirection: 'row',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  modalCancelBtn_light: {
    display: 'flex',
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderRadius: 6,
    borderWidth: 1,
    flex: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(255, 255, 255, 0.10)',
    backgroundColor: '#EEE',
  },
  modalCancelBtn_dark: {
    display: 'flex',
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderRadius: 6,
    borderWidth: 1,
    flex: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(255, 255, 255, 0.10)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  cancelBtnText_dark: {
    color: 'rgba(255, 255, 255, 0.70)',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  cancelBtnText_light: {
    color: '#2B2B2B',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  modalDeleteBtn: {
    display: 'flex',
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderRadius: 6,
    borderWidth: 1,
    flex: 1,
    borderStyle: 'solid',
    borderColor: '#CC1016',
    backgroundColor: '#CC1016',
  },
  modalDeleteBtnText: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.25,
    textTransform: 'capitalize',
  },
});
