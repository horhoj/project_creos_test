import { axiosInstance } from './apiTransport';
import { FetchProjectListResponseItem } from './projects.types';

const fetchProjects = async () => {
  const res = await axiosInstance.request<FetchProjectListResponseItem[]>({
    url: '/project/',
  });

  return res.data;
};

export const projectsApi = { fetchProjects } as const;
