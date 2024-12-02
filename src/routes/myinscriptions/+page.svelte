
<script>
 	import { htmlArray, mimeArray, isIOMOwner } from '../../stores';

	let ordURL = "https://radinals.bitcoinaudio.co"
 async function getHTML() {

	console.log("htmlArray", $htmlArray)
	 
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

 
<div class="myInscriptions">
		{#await getHTML()}
		<p>Loading your inscriptions</p>
		{:then htmls}

				<!-- htmls -->
				{#each $htmlArray as html, index}
				<div class="card">
				 
					<div class="card-body shadow-inner">
					<iframe src={ordURL + '/content/' + html} title="" scrolling=no  allowfullscreen></iframe>
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
						<a class="tooltip" data-tip="Details" href={ ordURL + '/inscription/' + html} target="_blank">
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
						<a class="tooltip" data-tip="App" href={ordURL + '/content/' + html} target="_blank">
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

						{#if $isIOMOwner == true}
						<li>
							<a class="tooltip" data-tip="IOM" href={"https://arweave.net/0AphIk6Qiuu3RwGtYL02w9weo3Cci5Xp-M0LRgZ42Gg"} target="_blank">
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
						{/if}
 					</ul>
					</div>
		

				</div>
				{/each}
				<!-- end htmls -->

 
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