import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Menu = ({ setMenuVisible }) => {
  const navigation = useNavigation();

  const handleMenuPress = (route: string, showType?: string) => {
    navigation.navigate(route as never, showType as never);
    setMenuVisible(false);
  };

  const handleClosePress = () => {
    setMenuVisible(false);
  };

  return (
    <View
      style={{
        position: 'absolute',
        top: 70,
        left: 0,
        width: '75%',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingTop: 20,
        elevation: 3,
      }}
    >
      <TouchableOpacity
        onPress={handleClosePress}
        style={{ position: 'absolute', top: 10, right: 10 }}
      >
        <Text style={{ fontSize: 14, color: 'blue' }}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' }}
        onPress={() => handleMenuPress('Home')}
      >
        <Text style={{ fontSize: 16, color: '#333' }}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' }}
        onPress={() => handleMenuPress('AllShows', 'movies')}
      >
        <Text style={{ fontSize: 16, color: '#333' }}>Movies</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' }}
        onPress={() => handleMenuPress('AllShows', 'tv')}
      >
        <Text style={{ fontSize: 16, color: '#333' }}>TV Series</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;
