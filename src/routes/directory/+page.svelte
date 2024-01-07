<script>
	import { page } from '$app/stores';
	let artist = "Kane Mayfield"
</script>
<svelte:head>
	<title>Directory</title>
	<meta name="description" content="Artist Directory" />

</svelte:head>

<div class="text-column">
	<h1>Artist Name: {artist}</h1>
	<img src="" alt=""/>

	<p>
		<li aria-current={$page.url.pathname === '/artists/'+{artist} ? 'page' : undefined}>
			<a href='/artists/{artist}'>{artist}</a>
		</li>
	</p>

	
</div>
