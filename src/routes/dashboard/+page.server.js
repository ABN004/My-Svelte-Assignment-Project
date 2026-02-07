/**
 * Dashboard Page - Server-Side Data Loading
 * 
 * Strategy: Hybrid SSR + CSR
 * - Overview metrics: SSR (critical for first paint)
 * - Deployment status: SSR (important system info)
 * - Traffic analytics: CSR (heavy charts, deferred)
 * - Error logs: CSR (loaded on interaction)
 * 
 * Now fetches data from API routes instead of direct JSON imports.
 */

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	// Fetch all dashboard data in parallel for better performance
	const [metricsRes, deploymentsRes, trafficRes, errorsRes] = await Promise.all([
		fetch('/api/dashboard/metrics'),
		fetch('/api/dashboard/deployments'),
		fetch('/api/dashboard/traffic'),
		fetch('/api/dashboard/errors')
	]);
	
	const [metrics, deployments, traffic, errors] = await Promise.all([
		metricsRes.json(),
		deploymentsRes.json(),
		trafficRes.json(),
		errorsRes.json()
	]);
	
	return {
		metrics,
		deployments,
		traffic,
		errors
	};
}
