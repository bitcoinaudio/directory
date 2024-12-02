<script>
	import logounisat from '$lib/images/logo-unisat.png';
	import { htmlArray, unisatAccounts, walletConnected, isIOMOwner, myinscriptions, mimeArray } from '../stores';
	import iom from '$lib/images/collections/idesofmarch.json';
	let winuni = globalThis.unisat;	

	export let accounts = unisatAccounts;

	async function ConnectWallet() {
		try {
			if (typeof winuni !== 'undefined') {
				console.log('UniSat Wallet is installed!');
				accounts = await winuni.requestAccounts();
				$walletConnected = true;
				winuni.Connected = true;
				console.log('connect success', accounts);
				console.log(winuni);
				// await fetchWalletData();
			} else {
				$walletConnected = false;
				alert('Install a compatible wallet.');
			}
		} catch (error) {
			console.error('Error connecting to wallet:', error);
			alert('UniSat Wallet is installed! Sign in to your Wallet');
		}
	}

	function DisconnectWallet() {
		htmlArray.set([]);
		winuni.Connected = false;
		$walletConnected = false;
	}

	async function fetchWalletData() {
		try {
			const limit = await GetWalletInsTotal();
			const walletInscriptions = await winuni.getInscriptions(0, limit);
			processInscriptions(walletInscriptions);
			 
		} catch (error) {
			console.error('Error fetching wallet data:', error);
		}
	}

	async function GetWalletInsTotal() {
		try {
			const walletInscriptions = await winuni.getInscriptions(0, 20);
			console.log("GetWalletInsTotal()");
			console.log(walletInscriptions);
			return walletInscriptions.total;
		} catch (error) {
			console.error('Error getting wallet inscriptions total:', error);
			return 0;
		}
	}

	function processInscriptions(walletInscriptions) {
		for (let i = 0; i < walletInscriptions.total; i++) {
			const { inscriptionId: insID, contentType: mimetype } = walletInscriptions.list[i];
			if (mimetype === 'text/html;charset=utf-8') {
				let insURL = `https://radinals.bitcoinaudio.co/content/${insID}`;
				htmlArray.update(arr => [...arr, insURL]);
				// isIOMOwner.set(insID === "32a3ebf3927d777ce547e755bf6eb6018c01fbb510f36a318654676b6d008291i0");
			}
			// mimeArray.push(mimetype);
		}
		// htmlArray.set(htmlArray);
		// mimeArray.set(mimeArray);
	}

	export async function getMyMedia() {
		if ($walletConnected) {
			await fetchWalletData();
		} else {
			console.log('Wallet not connected');
		}
	}

	export async function GetMyBitmaps() {
		if ($walletConnected) {
			await fetchWalletData();
		} else {
			console.log('Wallet not connected');
		}
	}
</script>

<div class="wallet">
	{#if $walletConnected}
		<button class="wallet-btn" on:click={DisconnectWallet}>
			<img class="wallet-logo" src={logounisat} alt="" />Disconnect?
		</button>
	{:else}
		<button class="wallet-btn" on:click={ConnectWallet}>
			<img class="wallet-logo" src={logounisat} alt="" />Connect to Unisat Wallet?
		</button>
	{/if}
</div>

<style>
	.wallet {
		display: flex;
	}

	.wallet-logo {
		display: flex;
		height: 40px;
		width: 40px;
	}
	.wallet-btn {
		display: flex;
		background: none;
		align-items: center;
	}
</style>