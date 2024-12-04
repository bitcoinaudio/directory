<script>
	import { onMount } from 'svelte';
	import Wallet from 'sats-connect';
	import { walletUnisatConnected, walletXverseConnected, walletConnected } from '../stores';
 	import { request, AddressPurpose, RpcErrorCode, getProviders } from 'sats-connect';
	import wallet from '$lib/images/wallet.svg';

	let providerIcon;

	async function ConnectWallet() {
 		
		try {

			const getInfo = await request('getInfo', null);
 			console.log("getInfo", getInfo);

			const response = await request('wallet_requestPermissions', null);
			if (response.status === 'success') {
				walletUnisatConnected.set(false);	
				walletXverseConnected.set(true);
				walletConnected.set(true);
    

    
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

	 

	function DisconnectWallet() {
		$walletXverseConnected = false;
	}

	onMount(async () => {
		const providers = await getProviders()
			providerIcon = providers[0].icon;
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
