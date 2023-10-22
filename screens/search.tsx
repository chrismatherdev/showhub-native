import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { debounce } from 'lodash';
import Navbar from '../components/navbar';
import { searchMovies } from '../routes';
import { useNavigation } from '@react-navigation/native';
import { useMenu } from '../hooks';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShowResultType } from '../routes';
import { ShowCard } from '../components/carousel';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledText = styled(Text);

const Search = () => {
  const navigation = useNavigation();
  const { setMenuVisible } = useMenu();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ShowResultType>([]);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm && searchTerm.length > 2) {
      setLoading(true);
      searchMovies({
        query: searchTerm,
        include_adult: false,
        language: 'en-US',
        page: '1',
      }).then((data) => {
        setLoading(false);
        if (data && data.results) setResults(data.results);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <>
      <StyledSafeAreaView style={{ flex: 1, backgroundColor: 'rgb(15 23 42)' }}>
        <View style={{ marginBottom: 20 }}>
          <Navbar setMenuVisible={setMenuVisible} />
        </View>
        {/* search input */}
        <StyledView className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-700 rounded-full'>
          <StyledTextInput
            onChangeText={handleTextDebounce}
            placeholder='Find your show...'
            placeholderTextColor='lightgray'
            className='pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider'
          />
          <StyledTouchableOpacity className='rounded-full p-2 m-1 bg-neutral-600'>
            <XMarkIcon size='25' color='white' />
          </StyledTouchableOpacity>
        </StyledView>

        {/* search results */}
        {loading ? (
          <Text>Loading...</Text>
        ) : results.length > 0 ? (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginLeft: 20 }}>
              <StyledView className='border border-neutral-400 p-2 rounded-md'>
                <StyledText className='text-neutral-400 font-semibold text-sm text-center'>
                  Results ({results.length})
                </StyledText>
              </StyledView>
            </View>
            <View style={{ padding: 20, flex: 1 }}>
              <ScrollView style={{ marginBottom: 20 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                  }}
                >
                  {results?.map((show, index) => (
                    <ShowCard
                      key={index}
                      item={show}
                      isCarousel={false}
                      handleClick={(item) => {
                        // Handle click logic here
                        navigation.navigate('MovieDetails' as never, item as never);
                      }}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>
          </>
        ) : (
          <View></View>
        )}
      </StyledSafeAreaView>
    </>
  );
};

export default Search;
