/**
 * API Route: Tech Stack
 * GET /api/tech-stack
 * 
 * Returns skills categorized by technology type with proficiency levels.
 */

import { json } from '@sveltejs/kit';
import tech_stack from '$lib/data/tech_stack.json';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	return json({
		categories: tech_stack.categories.map(category => ({
			id: category.id,
			name: category.name,
			icon: category.icon,
			skills: category.skills
		})),
		highlights: tech_stack.highlights
	});
}

