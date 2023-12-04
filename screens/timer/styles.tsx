import { StyleSheet } from 'react-native';
import { height as HEIGHT, width as WIDTH } from '../../library/helper';

const SLIDER_WIDTH = 0.9;
const SLIDER_MARGIN = (1 - SLIDER_WIDTH) / 2;
const BOTTOM_TOP = 0.525;

const MIN_MAX_WIDTH = SLIDER_WIDTH - 0.07;
const MIN_MAX_MARGIN = (1 - MIN_MAX_WIDTH) / 2;

const SESSION_ICON_MARGIN_RIGHT = 25;
const ANIMATION_MARGIN_RIGHT = SESSION_ICON_MARGIN_RIGHT + 10;

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   bottomContainer: {
      position: 'relative',
      top: HEIGHT * BOTTOM_TOP,
   },
   titleContainer: {
      position: 'relative',
      paddingHorizontal: 20,
      paddingBottom: 5,
      marginBottom: 15,
   },
   saveSession: {
      position: 'absolute', // stay at the same level with title
      right: 0,
      top: -5,
      padding: 5,
      marginLeft: 10,
      marginRight: SESSION_ICON_MARGIN_RIGHT,
   },
   modalContainer: {
      paddingTop: 20,
      bottom: 20,
   },
   animatedIcon: {
      marginRight: ANIMATION_MARGIN_RIGHT,
   },
   slider: {
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      marginHorizontal: WIDTH * SLIDER_MARGIN,
      width: WIDTH * SLIDER_WIDTH,
      // backgroundColor: 'red',
   },
   toolTip: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 5,
      borderRadius: 4,
      marginRight: WIDTH * SLIDER_MARGIN * 1.7,
   },
   displayPageWrapper: {
      alignItems: 'center',
      paddingVertical: 5,
      marginBottom: 0,
   },
   iconButtonsWrapper: {
      position: 'relative',
      bottom: 32,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignSelf: 'flex-start',
      width: WIDTH,
   },
   minMaxValue: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: WIDTH * MIN_MAX_WIDTH,
      marginHorizontal: WIDTH * MIN_MAX_MARGIN,
   },
});

export default styles;
