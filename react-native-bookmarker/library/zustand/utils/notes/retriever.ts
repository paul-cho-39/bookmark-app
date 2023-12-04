import { NoteType } from '../../types/@types';

function retrieveNotesHeader(notes: NoteType[string][number]) {
   const lastEdited = notes.dates.lastEdited;
   const createdAt = notes.dates.start;
   const title = notes.title;
   const chapter = notes.chapter;
   const pageFrom = notes.pageFrom;
   const pageTo = notes.pageTo;
   const tags = notes.tags;

   const editableHeaderParams = {
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
// type NoteTagsParams = RetrievalParams['noteTags'];

export { retrieveNotesHeader };
export type { EditableHeaderParams };
