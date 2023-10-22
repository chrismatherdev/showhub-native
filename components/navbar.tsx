import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { useDeviceProperties } from '../hooks';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);

const Navbar = ({ setMenuVisible }: { setMenuVisible: (arg: boolean) => void }) => {
  const navigation = useNavigation();
  const { ios } = useDeviceProperties();

  const toggleMenu = () => {
    setMenuVisible(true);
  };

  return (
    <StyledSafeAreaView
      className={ios ? '-mb-2' : '-mb-4'}
      style={{
        borderBottomWidth: 0.25,
        borderBottomColor: 'darkgray',
      }}
    >
      <StyledView
        className={ios ? '-mb-2' : '-mb-4'}
        style={{
          padding: 22,
        }}
      >
        <StatusBar style='light' />
        <StyledView className='flex-row justify-between items-center mx-4'>
          <TouchableOpacity onPress={toggleMenu}>
            <Bars3CenterLeftIcon size={25} strokeWidth={2} color='white' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
            <StyledText className='text-white text-3xl font-bold'>ShowHub</StyledText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Search' as never)}>
            <MagnifyingGlassIcon size='25' strokeWidth={2} color='white' />
          </TouchableOpacity>
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
};

export default Navbar;
