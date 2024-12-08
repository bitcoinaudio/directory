<svelte:head>
	<title>My Inscribed Media</title>
	<meta name="description" content="My Wallet Media" />
</svelte:head>

<script>
	import { htmlArray } from '../../stores';
	import { onMount } from 'svelte';
	import ordImage from '../../lib/images/ordinals.svg';
	import iomImage from '../../lib/images/idseofmarch.png';

	let ordURL = "https://ordinals.com";

	onMount(() => {
		console.log("myinscriptions mounted");
	});
</script>

<div class="myInscriptions">
	{#if !$htmlArray || $htmlArray.length === 0}
		<p>Loading your inscriptions...</p>
	{:else}
		{#each $htmlArray as html, index}
			<div class="card">
				<div class="card-body shadow-inner">
					<iframe
						src={ordURL + '/content/' + html.id}
						title={"Inscription " + html.id}
						scrolling="no"
						allowfullscreen>
					</iframe>
				</div>
				<div class="card-actions justify-center">
					<ul class="menu menu-horizontal bg-base-200 rounded-box mt-1">
						<li>
							<a class="tooltip" data-tip="Home" href={ordURL} target="_blank">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
									/>
								</svg>
							</a>
						</li>
						<li>
							<a class="tooltip" data-tip="Details" href={ordURL + '/inscription/' + html.id} target="_blank">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</a>
						</li>
						<li>
							<a class="tooltip" data-tip="App" href={ordURL + '/content/' + html.id} target="_blank">
								<img class="size-5" src={ordImage} alt="IOM" />
							</a>
						</li>

						{#if html.isIOM}
							<li>
								<a class="tooltip" data-tip="IOM" href="https://arweave.net/0AphIk6Qiuu3RwGtYL02w9weo3Cci5Xp-M0LRgZ42Gg" target="_blank">
									<img class="size-8" src={iomImage} alt="IOM" />
								</a>
							</li>
						{/if}
					</ul>
				</div>
			</div>
		{/each}
	{/if}
</div>

<style>
	.myInscriptions {
		display: flex;
		flex-wrap: wrap;
		align-content: center;
		justify-content: center;
		align-items: center;
	}
	.card {
		margin: 1rem;
	}
	iframe {
		width: 300px;
		height: 200px;
		border: none;
	}
</style>
