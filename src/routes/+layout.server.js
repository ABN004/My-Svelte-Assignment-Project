/**
 * Layout Server Load
 * 
 * Provides site configuration to all pages via the layout.
 * This data is available in all child pages.
 * Fetches data from API route instead of direct JSON import.
 */

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch }) {
	const response = await fetch('/api/config');
	const site_config = await response.json();
	
	return {
		site_config
	};
}
