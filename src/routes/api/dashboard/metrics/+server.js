/**
 * API Route: Dashboard Metrics
 * GET /api/dashboard/metrics
 * 
 * Returns overview metrics for the dashboard (critical for first paint).
 */

import { json } from '@sveltejs/kit';
import dashboard_metrics from '$lib/data/dashboard/metrics.json';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	return json({
		overview: dashboard_metrics.overview,
		last_updated: dashboard_metrics.last_updated
	});
}

