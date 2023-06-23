import { NoteType } from '../../types/@types';

function retrieveNotesHeader(notes: NoteType[string][number], id: string, logIndex: number) {
   const lastEdited = notes.dates.lastEdited;
   const createdAt = notes.dates.start;
   const title = notes.title;
   const chapter = notes.chapter;
   const pageFrom = notes.pageFrom;
   const pageTo = notes.pageTo;
   const tags = notes.tags;

   const editableHeaderParams = {
      id,
      logIndex,
      title: title,
      chapter: chapter,
      pageFrom: pageFrom,
      pageTo: pageTo,
      lastEdited: lastEdited,
      createdAt: createdAt,
   };

   const noteTags = {
      id,
      logIndex,
      tags,
   };

   return { editableHeaderParams, noteTags };
}

type RetrievalParams = ReturnType<typeof retrieveNotesHeader>;
type EditableHeaderParams = RetrievalParams['editableHeaderParams'];
type NoteTagsParams = RetrievalParams['noteTags'];

export { retrieveNotesHeader };
export type { EditableHeaderParams, NoteTagsParams };
