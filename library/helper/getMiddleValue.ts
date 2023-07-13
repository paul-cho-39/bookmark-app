import { Dimensions, Platform } from 'react-native';
import Config from '../config';

const { width, height } = Dimensions.get('window');

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

const IMAGE_HEIGHT = Config.HOME_IMAGE_HEIGHT;
const IMAGE_WIDTH = Config.HOME_IMAGE_WIDTH;
const CONTAINER_HEIGHT = height * 0.35;
const MODAL_WIDTH = width - Config.DEFAULT_MARGIN_HORIZONTAL * 2;
const PADDING_NUM = Config.HOME_PADDING;

function getMiddleValue() {
   const y = CONTAINER_HEIGHT - IMAGE_HEIGHT;
   const middle = 0.5 * IMAGE_HEIGHT + y - PADDING_NUM;
   return middle;
}

export {
   width,
   height,
   IMAGE_HEIGHT,
   IMAGE_WIDTH,
   CONTAINER_HEIGHT,
   MODAL_WIDTH,
   PADDING_NUM,
   getMiddleValue,
   SCREEN_WIDTH,
   SCREEN_HEIGHT,
};
