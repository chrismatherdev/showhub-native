import { Platform, Dimensions } from 'react-native';

export function useDeviceProperties() {
  const ios = Platform.OS == 'ios';
  const topMargin = ios ? '' : ' mt-3';
  const verticalMargin = ios ? '' : ' my-3';

  var { width, height } = Dimensions.get('window');

  return {
    ios,
    width,
    topMargin,
    verticalMargin,
    height,
  };
}
