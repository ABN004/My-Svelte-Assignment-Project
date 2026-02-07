/**
 * API Route: Profile Data
 * GET /api/profile
 * 
 * Returns personal and professional profile information.
 */

import { json } from '@sveltejs/kit';
import profile from '$lib/data/profile.json';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	return json({
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
	});
}

