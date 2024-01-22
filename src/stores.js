import { writable } from 'svelte/store'

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
export const walletConnected = writable()
export const verifiedBitmapstr = writable()
export const unisatAccounts = writable("no accounts")
export const isBitmapOwner = writable(false)
export const htmlarray = writable()

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