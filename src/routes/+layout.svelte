<script>
	import '../styles/global.css';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	
	let theme = 'dark';
	let mounted = false;
	
	onMount(() => {
		// Get saved theme or system preference
		const savedTheme = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		theme = savedTheme || (prefersDark ? 'dark' : 'light');
		document.documentElement.setAttribute('data-theme', theme);
		mounted = true;
	});
	
	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}
</script>

<svelte:head>
	<link rel="icon" href="/icons/AmalBNair.ico" />
	<title>Amal B Nair | Fullstack Developer</title>
</svelte:head>

<!-- Navigation Header -->
<header class="nav-header">
	<div class="nav-container">
		<a href="/" class="nav-logo">
			<span class="logo-text">ABN</span>
			<span class="logo-dot"></span>
		</a>
		
		<nav class="nav-links">
			<a href="/profile" class="nav-link">Profile</a>
			<a href="/dashboard" class="nav-link">Dashboard</a>
		</nav>
		
		<div class="nav-actions">
			<!-- Theme Toggle Button -->
			<button 
				class="theme-toggle" 
				on:click={toggleTheme}
				aria-label="Toggle theme"
				title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
			>
				{#if mounted}
					{#if theme === 'dark'}
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<circle cx="12" cy="12" r="5"/>
							<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
						</svg>
					{:else}
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
						</svg>
					{/if}
				{/if}
			</button>
		</div>
	</div>
</header>

<main class="main-content">
	<slot />
</main>

<style>
	.nav-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		background: var(--color-bg-primary);
		border-bottom: 1px solid var(--color-border-primary);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}
	
	.nav-container {
		max-width: 1280px;
		margin: 0 auto;
		padding: var(--space-4) var(--space-6);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.nav-logo {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		text-decoration: none;
	}
	
	.logo-text {
		font-family: var(--font-heading);
		font-size: var(--text-xl);
		font-weight: 800;
		color: var(--color-text-primary);
		letter-spacing: -0.02em;
	}
	
	.logo-dot {
		width: 8px;
		height: 8px;
		background: var(--color-accent);
		border-radius: 50%;
	}
	
	.nav-links {
		display: flex;
		align-items: center;
		gap: var(--space-8);
	}
	
	.nav-link {
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--color-text-secondary);
		text-decoration: none;
		transition: color var(--transition-fast);
		position: relative;
	}
	
	.nav-link:hover {
		color: var(--color-text-primary);
	}
	
	.nav-link::after {
		content: '';
		position: absolute;
		bottom: -4px;
		left: 0;
		width: 0;
		height: 2px;
		background: var(--color-accent);
		transition: width var(--transition-base);
	}
	
	.nav-link:hover::after {
		width: 100%;
	}
	
	.nav-actions {
		display: flex;
		align-items: center;
		gap: var(--space-4);
	}
	
	.theme-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background: var(--color-bg-tertiary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-lg);
		color: var(--color-text-secondary);
		cursor: pointer;
		transition: all var(--transition-fast);
	}
	
	.theme-toggle:hover {
		background: var(--color-bg-elevated);
		border-color: var(--color-accent);
		color: var(--color-accent);
	}
	
	.main-content {
		padding-top: 73px; /* Header height */
		min-height: 100vh;
	}
	
	/* Mobile responsive */
	@media (max-width: 640px) {
		.nav-container {
			padding: var(--space-3) var(--space-4);
		}
		
		.nav-links {
			gap: var(--space-4);
		}
		
		.nav-link {
			font-size: var(--text-xs);
		}
	}
</style>
