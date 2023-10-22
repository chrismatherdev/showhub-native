import { StyleSheet } from 'react-native';
import { useDeviceProperties } from '../hooks';

const { width, height } = useDeviceProperties();

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 6,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    marginVertical: 2,
    borderWidth: 2,
    borderColor: 'rgb(31 41 55)',
    padding: 100,
  },
  poster: {
    width: width - 60,
    height: height * 0.55,
    borderRadius: 20,
  },
});
