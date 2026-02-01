<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	
	/** @type {import('./$types').PageData} */
	export let data;
	
	$: site_config = data.site_config;
	$: home_config = site_config?.pages?.home || {};
	
	// Redirect to default route on mount
	onMount(() => {
		const redirectTo = home_config.redirect_to || site_config?.navigation?.default_route || '/profile';
		goto(redirectTo);
	});
</script>

<svelte:head>
	<title>{home_config.title || site_config?.site?.title || 'Loading...'}</title>
</svelte:head>

<div class="loading-container">
	<div class="loading-spinner"></div>
	<p class="loading-text">{home_config.loading_text || 'Loading...'}</p>
</div>

<style>
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: calc(100vh - 73px);
		gap: var(--space-4);
	}
	
	.loading-spinner {
		width: 48px;
		height: 48px;
		border: 3px solid var(--color-border-primary);
		border-top-color: var(--color-accent);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}
	
	@keyframes spin {
		to { transform: rotate(360deg); }
	}
	
	.loading-text {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
</style>
