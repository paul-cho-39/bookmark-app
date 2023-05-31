import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface TimerStatusProps {
   isPaused: boolean;
}

const TimerStatus = ({ isPaused }: TimerStatusProps) => {
   return (
      <Text variant='labelMedium' style={styles.status}>
         {!isPaused ? 'currently reading' : 'paused'}
      </Text>
   );
};

const styles = StyleSheet.create({
   status: {
      textAlign: 'center',
      textTransform: 'uppercase',
   },
});

export default TimerStatus;
