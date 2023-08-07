import React, {useState, useRef} from 'react';
import {Text, View, Pressable, FlatList, ActivityIndicator} from 'react-native';
import {styles} from './styles';
import Layout from '../../Layout';
import {useSelector} from 'react-redux';
import SearchBar from '../../components/SearchBar/SearchBar';
import PlusProfileIcon from '../../assets/svg/plus-profile.svg';
import Card from '../../components/Card/Card';
import {rippleConfig} from '../../utils';

import _ from 'lodash';
import {useQuery} from '@apollo/client';
import {getProfilesQuery} from '../../queries/profileQueries';
import {NetworkStatus} from '@apollo/client';
import AddEditProfile from '../../components/modals/AddEditProfile/AddEditProfile';
import DeleteProfile from '../../components/modals/DeleteProfile/DeleteProfile';

const Profiles = () => {
  const [search, setSearch] = useState('');
  const theme = useSelector(state => state.theme);
  const onEndReachedCalledDuringMomentum = useRef(true);

  const [page, setPage] = useState(0);
  const [sortBy] = useState('is_verified');
  const [sortOrder] = useState(-1);
  const [rows] = useState(10);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const {networkStatus, error, data, refetch, fetchMore} = useQuery(
    getProfilesQuery,
    {
      variables: {
        orderBy: {
          key: sortBy,
          sort: sortOrder === -1 ? 'desc' : 'asc',
        },
        rows: rows,
        page: page,
        searchString: search,
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  const debouncedRequest = _.debounce(function (value) {
    refetchhDetails(value);
  }, 500);

  function refetchhDetails(value) {
    refetch({
      page: 0,
      searchString: value,
    });
    setPage(0);
  }

  const handleAddProfile = () => {
    setShowAddModal(true);
  };

  const fetchMoreFunc = () => {
    if (
      data &&
      data?.getAllProfiles &&
      page * rows + rows < data?.getAllProfiles.size
    ) {
      let newPage = page + 1;

      setPage(pg => pg + 1);
      fetchMore({
        variables: {
          page: newPage,
        } /* ,
        updateQuery: (previousResult, {fetchMoreResult}) => {
          if (!fetchMoreResult) {
            return previousResult;
          }
          const newProfiles = fetchMoreResult.getAllProfiles.profiles;
          return {
            getAllProfiles: {
              __typename: 'ProfilesResponse',
              size: fetchMoreResult.getAllProfiles.size,
              profiles: [
                ...previousResult.getAllProfiles.profiles,
                ...newProfiles,
              ],
            },
          };
        }, */,
      });
    }
  };

  const handleClickMore = (type, profile) => {
    if (type === 'edit_profile') {
      setSelectedProfile(profile);
      setShowAddModal(true);
    }
    if (type === 'remove_profile') {
      setSelectedProfile(profile);
      setShowDeleteModal(true);
    }
  };

  const onDetailsUpdated = () => {
    refetch({
      orderBy: {
        key: sortBy,
        sort: sortOrder === -1 ? 'desc' : 'asc',
      },
      rows: 10,
      page: 0,
      searchString: search,
    });
    setPage(0);
  };

  const onChangeSearch = value => {
    setSearch(value);
    debouncedRequest(value);
  };

  const renderCardView = ({item, index}) => {
    return (
      <Card
        key={`${item.id}${index}`}
        onClickMore={handleClickMore}
        profile={item}
      />
    );
  };

  const listFooterComponent = () => {
    return data?.getAllProfiles.size !==
      _.size(data?.getAllProfiles.profiles) ? (
      <View style={{width: '100%', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 24,
        }}>
        <Text
          style={
            theme.mode === 'light'
              ? {color: '#212121'}
              : {color: 'rgba(255, 255, 255, 0.95)'}
          }>
          There are no more profiles at the moment
        </Text>
      </View>
    );
  };

  const listEmptyComponent = () => {
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={
          theme.mode === 'light'
            ? {color: '#212121'}
            : {color: 'rgba(255, 255, 255, 0.95)'}
        }>
        There are no profiles yet
      </Text>
    </View>;
  };

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.searchCreateContainer}>
          <SearchBar
            value={search}
            onChangeHandle={onChangeSearch}
            placeholder="Search"
            keyboardType="default"
          />
          <View style={styles.createContainer}>
            <Pressable
              android_ripple={rippleConfig}
              onPress={handleAddProfile}
              style={
                theme.mode === 'light'
                  ? styles.createProfileBtn_light
                  : styles.createProfileBtn_dark
              }>
              <PlusProfileIcon
                width="16"
                height="16"
                fill={
                  theme.mode === 'light'
                    ? '#3DACFF'
                    : 'rgba(255, 255, 255, 0.70)'
                }
              />
              <Text
                style={
                  theme.mode === 'light'
                    ? styles.createText_light
                    : styles.createText_dark
                }>
                Create Profile
              </Text>
            </Pressable>
          </View>
        </View>
        <View
          style={[
            styles.container,
            {paddingHorizontal: 0, paddingVertical: 0, width: '100%'},
          ]}>
          {error ? (
            <Text
              style={
                theme.mode === 'light'
                  ? styles.errorText_light
                  : styles.errorText_dark
              }>
              {JSON.stringify(error)}
            </Text>
          ) : networkStatus === NetworkStatus.loading ||
            networkStatus === NetworkStatus.refetch ? (
            <ActivityIndicator size="large" color="#3DACFF" />
          ) : (
            <FlatList
              style={{width: '100%'}}
              bounces={false}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.1}
              initialNumToRender={10}
              onMomentumScrollBegin={() => {
                onEndReachedCalledDuringMomentum.current = false;
              }}
              onEndReached={() => {
                if (!onEndReachedCalledDuringMomentum.current) {
                  if (
                    networkStatus !== NetworkStatus.loading &&
                    networkStatus !== NetworkStatus.refetch &&
                    networkStatus !== NetworkStatus.fetchMore
                  ) {
                    fetchMoreFunc();
                  }
                  onEndReachedCalledDuringMomentum.current = true;
                }
              }}
              data={data?.getAllProfiles?.profiles}
              renderItem={renderCardView}
              keyExtractor={(item, index) => `${item.id}${index}`}
              ListFooterComponent={listFooterComponent}
              progressViewOffset={36}
              ListEmptyComponent={listEmptyComponent}
            />
          )}
        </View>
        {showAddModal && (
          <AddEditProfile
            title="Create Profile"
            fields={selectedProfile ? selectedProfile : {}}
            onClose={() => {
              setSelectedProfile(null);
              setShowAddModal(false);
            }}
            onUpdateProfile={() => {
              setSelectedProfile(null);
              //onDetailsUpdated();
            }}
            onAddProfile={() => {
              setSelectedProfile(null);
              onDetailsUpdated();
            }}
            isEdit={selectedProfile ? true : false}
            isVisible={showAddModal}
          />
        )}
        {showDeleteModal && (
          <DeleteProfile
            title="Remove profile"
            bodyText="Removed profile will be deleted permenantly and won’t be available anymore."
            onCancel={() => {
              setSelectedProfile(null);
              setShowDeleteModal(false);
            }}
            onClose={() => {
              setSelectedProfile(null);
              setShowDeleteModal(false);
            }}
            selectedProfile={selectedProfile}
            onRemoveProfile={() => {
              setSelectedProfile(null);
              onDetailsUpdated();
            }}
            isVisible={showDeleteModal}
          />
        )}
      </View>
    </Layout>
  );
};

export default Profiles;
