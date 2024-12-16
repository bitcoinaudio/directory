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
	  console.log('params', params);
	  console.log('address', address);
	  console.log('error', error);	
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
	<div class="text-center ">Connected Wallet Address: {walletAddress}</div>
  {:else if errorMessage}
	<div class="text-center">Error: {errorMessage}</div>
  {/if}
  



