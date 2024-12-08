<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import logounisat from '$lib/images/logo-unisat.png';
	import { htmlArray, unisatAccounts, walletConnected, walletUnisatConnected, walletXverseConnected, isIOMOwner, myinscriptions, mimeArray } from '../stores';
	import idesofmarch from '../lib/collections/idesofmarch.json';
 	let winuni = globalThis.unisat;
	let htmlarray = []
	export let accounts = unisatAccounts;
	 let showModal;

	async function checkIOMOwnership(insID) {
		const idesOfMarchIDs = idesofmarch.map((item) => item.id);
		const isOwner = idesOfMarchIDs.includes(insID);
		isIOMOwner.set(isOwner);
		console.log('isIOMOwner', isIOMOwner);
	}

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

	async function GetWalletInsTotal() {
		let limit = 20;
		const walletInscriptions = await winuni.getInscriptions(0, limit);
 		return walletInscriptions.total;
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
	console.log("checkWalletConnection", isConnected)
}

	function DisconnectWallet() {
		
		htmlArray.set([]);
		winuni.Connected = false;
		$walletUnisatConnected = false;
		walletConnected.set(false);
		localStorage.removeItem('walletConnected');
		localStorage.removeItem('connectionTime');
		$page.url.pathname = '/';

	}

	

	
	export async function getMyMedia() {
		if ($walletUnisatConnected) {

			try {
				// const limit = await GetWalletInsTotal();
				const walletInscriptions = await winuni.getInscriptions(0, 50);

				for (let i = 0; i < walletInscriptions.total; i++) {
					const insID = walletInscriptions.list[i].inscriptionId;
					const mimetype = walletInscriptions.list[i].contentType; 
   					 console.log("insID", insID)
					if (mimetype == 'text/html;charset=utf-8') {
 
						htmlarray.push(insID);
						console.log("insID", insID)
						await checkIOMOwnership(insID)
						if (isIOMOwner) {
							console.log("I'm the owner of IOM")
						} else {
							console.log("I'm not the owner of IOM")
						}
						 
						 
					} else {
						console.log('not html');
						
					}

					 
				}

 				htmlArray.set(htmlarray);
				console.log("htmlArray", htmlArray)
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
