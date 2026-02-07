/**
 * Profile Page - Server-Side Data Loading
 * 
 * Strategy: Full SSR
 * - All profile data is static/semi-static
 * - SEO-friendly (meta tags, structured data)
 * - Fast first meaningful paint
 * - Minimal data payload to client
 * 
 * Now fetches data from API routes instead of direct JSON imports.
 */

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	// Fetch all profile-related data in parallel for better performance
	const [profileRes, techStackRes, projectsRes, contributionsRes] = await Promise.all([
		fetch('/api/profile'),
		fetch('/api/tech-stack'),
		fetch('/api/projects'),
		fetch('/api/contributions')
	]);
	
	const [profile, tech_stack, projects, contributions] = await Promise.all([
		profileRes.json(),
		techStackRes.json(),
		projectsRes.json(),
		contributionsRes.json()
	]);
	
	return {
		profile,
		tech_stack,
		projects,
		contributions
	};
}
