/**
 * API Route: Error Logs
 * GET /api/dashboard/errors
 * 
 * Returns error logs and summary for monitoring.
 */

import { json } from '@sveltejs/kit';
import error_logs from '$lib/data/dashboard/errors.json';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	return json({
		summary: error_logs.summary,
		recent: error_logs.recent,
		level_config: error_logs.level_config
	});
}

