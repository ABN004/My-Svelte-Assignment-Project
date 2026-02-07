/**
 * API Route: Projects
 * GET /api/projects
 * 
 * Returns featured projects with essential metadata and metrics.
 */

import { json } from '@sveltejs/kit';
import projects from '$lib/data/projects.json';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	return json({
		featured: projects.featured.map(project => ({
			id: project.id,
			name: project.name,
			short_name: project.short_name,
			description: project.description,
			status: project.status,
			type: project.type,
			tech_stack: project.tech_stack.slice(0, 5), // Max 5 tech badges
			metrics: project.metrics,
			color: project.color
		})),
		status_types: projects.status_types
	});
}

