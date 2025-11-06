export enum ChangeType {
  GA = 'GA',
  Preview = 'Preview',
  Feature = 'Feature',
  BugFix = 'Bug Fix',
  Security = 'Security',
  Deprecated = 'Deprecated',
}

export interface Change {
  id: string;
  date: string;
  type: ChangeType;
  description: string;
  url?: string;
}

export interface Product {
  id: string;
  name: string;
  icon: string;
  url: string;
  changes: Change[];
}

export type SortOption = 'recent' | 'alphabetical';
