export interface IssueResponseItem {
  id: number;
  status: IssueStatus;
  designer: null | string;
  project: string;
  date_created: Date;
  summary: string;
  received_from_client: number;
  send_to_project_manager: number;
  send_to_account_manager: number;
  send_to_designer: number;
  date_updated: Date;
  date_started_by_designer: Date | null;
  date_finished_by_designer: Date | null;
  date_finished: Date | null;
}

export enum IssueStatus {
  Done = 'Done',
  InProgress = 'In Progress',
  New = 'New',
}
