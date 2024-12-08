<script>
// @ts-nocheck

	import { page } from '$app/stores';
	import logo from '$lib/images/ia-logo.svg';
	import Modal from '../components/Modal.svelte';
	import wallet from '$lib/images/wallet.svg';
	import { walletConnected } from '../stores';
	import NavBar from '../components/NavBar.svelte';
	import ConnectUnisat from '../components/ConnectUnisat.svelte';
	import SatsConnect from '../components/SatsConnect.svelte';
	let showModal = false;

	function openModal() {
		showModal = true;
	}
</script>

<header>
	<nav class="navbar max-w-xl rounded-box py-0 shadow-xl backdrop-blur md:max-w-3xl gap-8 text-black">
		<div class="">
			<a href="https://inscribed.audio/">
				<img src={logo} alt="Inscribed Audio" />
			</a>
		</div>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/radinals' ? 'page' : undefined}>
				<a href="/radinals">Radinals</a>
			</li>
			<!-- <li aria-current={$page.url.pathname === '/directory' ? 'page' : undefined}>
				<a href="/directory">Directory</a>
			</li> -->
			<li aria-current={$page.url.pathname === '/collections' ? 'page' : undefined}>
				<a href="/collections">Collections</a>
			</li>
			<!-- <li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About Us</a>
			</li> -->
			{#if $walletConnected}
				<li aria-current={$page.url.pathname === '/myinscriptions' ? 'page' : undefined}>
					<a href="/myinscriptions">My Media</a>
				</li>
			{/if}
		</ul>

		<button class=" justify-center" on:click={openModal}>
			<img class="size-24" src={wallet} alt="wallet connect" />
		</button>

		<div class="dropdown dropdown-bottom dropdown-end">
			<div tabindex="0" role="button" class="btn m-1">Click</div>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
			<li><ConnectUnisat /></li>
			<li><SatsConnect /></li>
			</ul>
		</div>
	</nav>
</header>
 
<style>
	header {
		display: flex;
		justify-content: space-between;
		padding-bottom: 5px;
 		z-index: 1;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

 

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}
	li:hover {
		text-decoration: underline;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
 

	.notification-bar {
		background-color: #f8d7da; /* Light red background */
		color: #721c24; /* Dark red text */
		padding: 10px;
		position: fixed;
		top: 48px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		z-index: 1000;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.notification-bar p {
		margin: 0;
	}

	/* Optional: Responsive design for smaller screens */
	@media (max-width: 600px) {
		.notification-bar p {
			font-size: 0.9em;
		}
	}

</style>
