import React from 'react';
import { Image, View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const Footer = () => {
  return (
    <StyledView
      style={{
        backgroundColor: '#1a202c',
        padding: 55,
        alignItems: 'center',
      }}
    >
      <StyledText style={{ color: 'white', fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}>
        ShowHub
      </StyledText>
      <Image
        source={require('../assets/tmdb_logo.png')}
        style={{ width: '70%', height: 70, borderRadius: 20 }}
        resizeMode='cover'
      />
    </StyledView>
  );
};

export default Footer;
