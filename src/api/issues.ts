import { axiosInstance } from './apiTransport';
import { IssueResponseItem, IssueStatus } from './issues.types';

const fetchIssues = async (params: { status?: IssueStatus }) => {
  const res = await axiosInstance.request<IssueResponseItem[]>({
    url: '/issue/',
    params,
  });

  return res.data;
};

export const issuesApi = { fetchIssues } as const;
