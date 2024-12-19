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
	import { request, RpcErrorCode, getProviders, AddressPurpose } from 'sats-connect';
	import Wallet from 'sats-connect';
	import idesofmarch from '../lib/collections/idesofmarch.json';
	import { get } from 'svelte/store';
	import logoxverse from '../lib/images/logo-xverse.jpg';
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
			console.log('response', response);
			if (response.status === 'success') {
				walletXverseConnected.set(true);
				walletConnected.set(true);

				localStorage.setItem('walletConnected', 'true');
				localStorage.setItem('connectionTime', Date.now().toString());

				await getMyMedia();
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
 
	function getInscriptions() {
		const response = Wallet.request('ord_getInscriptions', {
			purposes: [AddressPurpose.Payment, AddressPurpose.Ordinals],
			message: 'Cool app wants to know your addresses!',
		});
		console.log('response', response);
	}


	async function ConnectXverseMobile() {
		let appName = 'Inscribed Audio';
		let nonce = Date.now().toString();
		let redirectUrl = encodeURIComponent(`/callback`);
		let url = '';
	 

		getInscriptions();		
		
		try {
			if ($isMobile) {
				if ($isIOS) {
					url = `https://connect.xverse.app/browser?url=https://my.inscribed.audio`;
					window.open(url);
					walletXverseConnected.set(true);
					walletConnected.set(true);
					console.log('Connected to Xverse on iOS');
				} else if ($isAndroid) {
					url = `https://connect.xverse.app/browser?url=https://my.inscribed.audio`;
					window.open(url);
					walletXverseConnected.set(true);
					walletConnected.set(true);
					console.log('Connected to Xverse on Android');
				}
				// ConnectWallet();
				await getMyMedia();
			}
		} catch (err) {
			console.error('Error fetching media:', err);
		}
	}

	function setLocalStorage(key, value) {
		localStorage.setItem(key, value);
	}

	function getLocalStorage(key) {
		return localStorage.getItem(key);
	}

	function removeLocalStorage(key) {
		localStorage.removeItem(key);
	}

	async function getMyMedia() {
		const isXverseConnected = get(walletXverseConnected);
		if (!isXverseConnected) {
			console.log('Wallet not connected');
			return;
		}
		try {
			console.log('getMyMedia', 'trying.......');
			// const limit = await GetWalletInsTotal();
			const inscriptionsRes = await request('ord_getInscriptions', { offset: 0, limit: 10 });
			console.log('inscriptionsRes', inscriptionsRes);
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
		const isConnected = getLocalStorage('walletConnected') === 'true';
		const connectionTime = getLocalStorage('connectionTime');
		const currentTime = Date.now();

		if (
			isConnected &&
			connectionTime &&
			currentTime - parseInt(connectionTime, 10) < 24 * 60 * 60 * 1000
		) {
			walletXverseConnected.set(true);
			walletConnected.set(true);
		} else {
			removeLocalStorage('walletConnected');
			removeLocalStorage('connectionTime');
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

	function handleGetInfo() {
		try {
			const response = Wallet.request('wallet_connect', null);
			console.log('getInfo', response);
		} catch (err) {
			console.log(err);
		}
	};

	onMount(async () => {
		handleGetInfo();
		try {
			console.log('onMount', 'trying.......');
			const providers = getProviders();

			console.log('providers', providers);
			checkWalletConnection();
			await getMyMedia();
		} catch (err) {
			console.error('Error on mount:', err);
		}
	});
</script>

<div class="wallet">
	{#if $walletXverseConnected}
		<button class="wallet-btn" on:click={DisconnectWallet}>
			<img class="wallet-logo" src={logoxverse} alt="Wallet Logo" />Disconnect?
		</button>
	{:else if $isMobile}
		<button class="wallet-btn" on:click={ConnectXverseMobile}>
			<img class="wallet-logo" src={logoxverse} alt="Wallet Logo" />Connect?
		</button>
	{:else}
		<button class="wallet-btn" on:click={ConnectWallet}>
			<img class="wallet-logo" src={logoxverse} alt="Wallet Logo" />Connect?
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
