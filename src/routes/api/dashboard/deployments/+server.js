/**
 * API Route: Deployments
 * GET /api/dashboard/deployments
 * 
 * Returns deployment status information for all projects.
 */

import { json } from '@sveltejs/kit';
import deployments from '$lib/data/dashboard/deployments.json';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	return json({
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
	});
}

