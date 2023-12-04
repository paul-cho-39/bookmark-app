export default function getPageString(value: string, maxValue: number | undefined) {
   const parsedValue = parseInt(value);
   const safeParsedValue = Number.isNaN(parsedValue) ? 0 : parsedValue;
   const valueInPercent = maxValue && Math.round((safeParsedValue / maxValue) * 100);
   const text = 'Page: ' + Math.round(safeParsedValue) + '\t' + '/' + '\t\t' + valueInPercent + '%';
   return { parsedValue, text };
}
