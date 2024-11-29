
<script>
 	import { htmlarray } from '../../stores';
 async function getHTML() {

	console.log("htmlarray", $htmlarray)
	 
 }

 function handleSubmit() {
	console.log(selected)
 }
	
 let selected;
</script>
<svelte:head>
	<title>My Wallet Media</title>
	<meta name="description" content="My Wallet Media" />
</svelte:head>	


	<select class="dropdown" bind:value={selected} on:load={getHTML} on:change={handleSubmit}>
 		{#await getHTML()}
		<p>.Loading bitmaps</p>
		{:then htmls}
				{#each $htmlarray as html, index}
				<option value={index}>{html}</option>

				{/each}
		{/await}
	</select>
<div class="myInscriptions">
		{#await getHTML()}
		<p>.Loading your inscriptions</p>
		{:then htmls}
				{#each $htmlarray as html, index}
				<div class="card">
					<!-- <p>{html}</p> -->
					<!-- <a href={html} target="" ></a> -->

					<div class="card-body shadow-inner">
					<iframe src={html} title="" scrolling=no  allowfullscreen></iframe>
				</div>
				<div  class="card-actions justify-center">
					<ul class="menu menu-horizontal bg-base-200 rounded-box mt-1">
					  <li>
						<!-- svelte-ignore a11y-missing-attribute -->
						<a class="tooltip" data-tip="Home">
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
							  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
						  </svg>
						</a>
					  </li>
					  <li>
						<a class="tooltip" data-tip="Details" href={html} target="_blank">
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
							  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						  </svg>
						</a>
					  </li>
					  <li>
						<a class="tooltip" data-tip="App" href={html}} target="_blank">
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
							  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
						  </svg>
						</a>
					  </li>
					</ul>
					</div>
		

				</div>

				{/each}
		{/await}
	</div>

<style>
	.myInscriptions {
		display: flex;
		flex-wrap: wrap;
		align-content: center;
		justify-content: center;
		align-items: center;
	}
</style>