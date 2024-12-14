<script>
	import { onMount } from 'svelte';
 	import { isMobile, isAndroid, isIOS } from '../stores';
	import './app.css';
 	import NavBar from '../components/NavBar.svelte';


	onMount(() => {
		if (/Android|iPhone/i.test(navigator.userAgent)) {
			isMobile.set(true);
			isAndroid.set(/Android/i.test(navigator.userAgent));
			isIOS.set(/iPhone/i.test(navigator.userAgent));
 		}
		console.log("$isMobile", $isMobile);
		console.log("$isAndroid", $isAndroid);
		console.log("$isIOS", $isIOS);
 	});
	
 </script>

<div class="app bg-base-100 items-center w-full" >
	<!-- <Header /> -->
 	<NavBar />
 	<main>
		<slot />
	</main>

	<footer>
		 <!-- <Contact /> -->
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		/* max-width: 64rem; */
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
