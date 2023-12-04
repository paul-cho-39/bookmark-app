export default function getLinearInterpolation(
   value: number,
   maxValue: number,
   minThresholdPercentage: number,
   maxThresholdPercentage: number
) {
   value = value === 0 ? 1 : value;
   const progress = value / maxValue;

   // Linear interpolation to calculate the dynamic threshold
   const thresholdPercentage =
      minThresholdPercentage + (maxThresholdPercentage - minThresholdPercentage) * progress;
   // maxThresholdPercentage - (maxThresholdPercentage - minThresholdPercentage) * progress;
   const threshold = maxValue * thresholdPercentage;
   return threshold;
}

// linear interpolation changes the threshold dynamically depending on the current value
// if the value is lower the lower the threshold and as the value increases so does the threshold

// the inverse linear interpolation is the exact opposite
