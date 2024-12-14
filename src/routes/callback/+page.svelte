<svelte:head>
 	<meta name="description" content="The Ides of March Collection" />
</svelte:head>
<script>
	import { onMount } from 'svelte';
  
	let walletAddress = null;
	let errorMessage = null;
  
	onMount(() => {
	  // Parse the query parameters from the URL
	  const params = new URLSearchParams(window.location.search);
	  const address = params.get('address');
	  const error = params.get('error');
  
	  if (address) {
		walletAddress = address;
		console.log('Connected Address:', walletAddress);
	  } else if (error) {
		errorMessage = error;
		console.error('Connection Error:', errorMessage);
	  }
	});
  </script>
  
  {#if walletAddress}
	<div>Connected Wallet Address: {walletAddress}</div>
  {:else if errorMessage}
	<div>Error: {errorMessage}</div>
  {/if}
  



