import { NoteType } from '../../types/@types';

function retrieveNotesHeader(notes: NoteType, logIndex: number) {
   const lastEdited = notes[logIndex].dates.lastEdited;
   const createdAt = notes[logIndex].dates.start;
   const title = notes[logIndex].title;
   const chapter = notes[logIndex].chapter;
   const pageFrom = notes[logIndex].pageFrom;
   const pageTo = notes[logIndex].pageTo;
   const tags = notes[logIndex].tags;

   const editableHeaderParams = {
      logIndex,
      title: title,
      chapter: chapter,
      pageFrom: pageFrom,
      pageTo: pageTo,
      lastEdited: lastEdited,
      createdAt: createdAt,
   };

   return { editableHeaderParams };
}

type RetrievalParams = ReturnType<typeof retrieveNotesHeader>;
type EditableHeaderParams = RetrievalParams['editableHeaderParams'];

export { retrieveNotesHeader };
export type { EditableHeaderParams };
