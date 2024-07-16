export interface FetchDesignerResponse {
  count: number;
  next: string;
  previous: null;
  results: FetchDesignerResponseResultItem[];
}

export interface FetchDesignerResponseResultItem {
  avatar: string;
  username: string;
  email: string;
  thumbnails: Thumbnails;
  issues: Issue[];
}

export interface Issue {
  key: string;
  date_created: string;
  status: FetchDesignerResponseResultItemIssueStatus;
}

export enum FetchDesignerResponseResultItemIssueStatus {
  Done = 'Done',
  InProgress = 'In Progress',
}

export interface Thumbnails {
  avatar: string;
  avatar_2x: string;
  avatar_webp: string;
  avatar_webp_2x: string;
}
