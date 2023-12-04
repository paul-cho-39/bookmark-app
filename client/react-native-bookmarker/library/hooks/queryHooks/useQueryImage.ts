import { useQuery } from '@tanstack/react-query';
import { getUrl, getFetch, queryKeys } from '../../helper/react-query';

interface ThumbnailImage {
   thumbnail: string | undefined;
}

export default function useQueryImage(id: string) {
   const thumbnailUrl = getUrl.library.file.getBooks.thumbnail(id);
   const { data, isError, isLoading } = useQuery<ThumbnailImage>(queryKeys.singleBook(id), () =>
      getFetch(thumbnailUrl)
   );
   // getFetch(`/library/thumbnail/${id}`)
   // );
   const image = data?.thumbnail;
   return { image, isError, isLoading };
}
