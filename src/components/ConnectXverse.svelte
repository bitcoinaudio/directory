<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { request, RpcErrorCode } from 'sats-connect';
 	import {
		htmlArray,
		walletUnisatConnected,
		walletXverseConnected,
		walletConnected,
		isInXverseBrowser,
		isMobile,
		isIOS,
		isAndroid
	} from '../stores';
 	import { isXverseBrowser } from '../utils/browserCheck';
 	import idesofmarch from '../lib/collections/idesofmarch.json';
 	import { get } from 'svelte/store';
 	import logoxverse from '../lib/images/logo-xverse.jpg';

	// --- Precompute Ides Of March IDs for ownership checks ---
	const idesOfMarchIDs = idesofmarch.map((item) => item.id);

	function checkIOMOwnership(insID) {
		return idesOfMarchIDs.includes(insID);
	}

	/**
	 * Connect wallet (desktop or if already in Xverse browser).
	 */
	async function ConnectWallet() {
		walletUnisatConnected.set(false);

		try {
				const walletConnect = await request('wallet_connect', null);
				if (walletConnect.status === 'success') {		
					const response = await request('ord_getInscriptions', { offset: 0, limit: 10 });
					if (response.status === 'success') {
					walletXverseConnected.set(true);
					walletConnected.set(true);

				setLocalStorage('walletConnected', 'true');
				setLocalStorage('connectionTime', Date.now().toString());
				await getMyMedia();
					goto('/myinscriptions');
					}
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

	/**
	 * Only used on mobile *outside* the Xverse browser:
	 * - If we're *already in* the Xverse browser, call ConnectWallet directly.
	 * - Otherwise, open the Xverse Connect deep link to switch to the Xverse app.
	 */
	const browserUrl = 'http://100.123.54.34:5173/?inXverse=1';
	 function ConnectXverseMobile() {
		if ($isIOS) {
			const xverseUrl = `https://connect.xverse.app/`;
			window.open(xverseUrl, '_blank');
			console.log('isIOS', isIOS);
		} else if ($isAndroid)	 {
			const xverseUrl = `https://connect.xverse.app/browser?url=${encodeURIComponent(browserUrl)}`;
			window.open(xverseUrl, '_blank');
			console.log('isAndroid', isAndroid);
		} else {
			console.error('Unsupported platform');
		}
	}


	/**
	 * Fetch user’s inscriptions from their Xverse wallet
	 */
	async function getMyMedia() {
		if (!get(walletXverseConnected)) {
			console.error('Wallet not connected');
			return;
		}
		try {

			const inscriptionsRes = await request('ord_getInscriptions', { offset: 0, limit: 10 });
			const inscriptions = inscriptionsRes?.result?.inscriptions || [];
			const htmlarray = [];

			for (const ins of inscriptions) {
				const insID = ins.inscriptionId;
				const mimetype = ins.contentType;
				if (mimetype && mimetype.startsWith('text/html')) {
					htmlarray.push({
						id: insID,
						isIOM: checkIOMOwnership(insID)
					});
				}
			}

			htmlArray.set(htmlarray);
			return htmlarray;
		} catch (e) {
			console.error('Error fetching media:', e);
		}
	}

	/**
	 * Local Storage helpers
	 */
	function setLocalStorage(key, value) {
		localStorage.setItem(key, value);
	}
	function getLocalStorage(key) {
		return localStorage.getItem(key);
	}
	function removeLocalStorage(key) {
		localStorage.removeItem(key);
	}

	/**
	 * Check if the wallet is still connected based on localStorage data.
	 */
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

	/**
	 * Disconnect the wallet: clear localStorage, store states, and redirect.
	 */
	function DisconnectWallet() {
		htmlArray.set([]);
		walletXverseConnected.set(false);
		walletConnected.set(false);
		removeLocalStorage('walletConnected');
		removeLocalStorage('connectionTime');
		goto('/');
	}

	onMount(() => {
		try{ 
			// ConnectWallet();
		} catch (e) {
			console.error('Error connecting wallet:', e);
		}
		isInXverseBrowser.set(isXverseBrowser());
		checkWalletConnection();
	});
</script>

<div class="wallet">
	{#if $walletXverseConnected}
		<!-- Already connected -->
		<button class="wallet-btn" on:click={DisconnectWallet}>
			<img class="wallet-logo" src={logoxverse} alt="Wallet Logo" />
			Disconnect?
		</button>
	
	{:else if $isMobile}
		<!-- MOBILE LOGIC -->
		{#if $isInXverseBrowser}
			<!-- Already in Xverse browser on mobile -->
			<button class="wallet-btn" on:click={ConnectWallet}>
				<img class="wallet-logo" src={logoxverse} alt="Wallet Logo" />
				Connect?
			</button>
		{:else}
			<!-- Mobile but NOT in Xverse browser -->
			<button class="wallet-btn" on:click={ConnectXverseMobile}>
				<img class="wallet-logo" src={logoxverse} alt="Wallet Logo" />
				Open Xverse?
			</button>
		{/if}

	{:else}
		<!-- DESKTOP -->
		<button class="wallet-btn" on:click={ConnectWallet}>
			<img class="wallet-logo" src={logoxverse} alt="Wallet Logo" />
			Connect?
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
		cursor: pointer;
	}
</style>
