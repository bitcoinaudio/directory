<script>
	import logounisat from '$lib/images/logo-unisat.png';
	import {
		htmlarray,
		unisatAccounts,
		walletConnected,
		iscpverified,
		myinscriptions
	} from '../stores';
	let winuni = globalThis.unisat;

	export let accounts = unisatAccounts;

	// UniSat stuff

	async function ConnectWallet() {
		// UniSat Wallet

		try {
			// console.log('globalThis.unisat:', winuni);
			if (typeof winuni !== 'undefined') {
				console.log('UniSat Wallet is installed!');
				accounts = await winuni.requestAccounts();
				$walletConnected = true;
				winuni.Connected = true;

				// settingsBitmap.showMyBitmap = true
				console.log('connect success', accounts);
				console.log(winuni);

				// unisatAccounts.set(accounts)
				GetMyBitmaps();
			} else {
				$walletConnected = false;
				// settingsBitmap.showMyBitmap = false
				// console.log('UniSat Wallet is not installed :(');
				// console.log('connect failed');
				alert('Install a compatible wallet.');
			}
		} catch {
			console.log('Sign into wallet');
			alert('UniSat Wallet is installed! Sign in to your Wallet');
		}
	}

	function DisconnectWallet() {
		htmlArray = [];
		winuni.Connected = false;
		$walletConnected = false;
	}

	async function GetWalletInsTotal() {
		let limit = 20;
		const walletInscriptions = await winuni.getInscriptions(0, 20);
		// console.log(" GetWalletInsTotal()")
		// console.log(walletInscriptions.total)
		return walletInscriptions.total;
	}

	let bitmapArray = [];
	let parcelArray = [];
	let audioArray = [];
	export let htmlArray = [];
	export let mimetypes = [];
	htmlarray.set(htmlArray);
	// console.log("$htmlarray: ", $htmlarray)

	export async function GetMyBitmaps() {
		if ($walletConnected) {
			const regexBitmap = /^(?:0|[1-9][0-9]*).bitmap$/;
			const regexBitmapstr = /^(?:0|[1-9][0-9]*).bitmapstr$/;
			// const hiroURL = 'https://api.hiro.so/ordinals/v1/inscriptions/';
			const radinals = 'https://radinals.bitcoinaudio.co';

			try {
				const limit = await GetWalletInsTotal();
				const walletInscriptions = await winuni.getInscriptions(0, limit);

				for (let i = 0; i < walletInscriptions.total; i++) {
					const insID = walletInscriptions.list[i].inscriptionId;
					const mimetype = walletInscriptions.list[i].contentType;
					const insContent = walletInscriptions.list[i].content;

					// const hiro = hiroURL + insID;

					const content = await fetch(radinals + '/inscriptions');
					const ins = await content.text();
					const inscriptionParts = ins.split('.');
					// console.log(inscriptionParts);
					const bitmapNum = inscriptionParts[0];
					const parcelNumber = inscriptionParts[0];
					const bitmapText = regexBitmap.test(ins);
					const bitmapstrText = regexBitmapstr.test(ins);

					if (bitmapText) {
						if (inscriptionParts.length == 2) {
							bitmapArray.push(bitmapNum);
						} else if (inscriptionParts.length == 3) {
							parcelArray.push(parcelNumber);
						} else {
							//
						}
					}

					if (mimetype == 'text/html;charset=utf-8') {
						let insURL = radinals + '/content/' + insID;
						
						htmlArray.push(insURL);
						console.log(mimetype);
					} else {
						console.log('not html');
					}

					mimetypes.push(mimetype);
					//console.log("mimetypes: ", mimetypes)
				}

				console.log('htmlArray', htmlArray);
				return [htmlArray, bitmapArray];
			} catch (e) {
				console.log(' catch GetMyBitmaps ERROR');
				console.log(e);
			}
		} else {
			console.log('else GetMyBitmaps ERROR');
		}
	}
</script>

<div class="wallet"></div>
<hr />
<div class="wallet">
	{#if $walletConnected}
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
		border: black;
		border-style: solid;
		border-radius: 4%;
		align-items: center;
	}
</style>
