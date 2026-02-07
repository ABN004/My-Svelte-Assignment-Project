/**
 * API Route: Traffic Analytics
 * GET /api/dashboard/traffic
 * 
 * Returns traffic analytics data for charts (typically loaded client-side).
 */

import { json } from '@sveltejs/kit';
import traffic_analytics from '$lib/data/dashboard/traffic.json';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	return json({
		projects: traffic_analytics.projects,
		monthly: traffic_analytics.monthly,
		daily: traffic_analytics.daily,
		by_project: traffic_analytics.by_project
	});
}

