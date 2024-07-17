// import { IssueResponseItem } from '~/api/issues.types';

export interface WeekResultsItem {
  id: string;
  // weekIssues: IssueResponseItem[];
  income: number;
  expenses: number;
  profit: number;
  issueCount: number;
  startOfWeek: string;
  endOfWeek: string;
  name: string;
}
