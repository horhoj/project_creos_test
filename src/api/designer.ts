import { axiosInstance } from './apiTransport';
import { FetchDesignerResponse } from './designer.types';

const fetchDesigners = async ({
  page,
  limit,
  project,
  status,
  ordering,
}: {
  page: number;
  limit: number;
  project?: string;
  status?: string;
  ordering?: string;
}) => {
  const params: Record<string, unknown> = {
    page,
    limit,
  };

  if (project) {
    params.key = project;
  }

  if (status) {
    params.status = status;
  }

  if (ordering) {
    params.ordering = ordering;
  }

  const res = await axiosInstance.request<FetchDesignerResponse>({
    url: '/designer/',
    params,
  });

  return res.data;
};

export const designersApi = { fetchDesigners } as const;
