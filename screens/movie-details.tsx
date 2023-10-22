import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { fetchMovieDetails, fetchMovieCredits, fetchSimilarMovies } from '../routes';
import Loader from '../components/loader';
import { useRoute, useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import { HeartIcon as HeartIconSolid } from 'react-native-heroicons/solid';
import ShowCast from '../components/show-cast';
import SimilarList from '../components/similar-list';
import { SimilarMovie, ShowDetails } from '../types/types';
import { styles } from '../styles/styles';
import { useDeviceProperties } from '../hooks';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);
const StyledText = styled(Text);

const MovieDetails = () => {
  const { params: item } = useRoute();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { topMargin } = useDeviceProperties();
  const [details, setDetails] = useState<ShowDetails | null>(null);
  const [cast, setCast] = useState([]);
  const [similarShows, setSimilarShows] = useState<SimilarMovie[]>([]);
  const [favourited, toggleFavourited] = useState(false);
  const imageUrl = `https://image.tmdb.org/t/p/w500${details?.poster_path}`;

  const fetchData = async (endpoint, state) => {
    try {
      const data = await endpoint;

      if (data && data.results) {
        state(data.results);
      } else if (data && data.cast) {
        state(data.cast);
      } else if (data) {
        state({ ...details, ...data });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData(fetchMovieDetails(item?.id), setDetails);
    fetchData(fetchMovieCredits(item?.id), setCast);
    fetchData(fetchSimilarMovies(item?.id), setSimilarShows);
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

        {loading ? (
          <Loader />
        ) : (
          <View style={styles.container}>
            <Image source={{ uri: imageUrl }} style={styles.poster} resizeMode='cover' />
          </View>
        )}
      </StyledView>

      <StyledView className='space-y-3'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <StyledView className='mb-2 border border-gray-800 rounded-md p-2'>
              <StyledText className='text-white text-center text-xl font-bold tracking-wider mb-1'>
                {details?.original_title}
              </StyledText>

              <StyledText className='text-neutral-400 text-md font-semibold text-base mb-2 text-center'>
                Released -{' '}
                {details?.release_date ? new Date(details.release_date).getFullYear() : 'N/A'}
              </StyledText>
              <StyledView className='flex-row justify-center mx-4 space-x-2'>
                {details?.genres?.map((genre, index) => {
                  return (
                    <StyledView className='border border-neutral-400 p-2 rounded-md'>
                      <StyledText
                        key={index}
                        className='text-neutral-400 font-semibold text-sm text-center'
                      >
                        {genre?.name}
                      </StyledText>
                    </StyledView>
                  );
                })}
              </StyledView>
            </StyledView>
            <StyledText className='text-neutral-400 mx-4 tracking-wide'>
              {details?.overview}
            </StyledText>

            {details?.id && cast?.length > 0 && <ShowCast navigation={navigation} cast={cast} />}

            {details?.id && similarShows?.length > 0 && (
              <SimilarList
                title={'Similar Movies'}
                hideSeeAll={true}
                data={similarShows}
                type='movie'
              />
            )}
          </>
        )}
      </StyledView>
    </StyledScrollView>
  );
};

export default MovieDetails;
