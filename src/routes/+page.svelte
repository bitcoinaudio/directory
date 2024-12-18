<script>
	import welcome_fallback from '$lib/images/bitcoinaudio.png';
	import Hero from '../components/Hero.svelte';
	import Feature from '../components/Feature.svelte';	
	import Samplerr from '../components/Samplerr.svelte';
 </script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Bitcoin Audio Directory" />
</svelte:head>

<section>
	<Hero />
 	<Feature />
	
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}



</style>
