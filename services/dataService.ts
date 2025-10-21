import React from 'react';
import { Product, ChangeType } from '../types';

const today = new Date();
const daysAgo = (days: number) => new Date(today.getTime() - days * 24 * 60 * 60 * 1000).toISOString();

export const initialProducts: Product[] = [
  {
    id: 'bigquery',
    name: 'BigQuery',
    icon: '📊',
    url: 'https://cloud.google.com/bigquery',
    changes: [
      { id: 'bq1', date: daysAgo(1), type: ChangeType.GA, description: 'BigQuery Studio is now Generally Available, offering a unified interface for data exploration and analysis.', url: 'https://cloud.google.com/bigquery/docs/release-notes#May23_2024' },
      { id: 'bq2', date: daysAgo(5), type: ChangeType.Feature, description: 'Introduced new `JSON` data type support in preview for more flexible schema management.', url: 'https://cloud.google.com/bigquery/docs/release-notes#May19_2024' },
      { id: 'bq3', date: daysAgo(12), type: ChangeType.BugFix, description: 'Fixed an issue where queries with complex joins could intermittently fail under high load.', url: 'https://cloud.google.com/bigquery/docs/release-notes#May12_2024' },
    ],
  },
  {
    id: 'cloud-storage',
    name: 'Cloud Storage',
    icon: '🗄️',
    url: 'https://cloud.google.com/storage',
    changes: [
      { id: 'cs1', date: daysAgo(2), type: ChangeType.Security, description: 'A security bulletin was published regarding object access policies. All users are advised to review their IAM settings.', url: 'https://cloud.google.com/storage/docs/release-notes#May22_2024' },
      { id: 'cs2', date: daysAgo(8), type: ChangeType.GA, description: 'Autoclass feature is now Generally Available, automatically transitioning object storage classes to reduce costs.', url: 'https://cloud.google.com/storage/docs/release-notes#May16_2024' },
      { id: 'cs3', date: daysAgo(20), type: ChangeType.Deprecated, description: 'The legacy `gsutil -d` flag for debugging has been deprecated in favor of a new configuration option.', url: 'https://cloud.google.com/storage/docs/release-notes#May04_2024' },
    ],
  },
  {
    id: 'gke',
    name: 'Google Kubernetes Engine',
    icon: '⚙️',
    url: 'https://cloud.google.com/kubernetes-engine',
    changes: [
      { id: 'gke1', date: daysAgo(3), type: ChangeType.Preview, description: 'GKE Enterprise on-premises is now available in Preview, enabling consistent cluster management in your data center.', url: 'https://cloud.google.com/kubernetes-engine/docs/release-notes#May21_2024' },
      { id: 'gke2', date: daysAgo(7), type: ChangeType.Feature, description: 'Added support for the new N4 machine series in GKE Autopilot clusters.', url: 'https://cloud.google.com/kubernetes-engine/docs/release-notes#May17_2024' },
      { id: 'gke3', date: daysAgo(15), type: ChangeType.BugFix, description: 'Resolved a bug that caused incorrect metrics reporting for GPU utilization in some node pools.', url: 'https://cloud.google.com/kubernetes-engine/docs/release-notes#May09_2024' },
    ],
  },
  {
    id: 'cloud-run',
    name: 'Cloud Run',
    icon: '🏃',
    url: 'https://cloud.google.com/run',
    changes: [
      { id: 'cr1', date: daysAgo(4), type: ChangeType.GA, description: 'Direct VPC egress for Cloud Run services is now Generally Available, simplifying network configuration.', url: 'https://cloud.google.com/run/docs/release-notes#May20_2024' },
      { id: 'cr2', date: daysAgo(9), type: ChangeType.Feature, description: 'Cloud Run jobs now support retries on failure with configurable backoff policies.', url: 'https://cloud.google.com/run/docs/release-notes#May15_2024' },
    ],
  },
  {
    id: 'iam',
    name: 'Cloud IAM',
    icon: '🔐',
    url: 'https://cloud.google.com/iam',
    changes: [
      { id: 'iam1', date: daysAgo(6), type: ChangeType.Security, description: 'Addressed a potential vulnerability related to service account key management. See bulletin for details.', url: 'https://cloud.google.com/iam/docs/release-notes#May18_2024' },
      { id: 'iam2', date: daysAgo(18), type: ChangeType.Preview, description: 'Policy Troubleshooter now supports analyzing access denials for Google Kubernetes Engine resources in Preview.', url: 'https://cloud.google.com/iam/docs/release-notes#May06_2024' },
    ],
  },
  {
    id: 'vertex-ai',
    name: 'Vertex AI',
    icon: '🤖',
    url: 'https://cloud.google.com/vertex-ai',
    changes: [
      { id: 'vai1', date: daysAgo(1), type: ChangeType.Feature, description: 'Launched new foundation models from Mistral AI on the Vertex AI Model Garden.', url: 'https://cloud.google.com/vertex-ai/docs/release-notes#May23_2024' },
      { id: 'vai2', date: daysAgo(10), type: ChangeType.GA, description: 'Vertex AI Search is now Generally Available, allowing developers to build sophisticated search engines.', url: 'https://cloud.google.com/vertex-ai/docs/release-notes#May14_2024' },
      { id: 'vai3', date: daysAgo(25), type: ChangeType.BugFix, description: 'Fixed a data leak issue in the pipeline execution cache for multi-user environments.', url: 'https://cloud.google.com/vertex-ai/docs/release-notes#Apr29_2024' },
    ],
  },
];