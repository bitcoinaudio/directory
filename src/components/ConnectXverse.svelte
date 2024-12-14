<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import {
		htmlArray, 
		walletUnisatConnected, 
		walletXverseConnected,
		walletMagicConnected,
		walletConnected
	} from '../stores';
	import { isMobile, isIOS, isAndroid } from '../stores';
	import { goto } from '$app/navigation';
	import { request, RpcErrorCode, getProviders } from 'sats-connect';
	import Wallet from 'sats-connect';
	import idesofmarch from '../lib/collections/idesofmarch.json';
	import { get } from 'svelte/store';
	import logounisat from '../lib/images/logo-unisat.png';
 	let providerIcon;
	let htmlarray = [];

	
	// Precompute Ides Of March IDs for ownership checks
	const idesOfMarchIDs = idesofmarch.map((item) => item.id);

	function checkIOMOwnership(insID) {
		return idesOfMarchIDs.includes(insID);
	}

	async function GetWalletInsTotal() {
		try {
			const inscriptions = await request('ord_getInscriptions', { offset: 0, limit: 1 });
			return inscriptions?.result?.total || 0;
		} catch (error) {
			console.error('Error getting wallet inscriptions total:', error);
			return 0;
		}
	}

	async function ConnectWallet() {
		walletUnisatConnected.set(false);

		try {
			const response = await request('wallet_requestPermissions', null);
			if (response.status === 'success') {
				walletXverseConnected.set(true);
				walletConnected.set(true);

				localStorage.setItem('walletConnected', 'true');
				localStorage.setItem('connectionTime', Date.now().toString());

				await getMyMedia();
			} else if ($isMobile) {
				console.log('Mobile');
				ConnectXverseMobile();
			} else {
				if (response.error?.code === RpcErrorCode.USER_REJECTION) {
					console.log('User rejected permissions request.');
				} else {
					console.error('Error connecting wallet:', response.error);
				}
			}
		} catch (err) {
			console.error('Error connecting wallet:', err);
		}
	}
	async function ConnectXverseMobile() {
		if ($isMobile) {
			if ($isIOS) {
				window.open('https://connect.xverse.app/', '_blank');
			} else if ($isAndroid) {
				window.open('https://connect.xverse.app/browser?url=https://my.inscribed.audio', '_blank');
			}
		}
	}


	async function getMyMedia() {
		const isXverseConnected = get(walletXverseConnected);
		if (!isXverseConnected) {
			console.log('Wallet not connected');
			return;
		}

		try {
			const limit = await GetWalletInsTotal();
			const inscriptionsRes = await request('ord_getInscriptions', { offset: 0, limit });
			const inscriptions = inscriptionsRes?.result?.inscriptions || [];

			htmlarray = [];

			for (const ins of inscriptions) {
				const insID = ins.inscriptionId;
				const mimetype = ins.contentType;

				if (mimetype && mimetype.startsWith('text/html')) {
					const isIOM = checkIOMOwnership(insID);
					htmlarray.push({ id: insID, isIOM });
				}
			}

			htmlArray.set(htmlarray);
			console.log('htmlArray:', get(htmlArray));
			return htmlarray;
		} catch (e) {
			console.error('Error fetching media:', e);
		}
	}

	function checkWalletConnection() {
		const isConnected = localStorage.getItem('walletConnected') === 'true';
		const connectionTime = localStorage.getItem('connectionTime');
		const currentTime = Date.now();

		if (isConnected && connectionTime && currentTime - parseInt(connectionTime, 10) < 24 * 60 * 60 * 1000) {
			walletXverseConnected.set(true);
			walletConnected.set(true);
		} else {
			localStorage.removeItem('walletConnected');
			localStorage.removeItem('connectionTime');
			walletXverseConnected.set(false);
			walletConnected.set(false);
		}
	}

	function DisconnectWallet() {
		htmlArray.set([]);
		walletXverseConnected.set(false);
		walletConnected.set(false);
		localStorage.removeItem('walletConnected');
		localStorage.removeItem('connectionTime');
		goto('/');
	}

	let showButton = true;
	onMount(async () => {
		try {
			const providers = await getProviders();
			if (providers && providers.length > 0) {
				providerIcon = providers[0].icon;
			}
			if (providers == null) {
				providerIcon = logounisat;
				showButton = false;
			}
			checkWalletConnection();
			await getMyMedia();
		} catch (err) {
			console.error('Error on mount:', err);
		}
	});
</script>

<div class="wallet">
	{#if showButton}
		{#if $walletXverseConnected}
			<button class="wallet-btn" on:click={DisconnectWallet}>
				<img class="wallet-logo" src={providerIcon} alt="Wallet Logo" />Disconnect?
			</button>
		{:else}
			<button class="wallet-btn" on:click={ConnectWallet}>
				<img class="wallet-logo" src={providerIcon} alt="Wallet Logo" />Connect?
			</button>
		{/if}
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
