/**
 * Data Layer Index
 * 
 * Centralized exports for all data modules.
 * Follows separation of concerns and single responsibility principles.
 * All keys use snake_case format for consistency.
 * 
 * Usage:
 *   import { profile, tech_stack, projects } from '$lib/data';
 *   import { dashboard_metrics, deployments } from '$lib/data';
 */

// Profile & Personal Data
export { default as profile } from './profile.json';
export { default as tech_stack } from './tech_stack.json';
export { default as projects } from './projects.json';
export { default as contributions } from './contributions.json';

// Dashboard Data (Analytics)
export { default as dashboard_metrics } from './dashboard/metrics.json';
export { default as traffic_analytics } from './dashboard/traffic.json';
export { default as error_logs } from './dashboard/errors.json';
export { default as deployments } from './dashboard/deployments.json';

/**
 * Data Structure Overview:
 * 
 * Profile Page (SSR):
 * ├── profile.json        → Personal & professional info
 * ├── tech_stack.json     → Skills by category with proficiency
 * ├── projects.json       → Featured projects with metrics
 * └── contributions.json  → GitHub-style contribution data
 * 
 * Dashboard Page (SSR + CSR):
 * ├── dashboard/
 * │   ├── metrics.json    → Overview stats (SSR)
 * │   ├── traffic.json    → Traffic analytics (CSR - charts)
 * │   ├── errors.json     → Error logs (CSR - on interaction)
 * │   └── deployments.json → Deployment statuses (SSR)
 * 
 * Naming Convention: All keys use snake_case format
 */
