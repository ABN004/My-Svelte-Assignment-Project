/**
 * Profile Page - Server-Side Data Loading
 * 
 * Strategy: Full SSR
 * - All profile data is static/semi-static
 * - SEO-friendly (meta tags, structured data)
 * - Fast first meaningful paint
 * - Minimal data payload to client
 */

import profile from '$lib/data/profile.json';
import tech_stack from '$lib/data/tech_stack.json';
import projects from '$lib/data/projects.json';
import contributions from '$lib/data/contributions.json';

/** @type {import('./$types').PageServerLoad} */
export function load() {
	// Only send necessary data to minimize payload
	// Filter and transform data server-side
	
	const profile_data = {
		personal: {
			full_name: profile.personal.full_name,
			avatar: profile.personal.avatar,
			location: profile.personal.location
		},
		professional: {
			title: profile.professional.title,
			tagline: profile.professional.tagline,
			bio: profile.professional.bio,
			years_of_experience: profile.professional.years_of_experience,
			current_company: profile.professional.current_company,
			availability: profile.professional.availability
		},
		social: profile.social,
		education: profile.education
	};
	
	// Only send primary skills for initial render
	const tech_stack_data = {
		categories: tech_stack.categories.map(category => ({
			id: category.id,
			name: category.name,
			icon: category.icon,
			skills: category.skills
		})),
		highlights: tech_stack.highlights
	};
	
	// Featured projects with essential data only
	const projects_data = {
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
	};
	
	// Contribution summary for heatmap
	const contributions_data = {
		year: contributions.year,
		total_contributions: contributions.total_contributions,
		longest_streak: contributions.longest_streak,
		current_streak: contributions.current_streak,
		weekly: contributions.weekly,
		heatmap_levels: contributions.heatmap_levels
	};
	
	return {
		profile: profile_data,
		tech_stack: tech_stack_data,
		projects: projects_data,
		contributions: contributions_data
	};
}

