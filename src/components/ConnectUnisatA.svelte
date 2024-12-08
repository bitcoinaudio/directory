<script>
	import logounisat from '$lib/images/logo-unisat.png';
	import { htmlArray, unisatAccounts, walletConnected, iscpverified, isIOMOwner, myinscriptions, mimeArray } from '../stores';
 	let winuni = globalThis.unisat;

	export let accounts = unisatAccounts;
 
	async function ConnectWallet() {
		try {
 			if (typeof winuni !== 'undefined') {
				console.log('UniSat Wallet is installed!');
				accounts = await winuni.requestAccounts();
				$walletConnected = true;
				winuni.Connected =true;
 				console.log('connect success', accounts);
				console.log(winuni)
				GetWalletInsTotal();
				getMyMedia();  
			} else {
				 
				// $walletConnected = false;
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
		
		htmlArray.set([]);
		winuni.Connected = false;
		$walletConnected = false;

	}

	async function GetWalletInsTotal() {
		let limit = 20;
		const walletInscriptions = await winuni.getInscriptions(0, 20);
		console.log(" GetWalletInsTotal()")
		console.log(walletInscriptions)
		return walletInscriptions.total;
	}

	let bitmapArray = [];
	let parcelArray = [];
	let audioArray = [];
	// export let htmlArray = [];
	// export let mimeArray = [];
	// htmlArray.set(htmlArray);
	// mimeArray.set(mimeArray);
	// console.log("$htmlarray: ", $htmlarray)

	export async function getMyMedia() {
		if ($walletConnected) {
  			const radinals = 'https://radinals.bitcoinaudio.co';

			try {
				const limit = await GetWalletInsTotal();
				const walletInscriptions = await winuni.getInscriptions(0, limit);

				for (let i = 0; i < walletInscriptions.total; i++) {
					const insID = walletInscriptions.list[i].inscriptionId;
					const mimetype = walletInscriptions.list[i].contentType;
					const insContent = walletInscriptions.list[i].content;

 
					const content = await fetch(radinals);
					const ins = await content.text();
					const inscriptionParts = ins.split('.');
					// console.log(ins);

					if (mimetype == 'text/html;charset=utf-8') {
						let insURL = radinals + '/content/' + insID;

						htmlArray.update(arr => [...arr, insURL, mimetype]);
						console.log("insID", insID)

						//test with ins_ID = 32a3ebf3927d777ce547e755bf6eb6018c01fbb510f36a318654676b6d008291i0
						// iom[0].id
						if (insID == "32a3ebf3927d777ce547e755bf6eb6018c01fbb510f36a318654676b6d008291i0" ) {
							isIOMOwner.set(true);
							console.log("I'm the owner of IOM")
						} else {
							isIOMOwner.set(false);
							console.log("I'm not the owner of IOM")
						}	
						// console.log(mimetype);
					} else {
						console.log('not html');
					}

					// mimeArray.push(mimetype);
				    // console.log("mimetypes: ", mimetypes)
				}

				// console.log('htmlArray', htmlArray);
				return [htmlArray];
			} catch (e) {
				console.log(' catch GetMyBitmaps ERROR');
				console.log(e);
			}
		} else {
			console.log('else GetMyBitmaps ERROR');
		}

	}

	export async function GetMyBitmaps() {
		if ($walletConnected) {
			const regexBitmap = /^(?:0|[1-9][0-9]*).bitmap$/;
			const regexBitmapstr = /^(?:0|[1-9][0-9]*).bitmapstr$/;
			const hiroURL = 'https://api.hiro.so/ordinals/v1/inscriptions/';
			const radinals = 'https://radinals.bitcoinaudio.co';

			try {
				const limit = await GetWalletInsTotal();
				const walletInscriptions = await winuni.getInscriptions(0, limit);

				for (let i = 0; i < walletInscriptions.total; i++) {
					const insID = walletInscriptions.list[i].inscriptionId;
					const mimetype = walletInscriptions.list[i].contentType;
					const insContent = walletInscriptions.list[i].content;

					const hiro = hiroURL + insID;

					const content = await fetch(hiro + '/content');
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

						htmlArray.update(arr => [...arr, insURL, mimetype]);
						console.log(mimetype);
					} else {
						console.log('not html');
					}

					// mimeArray.push(mimetype);
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


<div class="wallet">
	{#if $walletConnected}
		<button class="wallet-btn" on:click={DisconnectWallet}
			><img class="wallet-logo" src={logounisat} alt="" />Disconnect?</button
		>
	{:else}
		<button class="wallet-btn" on:click={ConnectWallet}
			><img class="wallet-logo" src={logounisat} alt="" />Connect to Unisat Wallet?</button
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
