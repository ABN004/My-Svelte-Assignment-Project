<script>
	/** @type {import('./$types').PageData} */
	let { data } = $props();
	
	const { profile, tech_stack, projects, contributions } = data;
	
	// Helper function to get status badge color
	function getStatusColor(status) {
		return projects.status_types[status]?.color || '#6b7280';
	}
	
	// Helper function to get contribution level
	function getContributionLevel(count) {
		const levels = contributions.heatmap_levels;
		if (count >= levels.intense) return 'intense';
		if (count >= levels.high) return 'high';
		if (count >= levels.medium) return 'medium';
		if (count >= levels.low) return 'low';
		return 'none';
	}
	
	// Format large numbers
	function formatNumber(num) {
		if (typeof num === 'string') return num;
		if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
		if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
		return num.toString();
	}
</script>

<svelte:head>
	<title>{profile.personal.full_name} | {profile.professional.title}</title>
	<meta name="description" content={profile.professional.bio} />
</svelte:head>

<div class="profile-page">
	<!-- ============================================
	     HERO SECTION
	     ============================================ -->
	<section class="hero-section">
		<div class="hero-container">
			<div class="hero-content">
				<!-- Avatar -->
				<div class="hero-avatar-wrapper">
					<img 
						src={profile.personal.avatar} 
						alt={profile.personal.full_name}
						class="hero-avatar"
						loading="eager"
					/>
					<span class="availability-badge">
						<span class="pulse"></span>
						{profile.professional.availability}
					</span>
				</div>
				
				<!-- Info -->
				<div class="hero-info">
					<h1 class="hero-name">{profile.personal.full_name}</h1>
					<p class="hero-title">{profile.professional.title}</p>
					<p class="hero-tagline">{profile.professional.tagline}</p>
					
					<!-- Location & Experience -->
					<div class="hero-meta">
						<span class="meta-item">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
								<circle cx="12" cy="10" r="3"/>
							</svg>
							{profile.personal.location.city}, {profile.personal.location.country}
						</span>
						<span class="meta-item">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
								<path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
							</svg>
							{profile.professional.years_of_experience}+ Years Experience
						</span>
						<span class="meta-item">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
								<polyline points="9 22 9 12 15 12 15 22"/>
							</svg>
							{profile.professional.current_company}
						</span>
					</div>
					
					<!-- Social Links -->
					<div class="hero-social">
						<a href={profile.social.github.url} target="_blank" rel="noopener" class="social-link">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
							</svg>
							GitHub
						</a>
						<a href={profile.social.linkedin.url} target="_blank" rel="noopener" class="social-link">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
							</svg>
							LinkedIn
						</a>
					</div>
					
					<!-- CTA Button -->
					<div class="hero-cta">
						<a href="/dashboard" class="btn btn-primary">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
								<polyline points="9 22 9 12 15 12 15 22"/>
							</svg>
							View Analytics Dashboard
						</a>
					</div>
				</div>
			</div>
		</div>
		
		<!-- Background decoration -->
		<div class="hero-bg-decoration"></div>
	</section>

	<!-- ============================================
	     TECH STACK SECTION
	     ============================================ -->
	<section class="section tech-section">
		<div class="container">
			<div class="section-header">
				<h2 class="section-title">Tech Stack</h2>
				<p class="section-subtitle">Technologies I work with daily</p>
			</div>
			
			<!-- Highlights -->
			<div class="tech-highlights">
				{#each tech_stack.highlights as highlight}
					<span class="highlight-badge">{highlight}</span>
				{/each}
			</div>
			
			<!-- Categories Grid -->
			<div class="tech-categories">
				{#each tech_stack.categories as category}
					<div class="tech-category card">
						<div class="category-header">
							<span class="category-icon">{category.icon}</span>
							<h3 class="category-name">{category.name}</h3>
						</div>
						<div class="skills-list">
							{#each category.skills as skill}
								<div class="skill-item">
									<div class="skill-info">
										<span class="skill-name" class:primary={skill.is_primary}>
											{skill.name}
											{#if skill.is_primary}
												<span class="primary-badge">Primary</span>
											{/if}
										</span>
										<span class="skill-years">{skill.years_used}y</span>
									</div>
									<div class="skill-bar">
										<div 
											class="skill-progress" 
											style="width: {skill.proficiency}%"
										></div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ============================================
	     FEATURED PROJECTS SECTION
	     ============================================ -->
	<section class="section projects-section">
		<div class="container">
			<div class="section-header">
				<h2 class="section-title">Featured Projects</h2>
				<p class="section-subtitle">Enterprise-grade applications I've built</p>
			</div>
			
			<div class="projects-grid">
				{#each projects.featured as project}
					<article class="project-card card" style="--project-color: {project.color}">
						<div class="project-header">
							<div class="project-type-badge">{project.type}</div>
							<span class="project-status" style="background: {getStatusColor(project.status)}">
								{projects.status_types[project.status]?.label}
							</span>
						</div>
						
						<h3 class="project-name">{project.name}</h3>
						<p class="project-description">{project.description}</p>
						
						<!-- Tech Stack -->
						<div class="project-tech">
							{#each project.tech_stack as tech}
								<span class="tech-badge">{tech}</span>
							{/each}
						</div>
						
						<!-- Metrics -->
						<div class="project-metrics">
							{#each Object.entries(project.metrics).slice(0, 3) as [key, value]}
								<div class="metric-item">
									<span class="metric-value">{formatNumber(value)}</span>
									<span class="metric-label">{key.replace(/_/g, ' ')}</span>
								</div>
							{/each}
						</div>
						
						<!-- Accent line -->
						<div class="project-accent"></div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- ============================================
	     CONTRIBUTION ACTIVITY SECTION
	     ============================================ -->
	<section class="section contributions-section">
		<div class="container">
			<div class="section-header">
				<h2 class="section-title">Contribution Activity</h2>
				<p class="section-subtitle">{contributions.year} GitHub contributions</p>
			</div>
			
			<!-- Stats Row -->
			<div class="contribution-stats">
				<div class="stat-card">
					<span class="stat-value">{contributions.total_contributions}</span>
					<span class="stat-label">Total Contributions</span>
				</div>
				<div class="stat-card">
					<span class="stat-value">{contributions.longest_streak}</span>
					<span class="stat-label">Longest Streak</span>
				</div>
				<div class="stat-card">
					<span class="stat-value">{contributions.current_streak}</span>
					<span class="stat-label">Current Streak</span>
				</div>
			</div>
			
			<!-- Heatmap -->
			<div class="contribution-heatmap">
				<div class="heatmap-months">
					{#each ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as month}
						<span class="month-label">{month}</span>
					{/each}
				</div>
				<div class="heatmap-grid">
					{#each contributions.weekly as week}
						<div 
							class="heatmap-cell level-{getContributionLevel(week.contributions)}"
							title="{week.week}: {week.contributions} contributions"
						></div>
					{/each}
				</div>
				<div class="heatmap-legend">
					<span class="legend-label">Less</span>
					<div class="legend-cells">
						<div class="heatmap-cell level-none"></div>
						<div class="heatmap-cell level-low"></div>
						<div class="heatmap-cell level-medium"></div>
						<div class="heatmap-cell level-high"></div>
						<div class="heatmap-cell level-intense"></div>
					</div>
					<span class="legend-label">More</span>
				</div>
			</div>
		</div>
	</section>

	<!-- ============================================
	     EDUCATION SECTION
	     ============================================ -->
	<section class="section education-section">
		<div class="container">
			<div class="education-card card">
				<div class="education-icon">
					<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
						<path d="M6 12v5c3 3 9 3 12 0v-5"/>
					</svg>
				</div>
				<div class="education-info">
					<h3 class="education-degree">{profile.education.degree} - {profile.education.field}</h3>
					<p class="education-institution">{profile.education.college}</p>
					<p class="education-university">{profile.education.university}</p>
					<span class="education-years">{profile.education.start_year} - {profile.education.end_year}</span>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	/* ============================================
	   PROFILE PAGE CONTAINER
	   ============================================ */
	.profile-page {
		min-height: 100vh;
	}

	/* ============================================
	   HERO SECTION
	   ============================================ */
	.hero-section {
		position: relative;
		padding: var(--space-16) 0;
		background: var(--gradient-hero);
		overflow: hidden;
	}
	
	.hero-container {
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 var(--space-6);
	}
	
	.hero-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--space-8);
	}
	
	.hero-avatar-wrapper {
		position: relative;
	}
	
	.hero-avatar {
		width: 160px;
		height: 160px;
		border-radius: 50%;
		border: 4px solid var(--color-accent);
		box-shadow: var(--shadow-glow);
		object-fit: cover;
	}
	
	.availability-badge {
		position: absolute;
		bottom: 8px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-1) var(--space-3);
		background: var(--color-success);
		color: white;
		font-size: var(--text-xs);
		font-weight: 600;
		border-radius: var(--radius-full);
		white-space: nowrap;
	}
	
	.pulse {
		width: 8px;
		height: 8px;
		background: white;
		border-radius: 50%;
		animation: pulse-animation 2s infinite;
	}
	
	@keyframes pulse-animation {
		0%, 100% { opacity: 1; transform: scale(1); }
		50% { opacity: 0.5; transform: scale(1.2); }
	}
	
	.hero-info {
		max-width: 700px;
	}
	
	.hero-name {
		font-size: var(--text-4xl);
		font-weight: 800;
		margin-bottom: var(--space-2);
		background: var(--gradient-brand);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	
	.hero-title {
		font-size: var(--text-xl);
		color: var(--color-text-primary);
		font-weight: 600;
		margin-bottom: var(--space-3);
	}
	
	.hero-tagline {
		font-size: var(--text-lg);
		color: var(--color-text-tertiary);
		margin-bottom: var(--space-6);
	}
	
	.hero-meta {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--space-4);
		margin-bottom: var(--space-6);
	}
	
	.meta-item {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
	}
	
	.meta-item svg {
		color: var(--color-accent);
	}
	
	.hero-social {
		display: flex;
		justify-content: center;
		gap: var(--space-4);
		margin-bottom: var(--space-8);
	}
	
	.social-link {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-4);
		background: var(--color-bg-tertiary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-lg);
		color: var(--color-text-secondary);
		font-size: var(--text-sm);
		font-weight: 500;
		transition: all var(--transition-fast);
	}
	
	.social-link:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
		transform: translateY(-2px);
	}
	
	.hero-cta {
		display: flex;
		justify-content: center;
	}
	
	.hero-bg-decoration {
		position: absolute;
		top: -50%;
		right: -20%;
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, var(--color-accent-light) 0%, transparent 70%);
		opacity: 0.5;
		pointer-events: none;
	}

	/* ============================================
	   TECH STACK SECTION
	   ============================================ */
	.tech-section {
		background: var(--color-bg-secondary);
	}
	
	.section-header {
		text-align: center;
		margin-bottom: var(--space-10);
	}
	
	.tech-highlights {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--space-3);
		margin-bottom: var(--space-10);
	}
	
	.highlight-badge {
		padding: var(--space-2) var(--space-4);
		background: var(--color-accent-light);
		color: var(--color-accent);
		font-size: var(--text-sm);
		font-weight: 600;
		border-radius: var(--radius-full);
	}
	
	.tech-categories {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: var(--space-6);
	}
	
	@media (min-width: 640px) {
		.tech-categories {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	
	@media (min-width: 1024px) {
		.tech-categories {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	
	.tech-category {
		padding: var(--space-6);
	}
	
	.category-header {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		margin-bottom: var(--space-5);
	}
	
	.category-icon {
		font-size: var(--text-2xl);
	}
	
	.category-name {
		font-size: var(--text-lg);
		font-weight: 700;
	}
	
	.skills-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}
	
	.skill-item {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}
	
	.skill-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.skill-name {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}
	
	.skill-name.primary {
		color: var(--color-text-primary);
		font-weight: 600;
	}
	
	.primary-badge {
		font-size: var(--text-xs);
		padding: 2px 6px;
		background: var(--color-accent-light);
		color: var(--color-accent);
		border-radius: var(--radius-sm);
	}
	
	.skill-years {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}
	
	.skill-bar {
		height: 6px;
		background: var(--color-bg-tertiary);
		border-radius: var(--radius-full);
		overflow: hidden;
	}
	
	.skill-progress {
		height: 100%;
		background: var(--gradient-accent);
		border-radius: var(--radius-full);
		transition: width 0.5s ease;
	}

	/* ============================================
	   PROJECTS SECTION
	   ============================================ */
	.projects-section {
		background: var(--color-bg-primary);
	}
	
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: var(--space-6);
	}
	
	@media (min-width: 768px) {
		.projects-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	
	.project-card {
		position: relative;
		padding: var(--space-6);
		overflow: hidden;
	}
	
	.project-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-4);
	}
	
	.project-type-badge {
		font-size: var(--text-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
	}
	
	.project-status {
		padding: var(--space-1) var(--space-3);
		font-size: var(--text-xs);
		font-weight: 600;
		color: white;
		border-radius: var(--radius-full);
	}
	
	.project-name {
		font-size: var(--text-xl);
		font-weight: 700;
		margin-bottom: var(--space-3);
		color: var(--color-text-primary);
	}
	
	.project-description {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		margin-bottom: var(--space-4);
		line-height: 1.6;
	}
	
	.project-tech {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-bottom: var(--space-5);
	}
	
	.tech-badge {
		padding: var(--space-1) var(--space-2);
		font-size: var(--text-xs);
		font-weight: 500;
		background: var(--color-bg-tertiary);
		color: var(--color-text-secondary);
		border-radius: var(--radius-md);
	}
	
	.project-metrics {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-3);
		padding-top: var(--space-4);
		border-top: 1px solid var(--color-border-primary);
	}
	
	.metric-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	
	.metric-value {
		font-size: var(--text-lg);
		font-weight: 700;
		color: var(--project-color);
	}
	
	.metric-label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		text-transform: capitalize;
	}
	
	.project-accent {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: var(--project-color);
	}

	/* ============================================
	   CONTRIBUTIONS SECTION
	   ============================================ */
	.contributions-section {
		background: var(--color-bg-secondary);
	}
	
	.contribution-stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-4);
		margin-bottom: var(--space-8);
	}
	
	.stat-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: var(--space-5);
		background: var(--color-card-bg);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-xl);
	}
	
	.stat-value {
		font-size: var(--text-3xl);
		font-weight: 800;
		color: var(--color-accent);
	}
	
	.stat-label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin-top: var(--space-1);
	}
	
	.contribution-heatmap {
		background: var(--color-card-bg);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-xl);
		padding: var(--space-6);
		overflow-x: auto;
	}
	
	.heatmap-months {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: var(--space-2);
		margin-bottom: var(--space-3);
		padding-left: var(--space-2);
	}
	
	.month-label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		text-align: center;
	}
	
	.heatmap-grid {
		display: grid;
		grid-template-columns: repeat(48, 1fr);
		gap: 3px;
		margin-bottom: var(--space-4);
	}
	
	.heatmap-cell {
		aspect-ratio: 1;
		min-width: 10px;
		border-radius: 2px;
		background: var(--color-bg-tertiary);
	}
	
	.heatmap-cell.level-none { background: var(--color-bg-tertiary); }
	.heatmap-cell.level-low { background: rgba(16, 185, 129, 0.3); }
	.heatmap-cell.level-medium { background: rgba(16, 185, 129, 0.5); }
	.heatmap-cell.level-high { background: rgba(16, 185, 129, 0.7); }
	.heatmap-cell.level-intense { background: #10b981; }
	
	.heatmap-legend {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: var(--space-2);
	}
	
	.legend-label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}
	
	.legend-cells {
		display: flex;
		gap: 3px;
	}
	
	.legend-cells .heatmap-cell {
		width: 12px;
		height: 12px;
	}

	/* ============================================
	   EDUCATION SECTION
	   ============================================ */
	.education-section {
		background: var(--color-bg-primary);
		padding-bottom: var(--space-20);
	}
	
	.education-card {
		display: flex;
		align-items: center;
		gap: var(--space-6);
		max-width: 700px;
		margin: 0 auto;
		padding: var(--space-8);
	}
	
	.education-icon {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 64px;
		height: 64px;
		background: var(--color-accent-light);
		color: var(--color-accent);
		border-radius: var(--radius-xl);
	}
	
	.education-info {
		flex: 1;
	}
	
	.education-degree {
		font-size: var(--text-xl);
		font-weight: 700;
		margin-bottom: var(--space-2);
	}
	
	.education-institution {
		font-size: var(--text-base);
		color: var(--color-text-secondary);
		margin-bottom: var(--space-1);
	}
	
	.education-university {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin-bottom: var(--space-3);
	}
	
	.education-years {
		display: inline-block;
		padding: var(--space-1) var(--space-3);
		background: var(--color-bg-tertiary);
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--color-text-secondary);
		border-radius: var(--radius-md);
	}

	/* ============================================
	   RESPONSIVE ADJUSTMENTS
	   ============================================ */
	@media (max-width: 640px) {
		.hero-section {
			padding: var(--space-10) 0;
		}
		
		.hero-avatar {
			width: 120px;
			height: 120px;
		}
		
		.hero-name {
			font-size: var(--text-3xl);
		}
		
		.hero-title {
			font-size: var(--text-lg);
		}
		
		.hero-tagline {
			font-size: var(--text-base);
		}
		
		.hero-meta {
			flex-direction: column;
			gap: var(--space-2);
		}
		
		.hero-social {
			flex-direction: column;
			gap: var(--space-2);
		}
		
		.social-link {
			justify-content: center;
		}
		
		.contribution-stats {
			grid-template-columns: 1fr;
			gap: var(--space-3);
		}
		
		.stat-card {
			flex-direction: row;
			justify-content: space-between;
			padding: var(--space-4);
		}
		
		.stat-value {
			font-size: var(--text-2xl);
		}
		
		.heatmap-months {
			display: none;
		}
		
		.heatmap-grid {
			grid-template-columns: repeat(12, 1fr);
		}
		
		.education-card {
			flex-direction: column;
			text-align: center;
			padding: var(--space-6);
		}
		
		.project-metrics {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	
	@media (min-width: 1024px) {
		.hero-content {
			flex-direction: row;
			text-align: left;
			gap: var(--space-12);
		}
		
		.hero-meta {
			justify-content: flex-start;
		}
		
		.hero-social {
			justify-content: flex-start;
		}
		
		.hero-cta {
			justify-content: flex-start;
		}
	}
</style>

