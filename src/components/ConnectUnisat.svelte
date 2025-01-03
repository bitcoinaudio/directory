<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// Local imports
	import logounisat from '$lib/images/logo-unisat.png';
	import { 
		htmlArray, 
		unisatAccounts, 
		walletConnected, 
		walletUnisatConnected, 
		walletXverseConnected, 
		isMobile, 
		isIOS, 
		isAndroid,
		isMagicEdenConnected
	} from '../stores';

	import idesofmarch from '../lib/collections/idesofmarch.json';
	import { get } from 'svelte/store';

	/**
	 * We rely on the global object `unisat` if UniSat extension is installed
	 * on desktop or if the mobile app has some bridging to globalThis.unisat.
	 */
	let winuni = globalThis.unisat;
	let htmlarray = [];
	let params;

	function parseQueryParams() {
		if (typeof window !== 'undefined') {
			params = new URLSearchParams(window.location.search);
			// console.log("params", params);
		}
	}

	function hasUniSatConnectedParam() {
		return params?.has('unisat-connected');
	}

	// Precompute the Ides Of March IDs for ownership checks
	const idesOfMarchIDs = idesofmarch.map((item) => item.id);
	function checkIOMOwnership(insID) {
		return idesOfMarchIDs.includes(insID);
	}

	/**
	 * Connect to UniSat wallet (desktop or in any environment that supports `window.unisat`).
	 */
	async function ConnectWallet() {
		// Ensure we’re not overriding Xverse wallet status
		walletXverseConnected.set(false);
		isMagicEdenConnected.set(false);
		try {
			if (typeof winuni !== 'undefined') {
				// Request accounts from the UniSat extension
				const accounts = await winuni.requestAccounts();
				unisatAccounts.set(accounts);

				walletUnisatConnected.set(true);
				walletConnected.set(true);
				winuni.Connected = true;

				localStorage.setItem('walletConnected', 'true');
				localStorage.setItem('connectionTime', Date.now().toString());

				await getMyMedia();
				goto('/myinscriptions');
			} else {
				walletUnisatConnected.set(false);
				console.warn('UniSat Wallet is not installed or unavailable.');
			}
		} catch (error) {
			console.error('Error connecting to UniSat Wallet:', error);
		}
	}

	/**
	 * Mobile: Launch the UniSat app via deep link. 
	 * The appName, nonce, and callback are included in the query params.
	 * NOTE: On iOS or Android, if the app is installed, it should open the app.
	 */
	let appName = 'Inscribed Audio';
	let nonce = Date.now().toString();
	const message = encodeURIComponent('Inscribed Audio');
	const data = encodeURIComponent(JSON.stringify([message, 'text']));
	const callbackUrl = 'http://100.123.54.34:5173/myinscriptions?unisat-connected=1';
	const deeplink = `unisat://request?method=connect&from=${appName}&nonce=${nonce}&callback=${callbackUrl}`; 	// Example of signMessage usage:
	const deeplink2 = `unisat://request?method=signMessage&data=${data}&from=${appName}&nonce=${nonce}&callback=${callbackUrl}`;

	async function ConnectUnisatMobile() {
		try {
			if (isIOS) {
				// iOS or Android both open the same deep link
				window.location.href = deeplink;
				console.log('Attempting to connect via deep link on iOS...');
			} else if (isAndroid) {
				window.location.href = deeplink;
				console.log('Attempting to connect via deep link on Android...');
			} else	 {
				console.warn('Tried to use mobile connect while not on a mobile device.');
			}
			await getMyMedia();
			// goto('/myinscriptions');
			walletUnisatConnected.set(true);
			walletConnected.set(true);
		} catch (error) {
			console.error('Error connecting to UniSat on mobile:', error);
		}

		/**
		 * After the user opens the app and returns (if they do),
		 * we assume the wallet is connected if the user grants permission in the app. 
		 * If the app is installed and the user successfully connected, the callback URL 
		 * would open your site again, at which point you can re-check with a method like
		 * `checkWalletConnection()` in onMount. 
		 * 
		 * Optionally, you can forcibly set these to true 
		 * if you expect immediate bridging from app -> site:
		 */
		walletUnisatConnected.set(true);
		walletConnected.set(true);
	}

	/**
	 * Returns the total number of inscriptions in the wallet.
	 */
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

	/**
	 * Check localStorage to see if the user connected within the last 24 hours. 
	 * If so, set the walletUnisatConnected/walletConnected flags to true.
	 */
	function checkWalletConnection() {
		const isConnected = localStorage.getItem('walletConnected') === 'true';
		const connectionTime = localStorage.getItem('connectionTime');
		const currentTime = Date.now();

		if (
			isConnected &&
			connectionTime &&
			currentTime - parseInt(connectionTime, 10) < 24 * 60 * 60 * 1000
		) {
			walletUnisatConnected.set(true);
			walletConnected.set(true);
		} else {
			localStorage.removeItem('walletConnected');
			localStorage.removeItem('connectionTime');
			walletUnisatConnected.set(false);
			walletConnected.set(false);
		}
	}

	/**
	 * Disconnect the wallet, clear localStorage & store states,
	 * and return user to homepage (or wherever).
	 */
	function DisconnectWallet() {
		htmlArray.set([]);
		walletUnisatConnected.set(false);
		walletConnected.set(false);
		localStorage.removeItem('walletConnected');
		localStorage.removeItem('connectionTime');
		goto('/');
	}

	/**
	 * Fetch text/html inscriptions from the user’s wallet
	 */
	async function getMyMedia() {
		const isUniSatConn = get(walletUnisatConnected);
		if (!isUniSatConn) {
			console.log('Wallet not connected, cannot fetch media.');
			return;
		}

		try {
			const limit = 50;
			const walletInscriptions = await winuni.getInscriptions(0, limit);

			htmlarray = [];

			if (walletInscriptions?.list) {
				for (const ins of walletInscriptions.list) {
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
		} catch (error) {
			console.error('Error fetching media from UniSat:', error);
		}
	}

	onMount(() => {
		parseQueryParams();
		if (hasUniSatConnectedParam()) {
			// User has returned from UniSat mobile
			// You can either directly connect the wallet or 
			// call a function that tries to "refresh" their session.
			console.log("Detected unisat-connected=1 in the URL");
			// Option 1: Automatically call ConnectWallet if they have the extension 
			// (only do this if you really want auto-connection):
			ConnectWallet();
		} else {
			// Normal flow if user hasn't just returned from UniSat
			checkWalletConnection();
		}
	});
</script>

<!-- 
   UI Logic: 
   - If wallet is connected, show "Disconnect?".
   - If not connected AND on mobile, show "Connect" button that calls `ConnectUnisatMobile()`.
   - Otherwise, show "Connect" button that calls `ConnectWallet()`.
-->
<div class="wallet">
	{#if $walletUnisatConnected}
		<button class="wallet-btn" on:click={DisconnectWallet}>
			<img class="wallet-logo" src={logounisat} alt="UniSat Logo" />
			Disconnect?
		</button>
	{:else}
		{#if $isMobile}
			<button class="wallet-btn" on:click={ConnectUnisatMobile}>
				<img class="wallet-logo" src={logounisat} alt="UniSat Logo" />
				Connect?
			</button>
		{:else}
			<button class="wallet-btn" on:click={ConnectWallet}>
				<img class="wallet-logo" src={logounisat} alt="UniSat Logo" />
				Connect?
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
		cursor: pointer;
	}
</style>
