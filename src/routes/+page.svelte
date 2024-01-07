<script>
	import welcome_fallback from '$lib/images/bitcoinaudio.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Bitcoin Audio Directory" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>
		Building a directory of Bitcoin Audio artists. 	
		
	</h1>
	<h2>A Collective.</h2>

	<h2>
		
	</h2>

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 75%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		/* height: 100%; */
		top: 0;
		display: block;
	}
</style>
