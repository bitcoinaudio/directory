<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import logounisat from '$lib/images/logo-unisat.png';
	import { htmlArray, unisatAccounts, walletConnected, walletUnisatConnected, walletXverseConnected } from '../stores';
	import idesofmarch from '../lib/collections/idesofmarch.json';
	import { get } from 'svelte/store';

	let winuni = globalThis.unisat;
	let htmlarray = [];
	export let accounts = unisatAccounts;
	let showModal = false;

	// Precompute the Ides Of March IDs
	const idesOfMarchIDs = idesofmarch.map((item) => item.id);

	function checkIOMOwnership(insID) {
		return idesOfMarchIDs.includes(insID);
	}

	async function ConnectWallet() {
		walletXverseConnected.set(false);

		try {
			if (typeof winuni !== 'undefined') {
				accounts = await winuni.requestAccounts();
				walletUnisatConnected.set(true);
				walletConnected.set(true);
				winuni.Connected = true;

				localStorage.setItem('walletConnected', 'true');
				localStorage.setItem('connectionTime', Date.now().toString());

				await getMyMedia();
				showModal = false;
			} else {
				walletUnisatConnected.set(false);
				console.warn('UniSat Wallet not installed.');
			}
		} catch (error) {
			console.error('Error connecting to UniSat Wallet:', error);
		}
	}

	async function GetWalletInsTotal() {
		try {
			const limit = 20;
			const walletInscriptions = await winuni.getInscriptions(0, limit);
			return walletInscriptions?.total || 0;
		} catch (error) {
			console.error('Error fetching wallet inscriptions total:', error);
			return 0;
		}
	}

	function checkWalletConnection() {
		const isConnected = localStorage.getItem('walletConnected') === 'true';
		const connectionTime = localStorage.getItem('connectionTime');
		const currentTime = Date.now();

		if (isConnected && connectionTime && (currentTime - parseInt(connectionTime, 10)) < 24 * 60 * 60 * 1000) {
			walletUnisatConnected.set(true);
			walletConnected.set(true);
		} else {
			localStorage.removeItem('walletConnected');
			localStorage.removeItem('connectionTime');
			walletUnisatConnected.set(false);
			walletConnected.set(false);
		}
	}

	function DisconnectWallet() {
		htmlArray.set([]);
		if (winuni) winuni.Connected = false;
		walletUnisatConnected.set(false);
		walletConnected.set(false);
		localStorage.removeItem('walletConnected');
		localStorage.removeItem('connectionTime');
		$page.url.pathname = '/';
	}

	async function getMyMedia() {
		const isUnisatConnected = get(walletUnisatConnected);
		if (!isUnisatConnected) {
			console.log('Wallet not connected, cannot fetch media.');
			return;
		}

		try {
			const limit = 50;
			const walletInscriptions = await winuni.getInscriptions(0, limit);

			htmlarray = [];

			if (walletInscriptions?.list) {
				for (let i = 0; i < walletInscriptions.list.length; i++) {
					const ins = walletInscriptions.list[i];
					const insID = ins.inscriptionId;
					const mimetype = ins.contentType;

					if (mimetype && mimetype.startsWith('text/html')) {
						const isIOM = checkIOMOwnership(insID);
						htmlarray.push({ id: insID, isIOM });
					}
				}
			}

			htmlArray.set(htmlarray);
			return htmlarray;
		} catch (e) {
			console.error('Error fetching media from UniSat:', e);
		}
	}

	onMount(async () => {
		checkWalletConnection();
		await getMyMedia();
	});
</script>

<div class="wallet">
	{#if $walletUnisatConnected}
		<button class="wallet-btn" on:click={DisconnectWallet}>
			<img class="wallet-logo" src={logounisat} alt="UniSat Logo" />Disconnect?
		</button>
	{:else}
		<button class="wallet-btn" on:click={ConnectWallet}>
			<img class="wallet-logo" src={logounisat} alt="UniSat Logo" />Connect?
		</button>
	{/if}
</div>

<style>
	.wallet {
		display: flex;
	}
	.wallet-logo {
		height: 40px;
		width: 40px;
	}
	.wallet-btn {
		background: none;
		align-items: center;
		display: flex;
	}
</style>
