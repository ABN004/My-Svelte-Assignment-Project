<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	
	/** @type {import('./$types').PageData} */
	export let data;
	
	$: site_config = data.site_config;
	$: dashboard_config = site_config?.pages?.dashboard || {};
	$: metrics = data.metrics;
	$: deployments = data.deployments;
	$: traffic = data.traffic;
	$: errors = data.errors;
	
	// Chart instances
	let trafficChart = null;
	let projectsChart = null;
	let dailyChart = null;
	
	// Chart container refs
	let trafficChartEl;
	let projectsChartEl;
	let dailyChartEl;
	
	// Loading states
	let chartsLoaded = false;
	let showAllErrors = false;
	
	// Format date helper
	function formatDate(dateString) {
		const date = new Date(dateString);
		const now = new Date();
		const diff = now - date;
		const hours = Math.floor(diff / (1000 * 60 * 60));
		const days = Math.floor(hours / 24);
		
		if (hours < 1) return 'Just now';
		if (hours < 24) return `${hours}h ago`;
		if (days < 7) return `${days}d ago`;
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}
	
	// Format time ago
	function formatTimeAgo(dateString) {
		const date = new Date(dateString);
		const now = new Date();
		const diff = now - date;
		const minutes = Math.floor(diff / (1000 * 60));
		const hours = Math.floor(minutes / 60);
		
		if (minutes < 1) return 'Just now';
		if (minutes < 60) return `${minutes}m ago`;
		if (hours < 24) return `${hours}h ago`;
		return formatDate(dateString);
	}
	
	// Get trend icon
	function getTrendIcon(direction) {
		if (direction === 'up') return '↑';
		if (direction === 'down') return '↓';
		return '→';
	}
	
	// Get trend class
	function getTrendClass(direction, isPositive = true) {
		if (direction === 'up') return isPositive ? 'trend-up' : 'trend-down';
		if (direction === 'down') return isPositive ? 'trend-down' : 'trend-up';
		return 'trend-stable';
	}
	
	// Initialize charts after ApexCharts loads
	function initCharts() {
		if (!browser || !window.ApexCharts) return;
		
		// Traffic Analytics Chart (Area Chart)
		const trafficOptions = {
			series: [{
				name: 'API Calls',
				data: traffic.monthly.data.map(d => d.api_calls)
			}, {
				name: 'Unique Users',
				data: traffic.monthly.data.map(d => d.unique_users)
			}],
			chart: {
				type: 'area',
				height: 350,
				fontFamily: 'DM Sans, sans-serif',
				background: 'transparent',
				toolbar: {
					show: false
				},
				animations: {
					enabled: true,
					easing: 'easeinout',
					speed: 800
				}
			},
			colors: ['#f97316', '#0ea5e9'],
			fill: {
				type: 'gradient',
				gradient: {
					shadeIntensity: 1,
					opacityFrom: 0.4,
					opacityTo: 0.1,
					stops: [0, 90, 100]
				}
			},
			stroke: {
				curve: 'smooth',
				width: 3
			},
			xaxis: {
				categories: traffic.monthly.data.map(d => d.month),
				labels: {
					style: {
						colors: '#94a3b8',
						fontSize: '12px'
					}
				},
				axisBorder: { show: false },
				axisTicks: { show: false }
			},
			yaxis: {
				labels: {
					style: {
						colors: '#94a3b8',
						fontSize: '12px'
					},
					formatter: (val) => {
						if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M';
						if (val >= 1000) return (val / 1000).toFixed(0) + 'K';
						return val;
					}
				}
			},
			grid: {
				borderColor: '#2a2a3a',
				strokeDashArray: 4
			},
			legend: {
				position: 'top',
				horizontalAlign: 'right',
				labels: {
					colors: '#94a3b8'
				}
			},
			tooltip: {
				theme: 'dark',
				y: {
					formatter: (val) => val.toLocaleString()
				}
			},
			dataLabels: {
				enabled: false
			}
		};
		
		if (trafficChartEl) {
			trafficChart = new window.ApexCharts(trafficChartEl, trafficOptions);
			trafficChart.render();
		}
		
		// Projects Distribution Chart (Donut)
		const projectsOptions = {
			series: traffic.by_project.map(p => p.percentage),
			chart: {
				type: 'donut',
				height: 280,
				fontFamily: 'DM Sans, sans-serif',
				background: 'transparent'
			},
			labels: traffic.by_project.map(p => p.project_id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())),
			colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899'],
			stroke: {
				show: false
			},
			legend: {
				position: 'bottom',
				labels: {
					colors: '#94a3b8'
				}
			},
			plotOptions: {
				pie: {
					donut: {
						size: '70%',
						labels: {
							show: true,
							name: {
								show: true,
								fontSize: '14px',
								color: '#94a3b8'
							},
							value: {
								show: true,
								fontSize: '24px',
								fontWeight: 700,
								color: '#f8fafc',
								formatter: (val) => val + '%'
							},
							total: {
								show: true,
								label: 'Total Traffic',
								fontSize: '12px',
								color: '#94a3b8',
								formatter: () => '100%'
							}
						}
					}
				}
			},
			dataLabels: {
				enabled: false
			},
			tooltip: {
				theme: 'dark'
			}
		};
		
		if (projectsChartEl) {
			projectsChart = new window.ApexCharts(projectsChartEl, projectsOptions);
			projectsChart.render();
		}
		
		// Daily Response Time Chart (Bar)
		const dailyOptions = {
			series: [{
				name: 'Avg Response Time',
				data: traffic.daily.data.map(d => d.avg_response_time)
			}],
			chart: {
				type: 'bar',
				height: 200,
				fontFamily: 'DM Sans, sans-serif',
				background: 'transparent',
				toolbar: { show: false },
				sparkline: { enabled: false }
			},
			colors: ['#10b981'],
			plotOptions: {
				bar: {
					borderRadius: 4,
					columnWidth: '60%'
				}
			},
			xaxis: {
				categories: traffic.daily.data.map(d => d.day),
				labels: {
					style: {
						colors: '#94a3b8',
						fontSize: '11px'
					}
				},
				axisBorder: { show: false },
				axisTicks: { show: false }
			},
			yaxis: {
				labels: {
					style: {
						colors: '#94a3b8',
						fontSize: '11px'
					},
					formatter: (val) => val + 'ms'
				}
			},
			grid: {
				borderColor: '#2a2a3a',
				strokeDashArray: 4
			},
			dataLabels: {
				enabled: false
			},
			tooltip: {
				theme: 'dark',
				y: {
					formatter: (val) => val + 'ms'
				}
			}
		};
		
		if (dailyChartEl) {
			dailyChart = new window.ApexCharts(dailyChartEl, dailyOptions);
			dailyChart.render();
		}
		
		chartsLoaded = true;
	}
	
	onMount(() => {
		// Load ApexCharts script
		// const script = document.createElement('script');
		// script.src = '/lib/apexcharts/apexcharts.min.js';
		// script.onload = () => {
			// Small delay to ensure DOM is ready
			setTimeout(initCharts, 100);
		// };
		// document.head.appendChild(script);
		//
		// return () => {
		// 	// Cleanup charts on unmount
		// 	if (trafficChart) trafficChart.destroy();
		// 	if (projectsChart) projectsChart.destroy();
		// 	if (dailyChart) dailyChart.destroy();
		// };
	});
</script>

<svelte:head>
	<title>{dashboard_config.title || 'Dashboard'}</title>
	<meta name="description" content={dashboard_config.meta_description || 'Developer analytics dashboard'} />
</svelte:head>

<div class="dashboard-page">
	<!-- Page Header -->
	<div class="page-header">
		<div class="container">
			<div class="header-content">
				<div class="header-info">
					<h1 class="page-title">Analytics Dashboard</h1>
					<p class="page-subtitle">Monitor your project performance and system health</p>
				</div>
				<div class="header-meta">
					<span class="last-updated">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<circle cx="12" cy="12" r="10"/>
							<polyline points="12 6 12 12 16 14"/>
						</svg>
						Updated {formatTimeAgo(metrics.last_updated)}
					</span>
				</div>
			</div>
		</div>
	</div>

	<!-- ============================================
	     METRICS OVERVIEW (SSR)
	     ============================================ -->
	<section class="section metrics-section">
		<div class="container">
			<div class="metrics-grid">
				{#each Object.entries(metrics.overview) as [key, metric]}
					<div class="metric-card">
						<div class="metric-icon">{metric.icon}</div>
						<div class="metric-content">
							<span class="metric-value">
								{metric.formatted || metric.value.toLocaleString()}
							</span>
							<span class="metric-label">{metric.label}</span>
						</div>
						<div class="metric-trend {getTrendClass(metric.trend.direction, key !== 'error_rate')}">
							<span class="trend-icon">{getTrendIcon(metric.trend.direction)}</span>
							<span class="trend-value">{metric.trend.value}{key === 'error_rate' || key === 'uptime' ? '%' : ''}</span>
							<span class="trend-period">{metric.trend.period}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ============================================
	     CHARTS SECTION (CSR)
	     ============================================ -->
	<section class="section charts-section">
		<div class="container">
			<div class="charts-grid">
				<!-- Traffic Analytics Chart -->
				<div class="chart-card chart-large">
					<div class="chart-header">
						<h3 class="chart-title">Traffic Analytics</h3>
						<span class="chart-period">{traffic.monthly.period}</span>
					</div>
					<div class="chart-body">
						{#if !chartsLoaded}
							<div class="chart-loading">
								<div class="loading-spinner"></div>
								<span>Loading chart...</span>
							</div>
						{/if}
						<div bind:this={trafficChartEl} class="chart-container"></div>
					</div>
				</div>
				
				<!-- Projects Distribution -->
				<div class="chart-card">
					<div class="chart-header">
						<h3 class="chart-title">Traffic by Project</h3>
					</div>
					<div class="chart-body">
						{#if !chartsLoaded}
							<div class="chart-loading">
								<div class="loading-spinner"></div>
								<span>Loading chart...</span>
							</div>
						{/if}
						<div bind:this={projectsChartEl} class="chart-container"></div>
					</div>
				</div>
				
				<!-- Daily Response Time -->
				<div class="chart-card">
					<div class="chart-header">
						<h3 class="chart-title">Response Time</h3>
						<span class="chart-period">{traffic.daily.period}</span>
					</div>
					<div class="chart-body">
						{#if !chartsLoaded}
							<div class="chart-loading">
								<div class="loading-spinner"></div>
								<span>Loading chart...</span>
							</div>
						{/if}
						<div bind:this={dailyChartEl} class="chart-container"></div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ============================================
	     ERROR LOGS PANEL (CSR - On Interaction)
	     ============================================ -->
	<section class="section errors-section">
		<div class="container">
			<div class="panel-grid">
				<!-- Error Logs -->
				<div class="panel-card">
					<div class="panel-header">
						<h3 class="panel-title">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<circle cx="12" cy="12" r="10"/>
								<line x1="12" y1="8" x2="12" y2="12"/>
								<line x1="12" y1="16" x2="12.01" y2="16"/>
							</svg>
							Recent Errors
						</h3>
						<div class="error-summary">
							<span class="summary-item critical">{errors.summary.critical} Critical</span>
							<span class="summary-item warning">{errors.summary.warning} Warning</span>
							<span class="summary-item pending">{errors.summary.pending} Pending</span>
						</div>
					</div>
					<div class="panel-body">
						<div class="error-list">
							{#each errors.recent as error}
								<div class="error-item level-{error.level}">
									<div class="error-level">
										<span class="level-dot"></span>
									</div>
									<div class="error-content">
										<div class="error-header">
											<span class="error-code">{error.code}</span>
											<span class="error-project">{error.project}</span>
											<span class="error-time">{formatTimeAgo(error.timestamp)}</span>
										</div>
										<p class="error-message">{error.message}</p>
									</div>
									<div class="error-status">
										{#if error.resolved}
											<span class="status-badge resolved">Resolved</span>
										{:else}
											<span class="status-badge pending">Pending</span>
										{/if}
									</div>
								</div>
							{/each}
						</div>
						{#if errors.recent.length >= 5}
							<button class="view-more-btn" on:click={() => showAllErrors = !showAllErrors}>
								{showAllErrors ? 'Show Less' : 'View All Errors'}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<polyline points="{showAllErrors ? '18 15 12 9 6 15' : '6 9 12 15 18 9'}"/>
								</svg>
							</button>
						{/if}
					</div>
				</div>

				<!-- Deployment Status -->
				<div class="panel-card">
					<div class="panel-header">
						<h3 class="panel-title">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
								<polyline points="22 4 12 14.01 9 11.01"/>
							</svg>
							Deployment Status
						</h3>
					</div>
					<div class="panel-body">
						<div class="deployment-list">
							{#each deployments.deployments as deployment}
								<div class="deployment-item status-{deployment.status}">
									<div class="deployment-info">
										<div class="deployment-header">
											<span class="deployment-name">{deployment.project_name}</span>
											<span class="deployment-status" style="background: {deployments.status_config[deployment.status]?.color}">
												{deployments.status_config[deployment.status]?.icon} {deployments.status_config[deployment.status]?.label}
											</span>
										</div>
										<div class="deployment-meta">
											<span class="meta-item">v{deployment.version}</span>
											<span class="meta-item">{deployments.regions[deployment.region]}</span>
											<span class="meta-item">{formatDate(deployment.last_deployed)}</span>
										</div>
										{#if deployment.status_message}
											<p class="deployment-warning">{deployment.status_message}</p>
										{/if}
									</div>
									<div class="deployment-metrics">
										<div class="resource-bar">
											<span class="resource-label">CPU</span>
											<div class="bar-track">
												<div class="bar-fill" style="width: {deployment.cpu}%; background: {deployment.cpu > 80 ? '#ef4444' : deployment.cpu > 60 ? '#f59e0b' : '#10b981'}"></div>
											</div>
											<span class="resource-value">{deployment.cpu}%</span>
										</div>
										<div class="resource-bar">
											<span class="resource-label">MEM</span>
											<div class="bar-track">
												<div class="bar-fill" style="width: {deployment.memory}%; background: {deployment.memory > 80 ? '#ef4444' : deployment.memory > 60 ? '#f59e0b' : '#10b981'}"></div>
											</div>
											<span class="resource-value">{deployment.memory}%</span>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	/* ============================================
	   DASHBOARD PAGE
	   ============================================ */
	.dashboard-page {
		min-height: 100vh;
		background: var(--color-bg-primary);
	}

	/* ============================================
	   PAGE HEADER
	   ============================================ */
	.page-header {
		padding: var(--space-8) 0;
		background: var(--gradient-hero);
		border-bottom: 1px solid var(--color-border-primary);
	}
	
	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-4);
	}
	
	.page-title {
		font-size: var(--text-3xl);
		font-weight: 800;
		margin-bottom: var(--space-1);
	}
	
	.page-subtitle {
		font-size: var(--text-base);
		color: var(--color-text-tertiary);
		margin-bottom: 0;
	}
	
	.last-updated {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	/* ============================================
	   METRICS SECTION (SSR)
	   ============================================ */
	.metrics-section {
		padding: var(--space-8) 0;
	}
	
	.metrics-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-4);
	}
	
	@media (min-width: 768px) {
		.metrics-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	
	@media (min-width: 1024px) {
		.metrics-grid {
			grid-template-columns: repeat(6, 1fr);
		}
	}
	
	.metric-card {
		background: var(--color-card-bg);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-xl);
		padding: var(--space-5);
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		transition: all var(--transition-base);
	}
	
	.metric-card:hover {
		border-color: var(--color-border-secondary);
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
	}
	
	.metric-icon {
		font-size: var(--text-2xl);
	}
	
	.metric-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}
	
	.metric-value {
		font-size: var(--text-2xl);
		font-weight: 800;
		color: var(--color-text-primary);
	}
	
	.metric-label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}
	
	.metric-trend {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		font-size: var(--text-xs);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-md);
		width: fit-content;
	}
	
	.metric-trend.trend-up {
		background: var(--color-success-light);
		color: var(--color-success);
	}
	
	.metric-trend.trend-down {
		background: var(--color-error-light);
		color: var(--color-error);
	}
	
	.metric-trend.trend-stable {
		background: var(--color-bg-tertiary);
		color: var(--color-text-muted);
	}
	
	.trend-period {
		color: inherit;
		opacity: 0.8;
	}

	/* ============================================
	   CHARTS SECTION (CSR)
	   ============================================ */
	.charts-section {
		padding: var(--space-8) 0;
		background: var(--color-bg-secondary);
	}
	
	.charts-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-6);
	}
	
	@media (min-width: 1024px) {
		.charts-grid {
			grid-template-columns: 2fr 1fr;
		}
		
		.chart-large {
			grid-row: span 2;
		}
	}
	
	.chart-card {
		background: var(--color-card-bg);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-xl);
		overflow: hidden;
	}
	
	.chart-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-5);
		border-bottom: 1px solid var(--color-border-primary);
	}
	
	.chart-title {
		font-size: var(--text-lg);
		font-weight: 700;
		margin: 0;
	}
	
	.chart-period {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	
	.chart-body {
		padding: var(--space-4);
		position: relative;
		min-height: 200px;
	}
	
	.chart-container {
		width: 100%;
	}
	
	.chart-loading {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-3);
		background: var(--color-card-bg);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}
	
	.loading-spinner {
		width: 32px;
		height: 32px;
		border: 3px solid var(--color-border-primary);
		border-top-color: var(--color-accent);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}
	
	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	/* ============================================
	   PANELS SECTION
	   ============================================ */
	.errors-section {
		padding: var(--space-8) 0 var(--space-16);
	}
	
	.panel-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-6);
	}
	
	@media (min-width: 1024px) {
		.panel-grid {
			grid-template-columns: 1fr 1fr;
		}
	}
	
	.panel-card {
		background: var(--color-card-bg);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-xl);
		overflow: hidden;
	}
	
	.panel-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-3);
		padding: var(--space-5);
		border-bottom: 1px solid var(--color-border-primary);
	}
	
	.panel-title {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: var(--text-lg);
		font-weight: 700;
		margin: 0;
	}
	
	.panel-title svg {
		color: var(--color-accent);
	}
	
	.error-summary {
		display: flex;
		gap: var(--space-3);
	}
	
	.summary-item {
		font-size: var(--text-xs);
		font-weight: 600;
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-md);
	}
	
	.summary-item.critical {
		background: var(--color-error-light);
		color: var(--color-error);
	}
	
	.summary-item.warning {
		background: var(--color-warning-light);
		color: var(--color-warning);
	}
	
	.summary-item.pending {
		background: var(--color-info-light);
		color: var(--color-info);
	}
	
	.panel-body {
		padding: var(--space-4);
	}

	/* ============================================
	   ERROR LIST
	   ============================================ */
	.error-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}
	
	.error-item {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
		padding: var(--space-4);
		background: var(--color-bg-secondary);
		border-radius: var(--radius-lg);
		border-left: 3px solid transparent;
	}
	
	.error-item.level-critical {
		border-left-color: var(--color-error);
	}
	
	.error-item.level-warning {
		border-left-color: var(--color-warning);
	}
	
	.error-item.level-info {
		border-left-color: var(--color-info);
	}
	
	.error-level {
		flex-shrink: 0;
		padding-top: var(--space-1);
	}
	
	.level-dot {
		display: block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}
	
	.level-critical .level-dot { background: var(--color-error); }
	.level-warning .level-dot { background: var(--color-warning); }
	.level-info .level-dot { background: var(--color-info); }
	
	.error-content {
		flex: 1;
		min-width: 0;
	}
	
	.error-header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-2);
		margin-bottom: var(--space-1);
	}
	
	.error-code {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 600;
		color: var(--color-text-primary);
	}
	
	.error-project {
		font-size: var(--text-xs);
		color: var(--color-accent);
		background: var(--color-accent-light);
		padding: 2px 6px;
		border-radius: var(--radius-sm);
	}
	
	.error-time {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin-left: auto;
	}
	
	.error-message {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		margin: 0;
		line-height: 1.5;
	}
	
	.error-status {
		flex-shrink: 0;
	}
	
	.status-badge {
		font-size: var(--text-xs);
		font-weight: 600;
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-md);
	}
	
	.status-badge.resolved {
		background: var(--color-success-light);
		color: var(--color-success);
	}
	
	.status-badge.pending {
		background: var(--color-warning-light);
		color: var(--color-warning);
	}
	
	.view-more-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		width: 100%;
		padding: var(--space-3);
		margin-top: var(--space-4);
		background: var(--color-bg-tertiary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-lg);
		color: var(--color-text-secondary);
		font-size: var(--text-sm);
		font-weight: 500;
		cursor: pointer;
		transition: all var(--transition-fast);
	}
	
	.view-more-btn:hover {
		background: var(--color-bg-elevated);
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	/* ============================================
	   DEPLOYMENT LIST
	   ============================================ */
	.deployment-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}
	
	.deployment-item {
		padding: var(--space-4);
		background: var(--color-bg-secondary);
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}
	
	@media (min-width: 640px) {
		.deployment-item {
			flex-direction: row;
			align-items: center;
		}
	}
	
	.deployment-info {
		flex: 1;
	}
	
	.deployment-header {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-bottom: var(--space-2);
	}
	
	.deployment-name {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-text-primary);
	}
	
	.deployment-status {
		font-size: var(--text-xs);
		font-weight: 600;
		color: white;
		padding: 2px 8px;
		border-radius: var(--radius-full);
	}
	
	.deployment-meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
	}
	
	.deployment-meta .meta-item {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}
	
	.deployment-warning {
		font-size: var(--text-xs);
		color: var(--color-warning);
		margin: var(--space-2) 0 0;
		padding: var(--space-2);
		background: var(--color-warning-light);
		border-radius: var(--radius-md);
	}
	
	.deployment-metrics {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		min-width: 150px;
	}
	
	.resource-bar {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}
	
	.resource-label {
		font-size: var(--text-xs);
		font-weight: 600;
		color: var(--color-text-muted);
		width: 30px;
	}
	
	.bar-track {
		flex: 1;
		height: 6px;
		background: var(--color-bg-tertiary);
		border-radius: var(--radius-full);
		overflow: hidden;
	}
	
	.bar-fill {
		height: 100%;
		border-radius: var(--radius-full);
		transition: width var(--transition-base);
	}
	
	.resource-value {
		font-size: var(--text-xs);
		font-weight: 600;
		color: var(--color-text-secondary);
		width: 35px;
		text-align: right;
	}

	/* ============================================
	   RESPONSIVE ADJUSTMENTS
	   ============================================ */
	@media (max-width: 640px) {
		.page-title {
			font-size: var(--text-2xl);
		}
		
		.header-content {
			flex-direction: column;
			align-items: flex-start;
		}
		
		.metric-card {
			padding: var(--space-4);
		}
		
		.metric-value {
			font-size: var(--text-xl);
		}
		
		.error-summary {
			flex-wrap: wrap;
		}
		
		.error-item {
			flex-direction: column;
		}
		
		.error-time {
			margin-left: 0;
		}
		
		.error-status {
			align-self: flex-start;
		}
	}
</style>

