<script>
	import { onMount } from 'svelte';
	import logounisat from '$lib/images/logo-unisat.png';
	import { htmlarray, unisatAccounts, walletConnected, iscpverified, myinscriptions } from '../stores';
	import Wallet from 'sats-connect'
	import {getProviders} from 'sats-connect'
	 

let providerIcon;
	const handleGetInfo = async () => {
		try {
			
			const response = await Wallet.request("getInfo", null);
			console.log(response);
		} catch (err) {
			console.log(err);
		}
	};
 
	function DisconnectWallet() {
		
		htmlArray = [];
		winuni.Connected = false;
		$walletConnected = false;
	}

 
 

	onMount(async () => {
		const providers = await getProviders()
			providerIcon = providers[0].icon;
			console.log(providers[0].icon)
	});

</script>

<div class="card wallet">
</div>
<hr />
<div class="wallet">
	{#if $walletConnected}
		<button class="wallet-btn" on:click={DisconnectWallet}
			><img class="wallet-logo" src={logounisat} alt="" />Disconnect?</button
		>
	{:else}
		<button class="wallet-btn" on:click={handleGetInfo}
			><img class="wallet-logo" src={providerIcon} alt="" />Connect to Xverse Wallet?</button
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
