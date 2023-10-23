import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDeviceProperties } from '../hooks';
import { image185 } from '../routes';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

export default function SimilarList({ title, hideSeeAll, data, type }) {
  const navigation = useNavigation();
  const { width, height } = useDeviceProperties();

  return (
    <StyledView className='mb-2 border border-gray-800 rounded-md p-4 my-6 bg-dark-700'>
      <StyledView className='flex-row justify-between items-center mb-3'>
        <StyledText className='text-white font-bold text-lg'>{title}</StyledText>
        {!hideSeeAll && (
          <TouchableOpacity>
            <StyledText className='text-lg text-accent'>See All</StyledText>
          </TouchableOpacity>
        )}
      </StyledView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          const titleProperty = type === 'movie' ? 'title' : 'original_name';

          const truncatedTitle =
            item[titleProperty].length > 14
              ? item[titleProperty].substring(0, 14) + '...'
              : item[titleProperty];

          return (
            <TouchableWithoutFeedback
              key={item?.id}
              onPress={() => navigation.navigate('MovieDetails' as never, item as never)}
            >
              <StyledView className='space-y-2 mr-4 bg-dark-800 p-2 rounded-md'>
                <StyledImage
                  source={{ uri: item?.poster_path && image185(item.poster_path) }}
                  className='rounded-md'
                  style={{ width: width * 0.33, height: height * 0.22 }}
                />
                <StyledText className='text-white text-sm font-semibold' numberOfLines={2}>
                  {truncatedTitle}
                </StyledText>
              </StyledView>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </StyledView>
  );
}
