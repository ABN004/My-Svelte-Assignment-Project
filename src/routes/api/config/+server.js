/**
 * API Route: Site Configuration
 * GET /api/config
 * 
 * Returns site configuration including branding, navigation, and page metadata.
 */

import { json } from '@sveltejs/kit';
import site_config from '$lib/data/site_config.json';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	return json({
		site: site_config.site,
		branding: site_config.branding,
		navigation: site_config.navigation,
		pages: site_config.pages
	});
}

