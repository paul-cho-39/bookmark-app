enum Mode {
   SMALL = 'small',
   LARGE = 'large',
}
enum PageParamKeys {
   FROM = 'pageFrom',
   TO = 'pageTo',
}

enum PublishedNoteType {
   PUBLIC = 'PUBLIC NOTE',
   PRIVATE = 'PRIVATE NOTE',
}

enum NotesFontSize {
   ExtraSmall = 10,
   Emall = 12,
   Medium = 16,
   Large = 20,
   ExtraLarge = 24,
}

enum NoteDarkColor {
   Default = '#E3E2E6',
   DarkOrange = '#FF8C00',
   Chocolate = '#D2691E',
   DarkGoldenrod = '#B8860B',
   DarkViolet = '#9400D3',
   Indigo = '#4B0082',
   DarkRed = '#8B0000',
   Firebrick = '#B22222',
   DeepPink = '#FF1493',
}

enum NoteLightColor {
   Default = '#FEFBFF',
   PaleOrange = '#FFEDCC',
   PaleChocolate = '#ECD9C6',
   PaleGoldenrod = '#FAFAD2',
   Thistle = '#D8BFD8',
   PaleIndigo = '#9FA8DA',
   MistyRose = '#FFE4E1',
   Linen = '#FAF0E6',
   PinkLace = '#FFDDF4',
}

const CONTENT = {
   DEFAULT_TITLE: 'Title',
};

export {
   Mode,
   PageParamKeys,
   PublishedNoteType,
   NotesFontSize,
   NoteDarkColor,
   NoteLightColor,
   CONTENT,
};
