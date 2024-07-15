import { axiosInstance } from './apiTransport';
import { CommentResponseItem } from './comments.types';

const fetchComments = async () => {
  const res = await axiosInstance.request<CommentResponseItem[]>({
    url: '/comment/',
    params: { ordering: '-date_created', page: 1 },
    // TODO limit
  });

  return res.data;
};

const lastTenCommentDataMapper = (data: CommentResponseItem[]): CommentResponseItem[] => {
  // return data
  //   .slice()
  //   .sort((a, b) => {
  //     return new Date(b.date_created).getTime() - new Date(a.date_created).getTime();
  //   })
  //   .slice(0, 10);

  return data.slice(0, 10);
};

export const commentsApi = { fetchComments, lastTenCommentDataMapper } as const;
