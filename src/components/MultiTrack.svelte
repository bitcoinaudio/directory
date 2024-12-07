<script>
	import { onMount } from 'svelte';
	import {
		albumsIndex, 
 		isPlayingStore,
		prodVideo,
		randomItems,
		randomTrack,
		samplerrTrackURL,
		selectedCombo,
		selectedItems,
		trackIndex,
		trackTitle,
		takeoverMode
	} from '../store';

	import TimelineSlider from './TimelineSlider.svelte';
	import VolumeSlider from './VolumeSlider.svelte';
	import '@fontsource/material-symbols-outlined';
	import { producers, randomSelection, artistCombinations, albums } from '../iom.js';
	

	let trackPlaying = $isPlayingStore;
	let volumemuted = false;
	let volume = 0.5;
	let maxVolume = 100;
	let volumeSliderValue = 50;
	let audioPlayer;
	let currentTime = 0;
	let timeline = 0;
	let duration;
	let trackLoaded = false;
	let trackindex = 0;
	let albumTracks = [];
	let sliderValue = 0;
	export let audioTrack;
	let imageUrl = $randomItems.producerLogo; 

	// Subscribe to isPlayingStore to handle play/pause
	isPlayingStore.subscribe((value) => {
		if (audioPlayer) {
			value ? audioPlayer.play() : audioPlayer.pause();
		}
	});

	$: if (selectedCombo) {
		samplerrTrackURL.set($randomItems.audio);
		trackIndex.set(trackindex);
		switchTrack();
		playPause();
	}

	export function playPause() {
		if (!audioPlayer) return;

		if (!trackPlaying) {
			audioPlayer.currentTime = $takeoverMode ? currentTime : 0;
			audioPlayer.play();
			trackPlaying = true;
			navigator.mediaSession.playbackState = "playing";
		} else {
			audioPlayer.pause();
			audioPlayer.currentTime = currentTime; 
			trackPlaying = false;
			navigator.mediaSession.playbackState = "paused";
		}
	}

	export async function updateSelected() {
		try {
			
			let selectedCombination = artistCombinations[$albumsIndex].toString();
			const albumResponse = await fetch(`./IOM/${selectedCombination}/${selectedCombination}.json`);
			if (!albumResponse.ok) {
				throw new Error(`Album metadata not found for: ${selectedCombination}`);
			}
			const album = albums.find((a) => a.name === selectedCombination);
			const tracks = await albumResponse.json();
			albumTracks = tracks.tracks;

			const trackname = `./IOM/${selectedCombination}/${albumTracks[trackindex].filename}_${selectedCombination}.mp3`;
			const tracktitle = albumTracks[trackindex].title;
			const selectedvideo = `./videos/${albumTracks[trackindex].producer}/${albumTracks[trackindex].filename}.mp4`;

			const artistArray = albumTracks[trackindex].albumartists.split('_');
			const artistImages = artistArray.map((name) => `${name}.jpg`);
			randomTrack.set(trackname);
			prodVideo.set(selectedvideo);
 			trackTitle.set(tracktitle);

			audioTrack = trackname;
			randomItems.set({
				albumName: albumTracks[trackindex].albumartists,
				albumIndex: $albumsIndex,
				artist: albumTracks[trackindex].artist,
				artistArray: artistArray,
				artistImage: artistImages,
				audio: trackname,
				metadataPath: `./IOM/${selectedCombination}/${selectedCombination}.json`,
				producer: albumTracks[trackindex].producer,
				producerIndex: producers.findIndex((p) => p.alias === albumTracks[trackindex].producer),
				producerLogo: producers.find((p) => p.alias === albumTracks[trackindex].producer).logo,
				producerName: producers.find((p) => p.alias === albumTracks[trackindex].producer).name,
				tracks: albumTracks,
				trackProducer: albumTracks[trackindex].producer,
				trackAlbum: albumTracks[trackindex].album,
				trackIndex: trackindex,
				video: selectedvideo
			});
		} catch (error) {
			console.error('Error updating selection:', error);
		}
	}

	export function loadTrack() {
		updateSelected();
		handleLoadedAudio();
		setupMediaSession();
		audioPlayer.src = $randomItems.audio;
	}

	function saveCurrentTime() {
		if (audioPlayer) {
			currentTime = audioPlayer.currentTime;
		}
	}

	function setupMediaSession() {
		if ('mediaSession' in navigator) {
			navigator.mediaSession.metadata = new MediaMetadata({
				title: 'Ides of March - ' + $randomItems.producerName,
				artist: `${$randomItems.artist}`,
				album: `${$randomItems.albumName}`,
				artwork: [{ src: './images/ceasar-bg.jpg', type: 'image/jpg' }]
			});

			navigator.mediaSession.setActionHandler('play', playPause);
			navigator.mediaSession.setActionHandler('pause', playPause);
			navigator.mediaSession.setActionHandler('previoustrack', prevTrack);
			navigator.mediaSession.setActionHandler('nexttrack', nextTrack);
			navigator.mediaSession.setActionHandler('seekbackward', () =>
				timeChange(audioPlayer.currentTime - 5)
			);
			navigator.mediaSession.setActionHandler('seekforward', () =>
				timeChange(audioPlayer.currentTime + 5)
			);
		}
	}

	function handleLoadedAudio() {
		audioPlayer.currentTime = currentTime;
		trackLoaded = true;
	}

	function format(seconds) {
		const minutes = Math.floor(seconds / 60);
		seconds = Math.floor(seconds % 60);
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	}

	function getPercentage(currentTime) {
		return `${(Math.floor(currentTime) / duration) * 100}%`;
	}

	function timeChange(sliderValue) {
		timeline = sliderValue;
		currentTime = sliderValue;
	}

	function switchTrack() {
		if (trackPlaying) {
			loadTrack();
			audioPlayer.play();
			trackPlaying = true;
		}
	}

	function prevTrack() {
		trackindex = trackindex > 0 ? trackindex - 1 : albumTracks.length - 1;
		switchTrack();
	}

	function nextTrack() {
		trackindex = trackindex < albumTracks.length - 1 ? trackindex + 1 : 0;
		switchTrack();
	}

	function changeVolume(volumeSliderValue) {
		volume = volumeSliderValue / 100;
		volumemuted = volume === 0;
	}

	function muteUnmute() {
		volumemuted = !volumemuted;
		volume = volumemuted ? 0 : 0.5;
	}

	onMount(() => {
		trackindex = 0;
		loadTrack();

		if (audioPlayer) {
			audioPlayer.addEventListener('pause', saveCurrentTime);
			audioPlayer.addEventListener('ended', saveCurrentTime);
		}
	});
</script>

<div class=" controls md:p-4">
	<div class="md:grid md:grid-rows-2">
		<select class="select font-mono" name="albums" bind:value={$albumsIndex} on:change={loadTrack}>
			{#each artistCombinations as album, index}
				<option class="option" value={index}>Album: {album} </option>
			{/each}
		</select>

		<select class="select font-mono" name="tracks" bind:value={trackindex} on:change={loadTrack}>
			{#each albumTracks as track, index}
				<option class="option" value={index}>Track: {track.title}</option>
			{/each}
		</select>
	</div>

	<div id="timeline" class="timeline-slider">
		<div class="timeline">
			<small class="time">{format(timeline)}</small>
			<small class="fulltime">{format(duration)}</small>
		</div>
		<TimelineSlider
			min={0}
			max={duration}
			{timeline}
			{getPercentage}
			{timeChange}
			{sliderValue}
			thumbsliderImage={$randomItems.producerLogo}
			step={0.1}
		/>
	</div>

	

	<div class="grid grid-cols-3 grid-rows-2 gap-4 p-4 justify-center md:flex md:justify-center text-2xl p-2 md:gap-4">
		<button id="prevbtn" on:click={prevTrack}>
			<span class="material-symbols-outlined"> fast_rewind </span>
		</button>
		<button id="btnmain" on:click={playPause}>
			<span class="material-symbols-outlined">{trackPlaying ? 'pause' : 'play_arrow'}</span>
		</button>
		<button id="nextbtn" on:click={nextTrack}>
			<span class="material-symbols-outlined"> fast_forward </span>
		</button>
	</div>
</div>

<audio
	id="audioPlayer"
	bind:this={audioPlayer}
	on:loadeddata={handleLoadedAudio}
	bind:duration
	bind:currentTime={timeline}
	on:ended={nextTrack}
	bind:volume
	hidden
>
	<source src={audioTrack} />
</audio>

<style>
	.timeline-slider {
		margin: 0em auto;
		max-width: 20em;
	}

	.timeline {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.controls {
		background-color: #1313138e;
		border: #1c2023;
		font-family: 'Material Symbols Outlined';
		font-size: 1em;
		border-radius: 6px;
		border-color: rgba(0, 0, 0, 0.53);
		border-width: 1px;
	}

	.select {
		font-family: 'Josefin Sans Variable', serif;
		src: url("./assets/fonts/JosefinSans-VariableFont_wght.ttf");
		background-color: #1f1e1e14;
	}

	.select option {
		background-color: black;
		color: white;
	}

	.select::-webkit-listbox {
		background-color: black;
		color: white;
	}

	.select:-moz-focusring {
		color: transparent;
		text-shadow: 0 0 0 white;
	}

	.select:focus {
		background-color: black;
		color: white;
	}
</style>