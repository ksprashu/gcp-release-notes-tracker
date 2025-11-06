// FIX: Import React to use React.ReactNode type.
import type React from 'react';

export type ChangeType =
  | 'General Availability'
  | 'Preview'
  | 'Bug Fix'
  | 'New Feature'
  | 'Deprecation'
  | 'Security Bulletin';

export interface Change {
  id: string;
  date: string; // ISO string
  type: ChangeType;
  description: string;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  icon: React.ReactNode;
  changes: Change[];
  url: string;
}

export type SortOption = 'recent' | 'alphabetical';