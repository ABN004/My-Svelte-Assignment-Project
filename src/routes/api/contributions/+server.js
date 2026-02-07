/**
 * API Route: Contributions
 * GET /api/contributions
 * 
 * Returns GitHub-style contribution data for heatmap visualization.
 */

import { json } from '@sveltejs/kit';
import contributions from '$lib/data/contributions.json';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	return json({
		year: contributions.year,
		total_contributions: contributions.total_contributions,
		longest_streak: contributions.longest_streak,
		current_streak: contributions.current_streak,
		weekly: contributions.weekly,
		heatmap_levels: contributions.heatmap_levels
	});
}

