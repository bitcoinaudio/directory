<svelte:head>
	<title>Collections</title>
	<meta name="description" content="About this app" />
</svelte:head>
<script>
	import Feature from '../../components/Feature.svelte';	
	import Samplerr from '../../components/Samplerr.svelte';
 </script>

 <div id="samplerr" class="hero flex justify-center shadow-lg shadow-black rounded-lg bg-black-800/80">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="text-center lg:text-start">
			<h1 class="font-urbanist text-lg font-black uppercase md:text-5xl">
				Introducing
					   <span class="text-black/70">The Samplerr</span>				   
			</h1>

			<p class="text-xl text-center">built by <a href="https://bitcoinaudio.co" target="_blank">Bitcoin Audio</a></p>
			<div class="flex justify-center">
				<Samplerr />	

			<!-- <iframe src="https://ordinals.com/content/b1ade815da823de16f0dc26417c5bfb9caefc9005f0e9585b1f0072eb7e43605i0" title="ordinal" scrolling=no  allowfullscreen ></iframe> -->
			</div>
		</div>

		
		<p class="text-3xl">
			Introducing the Samplerr, a groundbreaking tool that allows you to sample and create music on Bitcoin Ordinals.	
		</p>
	  </div>
	</div>	
 
<!-- <Feature /> -->
