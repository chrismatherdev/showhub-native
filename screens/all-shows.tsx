import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { MOVIE_ROUTES, TV_ROUTES, ShowResultType } from '../routes';
import { ShowCard } from '../components/carousel';
import { useNavigation } from '@react-navigation/native';
import { Menu, Loader, Navbar } from '../components';
import { useMenu } from '../hooks';
import { useRoute } from '@react-navigation/native';

const StyledView = styled(View);

const genreOptions = [
  'All',
  'Action',
  'Drama',
  'Comedy',
  'Documentary',
  'Adventure',
  'Sci-Fi',
  'Horror',
  'Romance',
  'Thriller',
];

const AllShows = () => {
  const { params: showType } = useRoute();
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;
  const navigation = useNavigation();
  const [shows, setShows] = useState<ShowResultType[]>([]);
  const { isMenuVisible, setMenuVisible } = useMenu();

  const handleFilterChange = (newFilter: string) => {
    if (newFilter) {
      setFilter(newFilter);
      setCurrentPage(1);
    }
  };

  const getGenreId = (genreName: string) => {
    const genreMap = {
      All: null,
      Action: 28,
      Adventure: 12,
      Animation: 16,
      Comedy: 35,
      Crime: 80,
      Drama: 18,
      Family: 10751,
      Fantasy: 14,
      History: 36,
      Horror: 27,
      Music: 10402,
      Mystery: 9648,
      'Sci-Fi': 878,
      Romance: 10749,
      Thriller: 53,
      War: 10752,
    };

    return genreMap[genreName];
  };

  const filteredShows =
    filter === 'All'
      ? shows
      : shows?.filter((show) => show?.genre_ids?.includes(getGenreId(filter)));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedShows = filteredShows?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredShows?.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const ROUTES = showType === 'movies' ? MOVIE_ROUTES : showType === 'tv' ? TV_ROUTES : [];

  async function fetchShows() {
    setLoading(true);
    try {
      const responses = await axios.all(ROUTES.map((route) => axios.get(route)));
      const showResponse = responses.flatMap((response) => response.data.results);

      setShows(showResponse);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching shows:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchShows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledView className='flex-1 bg-slate-900'>
      {isMenuVisible && <Menu setMenuVisible={setMenuVisible} />}
      {!isMenuVisible && (
        <>
          <Navbar setMenuVisible={setMenuVisible} />
          <View style={{ padding: 20, flex: 1 }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 20 }}
            >
              {genreOptions?.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleFilterChange(option)}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 20,
                    backgroundColor: filter === option ? '#4CAF50' : '#333',
                    marginRight: 10,
                  }}
                >
                  <Text style={{ color: 'white' }}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <ScrollView style={{ marginBottom: 20 }}>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                    }}
                  >
                    {paginatedShows?.map((show, index) => (
                      <>
                        <ShowCard
                          key={index}
                          item={show}
                          isCarousel={false}
                          handleClick={(item) => {
                            navigation.navigate(
                              showType === 'movies' ? 'MovieDetails' : 'TvDetails',
                              item
                            );
                          }}
                        />
                      </>
                    ))}
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                    {pageNumbers.map((pageNumber) => (
                      <TouchableOpacity
                        key={pageNumber}
                        onPress={() => setCurrentPage(pageNumber)}
                        style={{
                          padding: 10,
                          marginHorizontal: 5,
                          backgroundColor: currentPage === pageNumber ? '#4CAF50' : '#333',
                          borderRadius: 20,
                        }}
                      >
                        <Text style={{ color: 'white' }}>{pageNumber}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </>
      )}
    </StyledView>
  );
};

export default AllShows;
