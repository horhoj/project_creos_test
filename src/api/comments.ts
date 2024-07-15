import { axiosInstance } from './apiTransport';
import { CommentResponseItem } from './comments.types';

const fetchComments = async () => {
  const res = await axiosInstance.request<CommentResponseItem[]>({
    url: '/comment/',
    params: { ordering: '-date_created', page: 1, limit: 10 },
  });

  return res.data;
};

const lastTenCommentDataMapper = (data: CommentResponseItem[]): CommentResponseItem[] => {
  return data.slice(0, 10);
};

export const commentsApi = { fetchComments, lastTenCommentDataMapper } as const;
