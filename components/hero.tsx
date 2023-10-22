import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const Hero = () => {
  return (
    <StyledView
      style={{
        paddingVertical: 60,
        paddingHorizontal: 10,
        backgroundColor: '#1a202c',
        marginBottom: 15,
        margin: 0,
      }}
    >
      <StyledText style={{ fontSize: 8, marginBottom: 4, color: 'white' }}>
        Welcome to ShowHub
      </StyledText>
      <StyledText style={{ fontSize: 22, marginBottom: 4, color: 'white' }}>
        Discover movies and TV Series
      </StyledText>
      <StyledText style={{ fontSize: 8, color: 'white' }}>
        View a wide variety of shows including trending, popular, and top-rated.
      </StyledText>
    </StyledView>
  );
};

export default Hero;
