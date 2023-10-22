import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const ShowList = ({ title, data, hideSeeAll }) => {
  return (
    <StyledView className='mb-8 space-y-4'>
      <StyledView className='mx-4 flex-row justify-between items-center'>
        <Text>Show List</Text>
        <TouchableOpacity>
          <StyledText className='text-lg'>See all</StyledText>
        </TouchableOpacity>
      </StyledView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      ></ScrollView>
    </StyledView>
  );
};

export default ShowList;
