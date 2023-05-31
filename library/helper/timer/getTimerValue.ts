import { TimerType } from '../../zustand/types/@types';
// logic for converting time are all here

export function getProgressPercentage(value: number, timer: TimerType) {
   const sessionTime = value * 60;
   const totalSeconds = timer.minutes * 60 + timer.seconds;
   return totalSeconds / sessionTime;
}

export function formatTime(date: Date | null) {
   if (date !== null) {
      const getHours = date.getHours();
      const meridiem = getHours > 12 ? 'pm' : 'am';
      const hours =
         getHours > 12 ? String(getHours - 12).padStart(2, '0') : String(getHours).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return {
         time: `${hours}:${minutes}`,
         meridiem,
      };
   }
}

export function formatDate(date: Date) {
   const month = String(date.getMonth() + 1).padStart(2, '0');
   const day = String(date.getDate()).padStart(2, '0');
   const year = date.getFullYear();

   const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Frid', 'Sat'];
   const dayOfWeek = days[date.getDay()];

   return `${month}-${day}-${year} (${dayOfWeek})`;
}

export function formatTimer(timer: TimerType) {
   const hours = timer.hours.toString().padStart(2, '0');
   const minutes = timer.minutes.toString().padStart(2, '0');

   return `${hours}:${minutes}`;
}

// Date object is returning { NaN } and had to manually parse date
// to get the date object
export function convertDateFormat(dateString: string): Date {
   const getDate = new Date(dateString);
   // if date object is not NaN then return getDate
   if (Number.isNaN(getDate.getHours())) {
      const [datePart, timePart, period] = dateString.split(/[, ]+/);
      const [month, day, year] = datePart.split('/').map(Number);
      const [hour, minute, second] = timePart.split(':').map(Number);

      const adjustedHour =
         period === 'PM' && hour !== 12 ? hour + 12 : hour === 12 && period === 'AM' ? 0 : hour;

      const paddedMonth = month.toString().padStart(2, '0');
      const paddedDay = day.toString().padStart(2, '0');
      const paddedHour = adjustedHour.toString().padStart(2, '0');
      const paddedMinute = minute.toString().padStart(2, '0');
      const paddedSecond = second.toString().padStart(2, '0');

      const getDate = `${year}-${paddedMonth}-${paddedDay}T${paddedHour}:${paddedMinute}:${paddedSecond}`;

      return new Date(getDate);
   }
   return getDate;
}
