/**
 * Layout Server Load
 * 
 * Provides site configuration to all pages via the layout.
 * This data is available in all child pages.
 */

import site_config from '$lib/data/site_config.json';

/** @type {import('./$types').LayoutServerLoad} */
export function load() {
	return {
		site_config: {
			site: site_config.site,
			branding: site_config.branding,
			navigation: site_config.navigation,
			pages: site_config.pages
		}
	};
}

