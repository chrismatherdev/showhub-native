import React from 'react';
import { View, Image, Text, TouchableWithoutFeedback, FlatList, ViewStyle } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { useDeviceProperties } from '../hooks';
import { ShowResultType } from '../routes';

const StyledView = styled(View);
const StyledText = styled(Text);

type CarouselProps = {
  title: string;
  showType: string;
  data: ShowResultType;
};

type ShowCardProps = {
  item: ShowResultType[number];
  style?: React.CSSProperties;
  handleClick: (item: never) => void;
  isCarousel?: boolean;
};

const Carousel: React.FC<CarouselProps> = ({ title, showType, data }) => {
  const navigation = useNavigation();

  const handleClick = (item: never) => {
    if (showType === 'movies') {
      console.log('movies!!');
      navigation.navigate('MovieDetails' as never, item as never);
    } else if (showType === 'tv') {
      navigation.navigate('TvDetails' as never, item as never);
    }
  };

  if (!data || data.length === 0) {
    return (
      <StyledView className='mb-8'>
        <StyledText className='text-white text-xl mx-4 mb-5'>Loading...</StyledText>
      </StyledView>
    );
  }

  return (
    <StyledView className='mb-2 border border-gray-800 rounded-md p-2'>
      <StyledText className='text-white font-bold text-lg mx-4 mb-3'>{title}</StyledText>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <ShowCard
            item={item}
            style={{ marginRight: 25 }}
            handleClick={handleClick}
            isCarousel={true}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </StyledView>
  );
};

export const ShowCard: React.FC<ShowCardProps> = ({ item, style, handleClick, isCarousel }) => {
  const { width } = useDeviceProperties();
  const showTitle = item.title ? item.title : item?.original_name ? item.original_name : null;

  const maxLength = isCarousel ? 16 : 12;
  const reducedTitle =
    showTitle && showTitle.length > maxLength
      ? showTitle.substring(0, maxLength) + '...'
      : showTitle;

  const dynamicStyle = isCarousel
    ? { width: width * 0.55, marginRight: 25 }
    : { width: width * 0.43, marginRight: 5 };

  return (
    <StyledView style={[style as ViewStyle, dynamicStyle]}>
      <View
        style={{
          flex: 1,
          padding: isCarousel ? 15 : 10,
          height: 325,
          marginBottom: 10,
          backgroundColor: '#1a202c',
          borderRadius: isCarousel ? 20 : 10,
          overflow: 'hidden',
        }}
      >
        <TouchableWithoutFeedback onPress={() => handleClick(item as never)}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
            style={{ width: '100%', height: 250, borderRadius: 20, marginBottom: 10 }}
            resizeMode='cover'
          />
        </TouchableWithoutFeedback>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 14, marginVertical: 5, marginRight: 30 }}>
            {reducedTitle}
          </Text>
          <View
            style={{
              position: 'absolute',
              bottom: 5,
              right: 5,
              backgroundColor: '#ca8a04',
              borderRadius: 50,
              padding: 5,
              width: 38,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              {item.vote_average && item.vote_average !== 0 ? item.vote_average.toFixed(1) : 'NR'}
            </Text>
          </View>
        </View>
      </View>
    </StyledView>
  );
};

export default Carousel;
