<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	
	// Redirect to profile page on mount
	onMount(() => {
		goto('/profile');
	});
</script>

<svelte:head>
	<title>Amal B Nair | Developer Portfolio</title>
</svelte:head>

<div class="loading-container">
	<div class="loading-spinner"></div>
	<p class="loading-text">Loading Portfolio...</p>
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
