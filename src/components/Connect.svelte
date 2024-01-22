<script>
	import logo from '$lib/images/ba-logo.svg';
	import { htmlarray, unisatAccounts, walletConnected } from '../stores';
	let winuni = globalThis.unisat;
	let publicKey = '';
	let signedMessage = '';
	let icon =
		'https://bitcoinaudio.co/wp-content/uploads/2022/04/cropped-bitcoinaudio-logo-BA-2020-005-1024x209.png';

	export let accounts = unisatAccounts;

	// UniSat stuff

	async function ConnectWallet() {
		// UniSat Wallet

		try {
			console.log('globalThis.unisat:', winuni);
			if (typeof winuni !== 'undefined') {
				console.log('UniSat Wallet is installed!');
				accounts = await winuni.requestAccounts();
				$walletConnected = true;

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
        const walletInscriptions = await winuni.getInscriptions(0, limit);
        // console.log(" GetWalletInsTotal()")
        // console.log(walletInscriptions.total)
        return walletInscriptions.total

    }

				let bitmapArray = [];
                let parcelArray = [];
				let audioArray = [];
		export let htmlArray = [];
		export let mimetypes = [];
		htmlarray.set(htmlArray)
		// console.log("$htmlarray: ", $htmlarray)

    export async function GetMyBitmaps() {

        if ($walletConnected) {
            const regexBitmap = /^(?:0|[1-9][0-9]*).bitmap$/;
            const regexBitmapstr = /^(?:0|[1-9][0-9]*).bitmapstr$/;
            const hiroURL = "https://api.hiro.so/ordinals/v1/inscriptions/"
            
            try { 
                const limit = await GetWalletInsTotal()                 
                const walletInscriptions = await winuni.getInscriptions(0, limit);
				
				let types = ["text/html", "text/plain", "application/json", "image/webp"]
                
                for (let i = 0; i < walletInscriptions.total; i++) {		
                    const insID = walletInscriptions.list[i].inscriptionId;
					const mimetype = walletInscriptions.list[i].contentType;
					const insContent = walletInscriptions.list[i].content;

                    const hiro = hiroURL + insID;

                    const content = await fetch(hiro + "/content");
                    const ins = await content.text();
                    const inscriptionParts = ins.split(".");
                    // console.log(inscriptionParts);
                    const bitmapNum = inscriptionParts[0];
                    const parcelNumber = inscriptionParts[0]
                    const bitmapText = regexBitmap.test(ins)
                    const bitmapstrText = regexBitmapstr.test(ins)

                    if (bitmapText) {

                        if(inscriptionParts.length == 2) {
                            bitmapArray.push(bitmapNum);
                        } else if(inscriptionParts.length == 3) {
                            parcelArray.push(parcelNumber);
                        } else {
                            //
                        }             
                        
                    }

					if (mimetype == "text/html;charset=utf-8" ) {
					
							htmlArray.push(insContent);
							// console.log(insContent)
							} else {
								console.log("not html")
							}
							
				
						mimetypes.push(mimetype)
						//console.log("mimetypes: ", mimetypes)
				
                   
                }

				
				console.log("htmlArray", htmlArray)
                return [htmlArray, bitmapArray];

                } catch (e) {
                    console.log(" catch GetMyBitmaps ERROR");
                    console.log(e);
                }

        } else {
            console.log("else GetMyBitmaps ERROR");
        }

	
    }

	async function dropdownFiller() {
		//
	}

	function handleSubmit(html) {
        console.log("html", html);
    }

	let selected;
</script>

<div>
	<a
		href="counterparty:{publicKey}?action=sign&message=sign&icon={icon}&callback=https%3A%2F%2Flocalhost:3000%2Fapi%2FverifySignature"
		>Open FreeWallet to Sign in</a
	>
	<hr />
	{#if $walletConnected}
		<button on:click={DisconnectWallet}>UniSat: Disconnect?</button>
	{:else}
		<button on:click={ConnectWallet}>UniSat: Connect?</button>
	{/if}
</div>
<select class="dropdown" bind:value={selected}  on:change={() => handleSubmit(selected)}>
	<option>My Inscriptions</option>
	{#await dropdownFiller()}
	<p>Loading Inscriptions</p>
	{:then htmls}
			{#each $htmlarray as html, index}
			<option value={index}>{html}</option>

			{/each}
	{/await}
</select>
<select class="dropdown" bind:value={selected}  on:change={() => handleSubmit(selected)}>
	<option>mimetypes</option>
	{#await dropdownFiller()}
	<p>Loading mimetypes</p>
	{:then htmls}
			{#each mimetypes as mime, index}
			<option value={index}>{mime}</option>

			{/each}
	{/await}
</select>

