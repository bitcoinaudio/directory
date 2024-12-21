<script>
	import {onMount} from 'svelte';
	import { page } from '$app/stores';
 	
	$: {
	  const query = $page.url.searchParams;
	  const status = query.get('status');
	  const signature = query.get('signature');
	  
	  // Now you can handle these values as needed:
	  // - If status === 'success', show a success message or store the signature.
	  // - If status === 'error', inform the user something went wrong.
	}

	onMount(() => {
		console.log("Callback parameters:", $page.url.searchParams);
	});
  </script>
  
  <h1>Callback Page</h1>
  
  {#if $page.url.searchParams.get('status') === 'success'}
	<p>Transaction/Signature received successfully!</p>
	<!-- Additional UI or logic goes here -->
  {:else}
	<p>Waiting for wallet response...</p>
  {/if}
  