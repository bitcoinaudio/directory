<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Wallet from 'sats-connect';
	import {htmlArray, isIOMOwner, walletUnisatConnected, walletXverseConnected, walletConnected } from '../stores';
 	import { request, AddressPurpose, RpcErrorCode, getProviders } from 'sats-connect';
	import wallet from '$lib/images/wallet.svg';

	let providerIcon;
	let htmlarray = []


	async function ConnectWallet() {
 		
		try {

			const getInfo = await request('getInfo', null);
 			console.log("getInfo", getInfo);

			const response = await request('wallet_requestPermissions', null);
			const inscriptions = await request('ord_getInscriptions', { offset: 0, limit: await GetWalletInsTotal() });
			if (response.status === 'success') {
				walletUnisatConnected.set(false);	
				walletXverseConnected.set(true);
				walletConnected.set(true);
				console.log("inscriptions", inscriptions);
				console.log("inscriptions", inscriptions.result.total);

    

    
  } else {
    if (response.error.code === RpcErrorCode.USER_REJECTION) {
      // handle user cancellation error
    } else {	
      // handle error
    }
  }
} catch (err) {
			alert(err);
		}

	}
	async function GetWalletInsTotal() {
		let total = 100;
 		const inscriptions = await request('ord_getInscriptions', { offset: 0, limit: total });
		console.log("inscriptions", inscriptions);
 		return inscriptions.result.total;
	}
	export async function getMyMedia() {
		if ($walletXverseConnected) {
  
			try {
				const limit = await GetWalletInsTotal();
				const inscriptions = await request('ord_getInscriptions', { offset: 0, limit: limit });

				for (let i = 0; i < limit; i++) {
					console.log("inscriptionsId", inscriptions.result.inscriptions[i].inscriptionId);

					const insID = inscriptions.result.inscriptions[i].inscriptionId;
					const mimetype = inscriptions.result.inscriptions[i].contentType; 
   					 
					if (mimetype == 'text/html;charset=utf-8') {
 
						htmlarray.push(insID);
						console.log("insID", insID)

						//test with ins_ID = 32a3ebf3927d777ce547e755bf6eb6018c01fbb510f36a318654676b6d008291i0
						// iom[0].id
						if (insID == "a33c04ca65a41c509becca1915b19bc5508e5c4df40944b42828001f5cebfd74i0" ) {
							isIOMOwner.set(true);
							console.log("I'm the owner of IOM")
						} 
						 
					} else {
						console.log('not html');
					}

					 
				}

 				htmlArray.set(htmlarray);
				console.log("htmlArray", htmlArray)
				console.log("htmlarray", htmlarray)
				return htmlarray;
			} catch (e) {
 				console.log(e);
			}
		} else {
			console.log('else getMyMedia ERROR');
		}

	}


	 

	function DisconnectWallet() {
		htmlArray.set([]);
		$walletXverseConnected = false;
 		walletConnected.set(false);
		localStorage.removeItem('walletConnected');
		localStorage.removeItem('connectionTime');
		$page.url.pathname = '/';
	}

	onMount(async () => {
		const providers = await getProviders()
			providerIcon = providers[0].icon;
			if ($walletXverseConnected) {
				getMyMedia();
			}
			console.log(providers)
	});



</script>

 <div class="wallet">
	{#if $walletXverseConnected}
		<button class="wallet-btn" on:click={DisconnectWallet}
			><img class="wallet-logo" src={providerIcon} alt="" />Disconnect?</button
		>
	{:else}
		<button class="wallet-btn" on:click={ConnectWallet}
			><img class="wallet-logo" src={providerIcon} alt="" />Connect?</button
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
