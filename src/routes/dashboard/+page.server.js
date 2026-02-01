/**
 * Dashboard Page - Server-Side Data Loading
 * 
 * Strategy: Hybrid SSR + CSR
 * - Overview metrics: SSR (critical for first paint)
 * - Deployment status: SSR (important system info)
 * - Traffic analytics: CSR (heavy charts, deferred)
 * - Error logs: CSR (loaded on interaction)
 */

import dashboard_metrics from '$lib/data/dashboard/metrics.json';
import deployments from '$lib/data/dashboard/deployments.json';
import traffic_analytics from '$lib/data/dashboard/traffic.json';
import error_logs from '$lib/data/dashboard/errors.json';

/** @type {import('./$types').PageServerLoad} */
export function load() {
	// SSR: Send overview metrics (critical for first paint)
	const metrics = {
		overview: dashboard_metrics.overview,
		last_updated: dashboard_metrics.last_updated
	};
	
	// SSR: Send deployment status (important system info)
	const deployments_data = {
		deployments: deployments.deployments.map(d => ({
			id: d.id,
			project_id: d.project_id,
			project_name: d.project_name,
			environment: d.environment,
			status: d.status,
			status_message: d.status_message || null,
			version: d.version,
			last_deployed: d.last_deployed,
			uptime: d.uptime,
			region: d.region,
			cpu: d.cpu,
			memory: d.memory
		})),
		status_config: deployments.status_config,
		regions: deployments.regions
	};
	
	// CSR data: Traffic analytics for charts (sent but rendered client-side)
	const traffic_data = {
		projects: traffic_analytics.projects,
		monthly: traffic_analytics.monthly,
		daily: traffic_analytics.daily,
		by_project: traffic_analytics.by_project
	};
	
	// CSR data: Error logs (all errors for filtering)
	const errors_data = {
		summary: error_logs.summary,
		recent: error_logs.recent, // All errors for client-side filtering
		level_config: error_logs.level_config
	};
	
	return {
		metrics,
		deployments: deployments_data,
		traffic: traffic_data,
		errors: errors_data
	};
}

