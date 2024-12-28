import {get, writable } from 'svelte/store'
 

export const darkMode = writable(true)
export const serverConnected = writable(false)
export const serverDelay = writable(1000)
export const devEvents = writable({
	addOneCallback: null,
	addManyCallback: null,
	addBlockCallback: null
})

export const settingsOpen = writable(false)

export const currentHeight = writable(0)
export const walletConnected = writable(false)
export const walletProvider = writable(null)
export const walletUnisatConnected = writable(false)
export const walletXverseConnected = writable(false)
export const walletMagicConnected = writable(false)
export const verifiedBitmapstr = writable()
export const unisatAccounts = writable("no accounts")
export const isBitmapOwner = writable(false)
export const isIOMOwner = writable(false)
export const htmlArray = writable()
export const mimeArray = writable()
export const iscpverified = writable(false)
export const myinscriptions = writable()
export const isMobile = writable(false)
export const isAndroid = writable(false)
export const isIOS = writable(false)
export const isInXverseBrowser = writable(false);


const defaultSettings = {
	darkMode: true,
	audioOn: false,
	showMyBitmap: false,
	noTrack: false,
	verifiedBitmapstr: false,
	showNav: false
}

export const urlPath = writable(null)
export const settingsBitmap = createCachedDict('settingsBitmap', defaultSettings)




function createCachedDict ( setValues, defaultValues) {
	const initial = {
		...defaultValues
	}
}