<svelte:head>
	<title>Collections</title>
	<meta name="description" content="About this app" />
</svelte:head>
<script>
	import collections from '../../collections';
 	import Collections from '../../components/Collections.svelte';
	// import Gallery from '../../components/Gallery.svelte';
	import { walletConnected, isIOMOwner } from '../../stores';
	// import NonOwners from '../../components/NonOwners.svelte';

let isOwner = $isIOMOwner;


	</script>	

<Collections />

<!-- <div>
	<div>
		{#if $walletConnected}
			{#if !isOwner}
				<Gallery />
			{:else}
				<NonOwners />
			{/if}
		{/if}
	</div>
</div> -->




