import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

interface ProgressBarProps {
   progress: number;
   size: number;
   width: number;
   fillColor: string;
   strokeColor: string;
}
const CircularProgressBar = ({
   progress,
   size,
   width,
   fillColor,
   strokeColor,
}: ProgressBarProps) => {
   const radius = (size - width) / 2;
   const circumference = 2 * Math.PI * radius;
   const progressStrokeDashoffset = circumference - progress * circumference;

   return (
      <Svg width={size} height={size} style={styles.container} testID='circular-progress-bar'>
         <G rotation='-90' origin={`${size / 2}, ${size / 2}`} fill={fillColor} fillOpacity={0.55}>
            <Path
               stroke={strokeColor}
               strokeOpacity={0.6}
               strokeWidth={width}
               strokeLinecap='round'
               strokeLinejoin='round'
               strokeDasharray={`${circumference}, ${circumference}`}
               strokeDashoffset={progressStrokeDashoffset}
               d={`M ${size / 2}, ${width / 2} A ${radius} ${radius} 0 1 1 ${size / 2 - 0.01} ${
                  width / 2
               }`}
            />
         </G>
      </Svg>
   );
};

const styles = StyleSheet.create({
   container: {
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{ rotateZ: '90deg' }],
   },
   gradient: {
      width: '100%',
      height: '100%',
      opacity: 0,
   },
});

export default CircularProgressBar;
