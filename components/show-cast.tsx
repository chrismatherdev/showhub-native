import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
// import { fallbackPersonImage, image185, image342 } from '../api/moviedb';
import { image185 } from '../routes';
var { width, height } = Dimensions.get('window');
import { styled } from 'nativewind';

export default function ShowCast({ cast, navigation }) {
  const StyledView = styled(View);
  const StyledText = styled(Text);
  const StyledTouchableOpacity = styled(TouchableOpacity);
  const StyledImage = styled(Image);

  return (
    <StyledView className='mb-2 border border-gray-800 rounded-md p-2 my-6'>
      <StyledText className='text-white font-bold text-lg mx-4 mb-3'>Top Cast</StyledText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((actor, index) => {
            return (
              <StyledTouchableOpacity
                key={index}
                onPress={() => navigation.navigate('ActorDetails', actor)}
                className='mr-4 items-center'
              >
                <StyledView className='overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500'>
                  <StyledImage
                    className='rounded-2xl h-24 w-20'
                    // source={require('../assets/images/castImage1.png')}
                    source={{ uri: actor?.profile_path && image185(actor.profile_path) }}
                  />
                </StyledView>

                <StyledText className='text-white text-xs mt-1'>
                  {actor?.character.length > 10
                    ? actor.character.slice(0, 10) + '...'
                    : actor?.character}
                </StyledText>
                <StyledText className='text-neutral-400 text-xs'>
                  {actor?.original_name.length > 10
                    ? actor.original_name.slice(0, 10) + '...'
                    : actor?.original_name}
                </StyledText>
              </StyledTouchableOpacity>
            );
          })}
      </ScrollView>
    </StyledView>
  );
}
