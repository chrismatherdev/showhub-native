import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { fetchSimilarTv, fetchTvDetails, fetchTvCredits, ShowResultType } from '../routes';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import { styled } from 'nativewind';
import { HeartIcon as HeartIconSolid } from 'react-native-heroicons/solid';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ShowCast, SimilarList } from '../components';
import { SimilarTv, Details } from '../types/types';
import { useDeviceProperties } from '../hooks';
import { styles } from '../styles/styles';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);
const StyledText = styled(Text);

const TvDetails = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [similar, setSimilar] = useState<SimilarTv[]>([]);
  const [details, setDetails] = useState<Details | null>(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favourited, toggleFavourited] = useState(false);
  const { topMargin } = useDeviceProperties();
  const imageUrl = `https://image.tmdb.org/t/p/w500${details?.poster_path}`;

  const getTvDetails = async (item: ShowResultType) => {
    const data = await fetchTvDetails(item.id);
    if (data) {
      setDetails({ ...details, ...data });
    }
  };

  const getTvCast = async (item: ShowResultType) => {
    const data = await fetchTvCredits(item.id);
    if (data && data.cast) {
      setCast(data.cast);
    }
  };

  const getSimilarTv = async (item: ShowResultType) => {
    const data = await fetchSimilarTv(item.id);
    if (data && data.results) {
      setSimilar(data.results);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getTvDetails(item);
      await getTvCast(item);
      await getSimilarTv(item);
      setLoading(false);
    };

    fetchData();
  }, [item]);

  return (
    <StyledScrollView
      contentContainerStyle={{ paddingBottom: 20, backgroundColor: '#1a202c' }}
      className='flex-1 bg-neutral-700'
    >
      <StyledView className='w-full'>
        <StyledSafeAreaView
          className={'absolute z-20 w-full flex-row justify-between items-center px-4' + topMargin}
        >
          <StyledTouchableOpacity className='rounded-xl p-1' onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size='28' strokeWidth={2.5} color='white' />
          </StyledTouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavourited(!favourited)}>
            {favourited ? (
              <HeartIconSolid size='35' color='white' />
            ) : (
              <HeartIcon size='35' color='white' />
            )}
          </TouchableOpacity>
        </StyledSafeAreaView>
        <View style={styles.container}>
          <Image source={{ uri: imageUrl }} style={styles.poster} resizeMode='cover' />
        </View>
      </StyledView>

      <StyledView className='space-y-3'>
        <StyledView className='mb-2 border border-gray-800 rounded-md p-2'>
          <StyledText className='text-white text-center text-xl font-bold tracking-wider mb-1'>
            {details?.original_name}
          </StyledText>

          <StyledText className='text-neutral-400 text-md font-semibold text-base mb-2 text-center'>
            Released -{' '}
            {details?.first_air_date ? new Date(details.first_air_date).getFullYear() : 'N/A'}
          </StyledText>
        </StyledView>

        <StyledText className='text-neutral-400 mx-4 tracking-wide'>{details?.overview}</StyledText>

        {details?.id && cast.length > 0 && <ShowCast navigation={navigation} cast={cast} />}

        {details?.id && similar?.length > 0 && (
          <SimilarList title={'Similar Movies'} hideSeeAll={true} data={similar} type='tv' />
        )}
      </StyledView>
    </StyledScrollView>
  );
};

export default TvDetails;
