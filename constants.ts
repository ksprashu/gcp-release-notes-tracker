
import { ChangeType } from './types';

type ChangeTypeConfig = {
  [key in ChangeType]: {
    emoji: string;
    bg: string;
    text: string;
    ring: string;
  };
};

export const changeTypeConfig: ChangeTypeConfig = {
  [ChangeType.GA]: {
    emoji: '🎉',
    bg: 'bg-green-100 dark:bg-green-900/50',
    text: 'text-green-800 dark:text-green-300',
    ring: 'ring-green-500'
  },
  [ChangeType.Preview]: {
    emoji: '🧪',
    bg: 'bg-yellow-100 dark:bg-yellow-900/50',
    text: 'text-yellow-800 dark:text-yellow-300',
    ring: 'ring-yellow-500'
  },
  [ChangeType.BugFix]: {
    emoji: '🐛',
    bg: 'bg-blue-100 dark:bg-blue-900/50',
    text: 'text-blue-800 dark:text-blue-300',
    ring: 'ring-blue-500'
  },
  [ChangeType.Feature]: {
    emoji: '✨',
    bg: 'bg-indigo-100 dark:bg-indigo-900/50',
    text: 'text-indigo-800 dark:text-indigo-300',
    ring: 'ring-indigo-500'
  },
  [ChangeType.Deprecated]: {
    emoji: '🗑️',
    bg: 'bg-gray-100 dark:bg-gray-700',
    text: 'text-gray-800 dark:text-gray-300',
    ring: 'ring-gray-500'
  },
  [ChangeType.Security]: {
    emoji: '🛡️',
    bg: 'bg-red-100 dark:bg-red-900/50',
    text: 'text-red-800 dark:text-red-300',
    ring: 'ring-red-500'
  },
};
