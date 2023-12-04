type AddBookParam = 'rer';

const getUrl = {
   library: {
      directory: 'library',
      file: {
         middleware: 'authenticate',
         getBooks: {
            thumbnail: (id: string) => `/${getUrl.library.directory}/thumbnail/${id}`,
            currentBooks: (uid: string) => `/${getUrl.library.directory}/current/${uid}`,
            allBooks: (uid: string) => `/${getUrl.library.directory}/books/${uid}`,
         },
         editBooks: {
            editPrimary: (uid: string, id: string) =>
               `/${getUrl.library.directory}/edit/${uid}/${id}/edit-primary`,
         },
         addBooks: (uid: string, id: string) => {
            return {
               reading: `/${getUrl.library.directory}/${getUrl.library.file.middleware}/${uid}/${id}/reading`,
               want: `/${getUrl.library.directory}/${getUrl.library.file.middleware}/${uid}/${id}/want`,
               finished: `/${getUrl.library.directory}/${getUrl.library.file.middleware}/${uid}/${id}/finished`,
               rereading: `/${getUrl.library.directory}/${getUrl.library.file.middleware}/${uid}/${id}/finished/rereading`,
               finishedWithDates: `/${getUrl.library.directory}/${getUrl.library.file.middleware}/${uid}/${id}/finished/dates`,
               remove: `/${getUrl.library.directory}/${getUrl.library.file.middleware}/${uid}/${id}/remove`,
            };
         },
      },
   },
   bookLog: {
      directory: 'book-log',
      file: {
         addLog: (uid: string, id: string) => {
            return {
               manualInput: `/${getUrl.bookLog.directory}/${uid}/${id}/manual-log`,
               start: `/${getUrl.bookLog.directory}/${uid}/${id}/start`,
               end: (logIndex: number) =>
                  `/${getUrl.bookLog.directory}/${uid}/${id}/${logIndex}/end`,
               delete: (logIndex: number) =>
                  `/${getUrl.bookLog.directory}/${uid}/${id}/${logIndex}/delete`,
            };
         },
         editLog: (uid: string, id: string, logIndex?: string | number) => {
            return {
               editFavorite: `/${getUrl.bookLog.directory}/${uid}/${id}/${logIndex}/favorite-session`,
            };
         },
         getLog: (uid: string, id: string) => {
            return {
               currentLog: `/${getUrl.bookLog.directory}/${uid}/${id}/current-log`,
            };
         },
      },
   },
};

export default getUrl;
