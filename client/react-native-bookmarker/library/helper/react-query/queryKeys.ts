const queryKeys = {
   books: ['books'] as const,
   bookLibrary: ['booklibrary'] as const,
   deleted: ['deleted'] as const,
   primary: ['booklibrary', 'primary'] as const,
   want: ['booklibrary', 'reading'] as const,
   finished: ['booklibrary', 'finished'] as const,
   currentlyReading: ['bookLibrary', 'currentlyReading'] as const,
   singleBook: (bookId: string) => ['singebook', { bookId }] as const,
   // may change this value here
   notRecording: () => [...queryKeys.primary, { recording: false }],
   recording: (uid: string) => [...queryKeys.currentlyReading, { recording: true }, { uid }],
   bookSearch: (search: string) => [...queryKeys.books, { search }] as const,
   userId: (id: string) => [...queryKeys.books, { id: id }] as const,
   userLibrary: (userId: string) => [...queryKeys.bookLibrary, { userId }] as const,
   timer: (uid: string, ms: number | undefined) => ['timer', { ms, uid: uid }] as const,
};

export default queryKeys;
