<script>
	import { page } from '$app/stores';
	let artist = "Kane Mayfield"
</script>
<svelte:head>
	<title>Directory</title>
	<meta name="description" content="Artist Directory" />

</svelte:head>

<div class="directory">
	<div class="Artist-card">
	<span><h2>Artist Name: {artist}</h2></span>

	<img src="" alt=""/>

	<iframe id="dirIFrame" src="https://uvkfwela7sn5mydishqhefbgy6cicxw5ycdci2e66hnywycdveoq.arweave.net/pVRbEWD8m9ZgaJHgchQmx4SBXt3AhiRonvHbi2BDqR0/" title="Dust" style="border:0px #ffffff none;" name="Dust" scrolling="no" frameborder="1" 
	 allowfullscreen></iframe>
	
	</div>
</div>

<style>
	.directory {
		display: flex;
	justify-content: center;
	}

	#dirIFrame {
		height: 1200px;
		width: 1000px;
	}
	.Artist-card {
		align-content: center;
	}
</style>
