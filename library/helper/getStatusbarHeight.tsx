import { Platform, StatusBar, SafeAreaView, Dimensions } from 'react-native';

const getStatusBarHeight = () => {
   return Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : StatusBar.currentHeight;
};

const isIphoneX = () => {
   const dimen = Dimensions.get('window');
   return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      (dimen.height === 812 || dimen.width === 812 || dimen.height === 896 || dimen.width === 896)
   );
};
const StatusBarHeight = getStatusBarHeight();
export default StatusBarHeight;
