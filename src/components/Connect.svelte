<script>
	import logounisat from '$lib/images/logo-unisat.png';
	import { htmlarray, unisatAccounts, walletConnected, iscpverified, myinscriptions } from '../stores';
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
				winuni.Connected =true;
				

				// settingsBitmap.showMyBitmap = true
				console.log('connect success', accounts);
				console.log(winuni)
				

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

	async function dropdownFiller() {
		//GetMyBitmaps();
	}

	function handleSubmit(html) {
		console.log('html', html);
	}

	let selected;
	let selectedInscription;
	let selectedmimetype;
	let cpAddress = ''
	let message = 'Bitcoin%20Audio%20is%20RAD!'
	let cpURL =	"counterparty:"+ cpAddress + "?action=sign&message="+ message + "&icon=&callback=http%3A%2F%2Flocalhost:3000%2Fapi%2FverifyMessage"

	async function isCPVerified() {
		let cpURL =	"counterparty:"+ cpAddress + "?action=sign&message="+ message + "&icon=&callback=http%3A%2F%2Flocalhost:3000%2Fapi%2FverifyMessage"

		console.log(cpAddress)
		console.log(cpURL)
	// var file = "<file contents here>";
	var requestOptions = {
  	method: 'POST',
  	
  	redirect: 'follow'
};

// fetch("http://localhost:3000/api/verifyMessage?address=" + {cpAddress} + "&message=" + {message} + "&signature=H4ojQ%2BmaI7ikDSs7rrcdgFzogXT4P9Lue6MrtYDqZAdLAEPl9twBj%2BPhUX9IfUgw36GvRdLv44cP3n35LAL9Wxg%3D", requestOptions)
// fetch(cpURL, requestOptions)

// .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
		//
	}


// fetch("http://localhost:3000/api/verifyMessage?address=" + {cpAddress} + "&message=" + {message} + "&signature=IPPTJW08XhfGoTRYYcXz%2FCrx5Ymjq5HKiMS0dKpBsoR7FH%2B8Sa0JoKYxgeQ6wTdHuDd7xErIz2GqOgerU9Mkp4Y%3D", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
// 		//
// 	}

	// counterparty:{cpAddress} + ?action=sign&message=+ {message} +&icon= + {icon} + &callback=http%3A%2F%2Flocalhost:3000%2Fapi%2FverifyMessage
	
</script>

<div class="wallet">
	<!-- <button on:click={isCPVerified}><img class="wallet-logo" src={freewallet} alt="" /></button> -->
	<!-- <a href={cpURL}><img class="wallet-logo" src={freewallet} alt="" /></a>
	<input bind:value={cpAddress} /> -->
</div>
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


<!-- <select class="dropdown" bind:value={selectedInscription}  on:change={() => handleSubmit(selectedInscription)}>
	<option>My Inscriptions</option>
	{#await dropdownFiller()}
	<p>Loading Inscriptions</p>
	{:then htmls}
			{#each $htmlarray as html, index}
			<option value={index}>{html}</option>

			{/each}
	{/await}
</select>
<select class="dropdown" bind:value={selectedmimetype}  on:change={() => handleSubmit(selectedmimetype)}>
	<option>mimetypes</option>
	{#await dropdownFiller()}
	<p>Loading mimetypes</p>
	{:then htmls}
			{#each mimetypes as mime, index}
			<option value={index}>{mime}</option>

			{/each}
	{/await}
</select> -->

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
