import {
   setDefaultReadingSessionTime,
   setAverageReadingPace,
   setMaxValuePage,
} from './timeSettings';
import { setUserTimeZone } from './generalSettings';

// for notification in the general settings if this is turned off
// then shouldNotifyUserAfterCountdown HAS TO BE OFF too
// so whenever toggling false, HAVE to change shouldNottifyUserAfterCountDown

export { setUserTimeZone, setDefaultReadingSessionTime, setAverageReadingPace, setMaxValuePage };
