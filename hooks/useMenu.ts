import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export function useMenu() {
  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);

  const handleMenuPress = (route: string, showType?: string) => {
    navigation.navigate(route as never, showType as never);
    setMenuVisible(false);
  };

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  return {
    isMenuVisible,
    setMenuVisible,
    toggleMenu,
    closeMenu,
    handleMenuPress,
  };
}
