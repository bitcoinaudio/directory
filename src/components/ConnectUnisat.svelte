<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import logounisat from '$lib/images/logo-unisat.png';
	import { htmlArray, unisatAccounts, walletConnected, walletUnisatConnected, walletXverseConnected, iscpverified, isIOMOwner, myinscriptions, mimeArray } from '../stores';
	import iom from '$lib/images/collections/idesofmarch.json'
 	let winuni = globalThis.unisat;
	let htmlarray = []
	export let accounts = unisatAccounts;
	 let showModal;

	async function ConnectWallet() {
		try {
 			if (typeof winuni !== 'undefined') {
				console.log('UniSat Wallet is installed!');
				accounts = await winuni.requestAccounts();
				walletUnisatConnected.set(true);
				walletXverseConnected.set(false);
				walletConnected.set(true);
				winuni.Connected =true;
				 
 				console.log('connect success', accounts);
				console.log(winuni)
				GetWalletInsTotal();
				getMyMedia();  
				showModal = false;
				localStorage.setItem('walletConnected', 'true');
				localStorage.setItem('connectionTime', Date.now().toString());
				
			} else {
				 
				$walletUnisatConnected = false;				 
				alert('Install a compatible wallet.');
			}
		} catch {
			console.log('Sign into wallet');
			alert('UniSat Wallet is installed! Sign in to your Wallet');
		}

		

	}

	function checkWalletConnection() {
    const isConnected = localStorage.getItem('walletConnected') === 'true';
    const connectionTime = localStorage.getItem('connectionTime');
    const currentTime = Date.now();
    // Check if the wallet should remain connected
    if (isConnected && connectionTime && (currentTime - parseInt(connectionTime)) < 24 * 60 * 60 * 1000) {
        // Keep wallet connected
        walletUnisatConnected.set(true);
    } else {
        // Clear the connection state if 24 hours have passed
        localStorage.removeItem('walletConnected');
        localStorage.removeItem('connectionTime');
    }
}

	function DisconnectWallet() {
		
		htmlArray.set([]);
		winuni.Connected = false;
		walletUnisatConnected.set(false);
		walletConnected.set(false);
		localStorage.removeItem('walletConnected');
		localStorage.removeItem('connectionTime');
		$page.url.pathname = '/';

	}

	async function GetWalletInsTotal() {
		let limit = 20;
		const walletInscriptions = await winuni.getInscriptions(0, 20);
 		return walletInscriptions.total;
	}

	
	export async function getMyMedia() {
		if ($walletUnisatConnected) {
  			const radinals = 'https://radinals.bitcoinaudio.co';

			try {
				const limit = await GetWalletInsTotal();
				const walletInscriptions = await winuni.getInscriptions(0, limit);

				for (let i = 0; i < walletInscriptions.total; i++) {
					const insID = walletInscriptions.list[i].inscriptionId;
					const mimetype = walletInscriptions.list[i].contentType; 
   					 
					if (mimetype == 'text/html;charset=utf-8') {
 
						 htmlarray.push(insID);
						console.log("insID", insID)

						//test with ins_ID = 32a3ebf3927d777ce547e755bf6eb6018c01fbb510f36a318654676b6d008291i0
						// iom[0].id
						if (insID == "32a3ebf3927d777ce547e755bf6eb6018c01fbb510f36a318654676b6d008291i0" ) {
							isIOMOwner.set(true);
							console.log("I'm the owner of IOM")
						} 
						 
					} else {
						console.log('not html');
					}

					 
				}

 				htmlArray.set(htmlarray);
				return htmlarray;
			} catch (e) {
 				console.log(e);
			}
		} else {
			console.log('else getMyMedia ERROR');
		}

	}

	onMount(async () => {
		checkWalletConnection();
		await getMyMedia();
		console.log("onMount", $isIOMOwner)
	});
</script>


<div class="wallet">
	{#if $walletUnisatConnected}
		<button class="wallet-btn" on:click={DisconnectWallet}
			><img class="wallet-logo" src={logounisat} alt="" />Disconnect?</button
		>
	{:else}
		<button class="wallet-btn" on:click={ConnectWallet}
			><img class="wallet-logo" src={logounisat} alt="" />Connect?</button
		>
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
