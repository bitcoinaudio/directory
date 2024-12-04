<script>
	import collections from '../../collections';
 	let artist = "Kane Mayfield"
	let ordURL = "https://radinals.bitcoinaudio.co"
	let html = "32a3ebf3927d777ce547e755bf6eb6018c01fbb510f36a318654676b6d008291i0"
	let dustApp = collections[0].app
</script>
<svelte:head>
	<title>Directory</title>
	<meta name="description" content="Artist Directory" />

</svelte:head>

<div class="directory">
	<div class="Artist-card">
	<span><h2>Artist Name: {artist}</h2></span>

	<img src="" alt=""/>

	<iframe src={dustApp} title="" scrolling=no  allowfullscreen></iframe>

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
