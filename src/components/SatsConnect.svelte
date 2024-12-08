<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import {
		htmlArray,
		isIOMOwner,
		walletUnisatConnected,
		walletXverseConnected,
		walletConnected
	} from '../stores';
	import { request, AddressPurpose, RpcErrorCode, getProviders } from 'sats-connect';
 	import idesofmarch from '../lib/collections/idesofmarch.json';

	let providerIcon;
	let htmlarray = [];
	export async function checkIOMOwnership(insID) {
		const idesOfMarchIDs = idesofmarch.map((item) => item.id);
		const isOwner = idesOfMarchIDs.includes(insID);
		isIOMOwner.set(isOwner);
		console.log('isIOMOwner', isIOMOwner);
	}
	async function GetWalletInsTotal() {
		let total = 100;
		const inscriptions = await request('ord_getInscriptions', { offset: 0, limit: total });
		console.log("inscriptions", inscriptions)
		return inscriptions.result.total;
	}
	async function ConnectWallet() {
		try {
			const response = await request('wallet_requestPermissions', null);
			const inscriptions = await request('ord_getInscriptions', {
				offset: 0,
				limit: 10
			});
			if (response.status === 'success') {
				walletUnisatConnected.set(false);
				walletXverseConnected.set(true);
				walletConnected.set(true);
				console.log('inscriptions', inscriptions);
				console.log('inscriptions', inscriptions.result.total);
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

	

	export async function getMyMedia() {
		if ($walletXverseConnected) {
			try {
				const limit = await GetWalletInsTotal();
				const inscriptions = await request('ord_getInscriptions', { offset: 0, limit: limit });

				for (let i = 0; i < limit; i++) {
					const insID = inscriptions.result.inscriptions[i].inscriptionId;
					const mimetype = inscriptions.result.inscriptions[i].contentType;
					if (mimetype == 'text/html;charset=utf-8') {
						console.log('insID', insID);
						htmlarray.push(insID);
						await checkIOMOwnership(insID);
						if (isIOMOwner) {
							console.log("I'm the owner of IOM");
						} else {
							console.log("I'm not the owner of IOM");
						}
					} else {
						console.log('not html');
					}
				}

				htmlArray.set(htmlarray);
				console.log('htmlArray', $htmlArray);
				console.log('htmlarray', htmlarray);
				return htmlarray;
			} catch (e) {
				console.log(e);
			}
		} else {
			console.log('else getMyMedia ERROR');
		}
	}

	function checkWalletConnection() {
		const isConnected = localStorage.getItem('walletConnected') === 'true';
		const connectionTime = localStorage.getItem('connectionTime');
		const currentTime = Date.now();
		// Check if the wallet should remain connected
		if (
			isConnected &&
			connectionTime &&
			currentTime - parseInt(connectionTime) < 24 * 60 * 60 * 1000
		) {
			// Keep wallet connected
			$walletXverseConnected = true;
		} else {
			// Clear the connection state if 24 hours have passed
			localStorage.removeItem('walletConnected');
			localStorage.removeItem('connectionTime');
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
		const providers = await getProviders();
		providerIcon = providers[0].icon;
		checkWalletConnection();
		await getMyMedia();
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
