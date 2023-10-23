import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ScrollView, View } from 'react-native';
import { styled } from 'nativewind';
import { Carousel, Footer, Hero, Loader, Menu, Navbar } from '../components';
import { HOMEPAGE_ROUTES } from '../routes';
import { useMenu } from '../hooks';

const StyledView = styled(View);

const Homepage = () => {
  const [loading, setLoading] = useState(false);
  const [homepageShows, setHomepageShows] = useState({
    movies: [],
    topRatedMovies: [],
    tv: [],
    topRatedTv: [],
  });
  const { isMenuVisible, setMenuVisible } = useMenu();

  async function fetchHomepageShows() {
    setLoading(true);
    axios.all(HOMEPAGE_ROUTES.map((route) => axios.get(route))).then((info) => {
      const showResponse = [];

      for (let i = 0; i < info.length; i++) {
        showResponse.push(info[i].data.results as never);
      }

      setHomepageShows({
        movies: showResponse[0],
        tv: showResponse[1],
        topRatedMovies: showResponse[2],
        topRatedTv: showResponse[3],
      });
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchHomepageShows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledView className='flex-1 bg-slate-900'>
      {isMenuVisible && <Menu setMenuVisible={setMenuVisible} />}
      {!isMenuVisible && (
        <>
          <Navbar setMenuVisible={setMenuVisible} />
          <Hero />
          {loading && <Loader />}
          {!loading && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 10 }}
            >
              <Carousel data={homepageShows?.movies} title='Trending Movies' showType='movies' />
              <Carousel
                data={homepageShows?.topRatedMovies}
                title='Top Rated Movies'
                showType='movies'
              />
              <Carousel data={homepageShows?.tv} title='Trending TV' showType='tv' />
              <Carousel data={homepageShows?.topRatedTv} title='Top Rated TV' showType='tv' />
              <Footer />
            </ScrollView>
          )}
        </>
      )}
    </StyledView>
  );
};

export default Homepage;
