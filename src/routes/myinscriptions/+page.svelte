
<script>
	import GetMyBitmaps from '../../components/Connect.svelte';
	import { htmlarray } from '../../stores';
 async function getHTML() {

	
	GetMyBitmaps
 }

 function handleSubmit() {
	console.log(selected)
 }
	
 let selected;
</script>
<svelte:head>
	<title>My Inscriptions</title>
	<meta name="description" content="My Inscriptions" />
</svelte:head>

<!-- 
	<select class="dropdown" bind:value={selected} on:load={getHTML} on:change={handleSubmit}>
		<option>My Inscriptions</option>
		{#await getHTML()}
		<p>.Loading bitmaps</p>
		{:then htmls}
				{#each $htmlarray as html, index}
				<option value={index}>{html}</option>

				{/each}
		{/await}
	</select> -->
<div class="myInscriptions">
		{#await getHTML()}
		<p>.Loading your inscriptions</p>
		{:then htmls}
				{#each $htmlarray as html, index}
				<div class="html-card">
					<!-- <p>{html}</p> -->
					<!-- <a href={html} >{html}</a> -->

					<iframe src={html} title="" scrolling=no  allowfullscreen></iframe>

				</div>

				{/each}
		{/await}
	</div>

<style>
	.myInscriptions {
		display: flex;
		flex-wrap: wrap;
		align-content: center;
		justify-content: center;
		align-items: center;
	}
</style>