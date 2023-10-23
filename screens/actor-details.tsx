import React, { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDeviceProperties } from '../hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchPersonDetails, fetchPersonMovies } from '../routes';
import { styled } from 'nativewind';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Loader } from '../components';
import { Person } from '../types/types';
import { image342 } from '../routes';
import SimilarList from '../components/similar-list';

const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const ActorDetails = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const { verticalMargin, height, width } = useDeviceProperties();

  const [loading, setLoading] = useState(false);
  const [isFavourite, toggleFavourite] = useState(false);
  const [person, setPerson] = useState<Person>();
  const [personMovies, setPersonMovies] = useState([]);

  const getPersonDetails = async (id: string) => {
    const data = await fetchPersonDetails(id);

    if (data) {
      setPerson(data);
      setLoading(false);
    }
  };

  const getPersonMovies = async (id: string) => {
    const data = await fetchPersonMovies(id);

    if (data && data.cast) {
      setPersonMovies(data.cast);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item?.id);
    getPersonMovies(item?.id);
  }, [item]);

  return (
    <StyledScrollView
      className='flex-1'
      contentContainerStyle={{ paddingBottom: 20, backgroundColor: '#1a202c' }}
    >
      <StyledSafeAreaView
        className={'flex-row justify-between items-center mx-4 z-10 ' + verticalMargin}
      >
        <StyledTouchableOpacity className='rounded-xl p-1' onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size='28' strokeWidth={2.5} color='white' />
        </StyledTouchableOpacity>

        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon size='35' color={isFavourite ? 'red' : 'white'} />
        </TouchableOpacity>
      </StyledSafeAreaView>

      <View>
        {loading ? (
          <Loader />
        ) : (
          <>
            <StyledView
              className='flex-row justify-center'
              style={{
                shadowColor: 'gray',
                shadowRadius: 40,
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 1,
              }}
            >
              <StyledView className='items-center rounded-full overflow-hidden h-72 w-72 border-neutral-800 border-2'>
                <StyledImage
                  source={
                    person && person?.profile_path
                      ? { uri: image342(person?.profile_path) }
                      : require('../assets/tmdb_logo.png')
                  }
                  style={{ height: height * 0.43, width: width * 0.74 }}
                />
              </StyledView>
            </StyledView>

            <StyledView className='mt-6'>
              <StyledText className='text-3xl text-white font-bold text-center'>
                {person?.name}
              </StyledText>
              <StyledText className='text-neutral-500 text-base text-center'>
                {person?.place_of_birth}
              </StyledText>
            </StyledView>

            <StyledView className='mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full '>
              <StyledView className='border-r-2 border-r-neutral-400 px-2 items-center'>
                <StyledText className='text-white font-semibold '>Gender</StyledText>
                <StyledText className='text-neutral-300 text-sm'>
                  {person?.gender == 1 ? 'Female' : 'Male'}
                </StyledText>
              </StyledView>
              <StyledView className='border-r-2 border-r-neutral-400 px-2 items-center'>
                <StyledText className='text-white font-semibold'>Birthday</StyledText>
                <StyledText className='text-neutral-300 text-sm'>{person?.birthday}</StyledText>
              </StyledView>
              <StyledView className='border-r-2 border-r-neutral-400 px-2 items-center'>
                <StyledText className='text-white font-semibold'>known for</StyledText>
                <StyledText className='text-neutral-300 text-sm'>
                  {person?.known_for_department}
                </StyledText>
              </StyledView>
              <StyledView className='px-2 items-center'>
                <StyledText className='text-white font-semibold'>Popularity</StyledText>
                <StyledText className='text-neutral-300 text-sm'>
                  {person?.popularity?.toFixed(2)} %
                </StyledText>
              </StyledView>
            </StyledView>
            <StyledView className='my-6 mx-4 space-y-2'>
              <StyledText className='text-white text-lg'>Biography</StyledText>
              <StyledText className='text-neutral-400 tracking-wide'>
                {person?.biography ? person.biography : 'N/A'}
              </StyledText>
            </StyledView>

            {person?.id && personMovies?.length > 0 && (
              <SimilarList title='Movies' hideSeeAll={true} data={personMovies} type='movie' />
            )}
          </>
        )}
      </View>
    </StyledScrollView>
  );
};

export default ActorDetails;
