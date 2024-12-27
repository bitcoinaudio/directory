<svelte:head>
	<title>Satoshi-NK-1</title>
	<meta name="description" content="My Wallet Media" />
</svelte:head>

<script>
	import { htmlArray } from '../../stores';
	import { onMount } from 'svelte';
	import ordImage from '../../lib/images/ordinals.svg';
	import iomImage from '../../lib/images/idesofmarch.png';
	import { walletConnected, isIOMOwner } from '../../stores';
	let ordURL = "https://ordinals.com";

	onMount(() => {
		console.log("myinscriptions mounted");
	});
</script>

 
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
		width: 400px;
		height: 300px;
		border: none;
	}
</style>
