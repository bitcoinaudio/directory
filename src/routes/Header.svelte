<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/ba-logo.svg';
	import github from '$lib/images/github.svg';
	import Modal from '../components/Modal.svelte';
	import wallet from '$lib/images/wallet.svg';
	import Connect from '../components/Connect.svelte';
	import { walletConnected } from '../stores';

	let showModal = false;

	

	export let message = 'This site is currently in experimental mode. Some features may not work as expected.';
    let isVisible = true;

    function closeNotification() {
        isVisible = false;
    }


</script>

<header>
	<div class="corner">
		<a href="https://bitcoinaudio.co/">
			<img src={logo} alt="BitcoinAudio" />
		</a>
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
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
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About Us</a>
			</li>
			{#if $walletConnected}
			<li aria-current={$page.url.pathname === '/rules' ? 'page' : undefined}>
				<a href="/rules">Rules</a>
			</li>
			<li aria-current={$page.url.pathname === '/submit' ? 'page' : undefined}>
				<a href="/submit">Submit</a>
			</li>
			<li aria-current={$page.url.pathname === '/myinscriptions' ? 'page' : undefined}>
				<a href="/myinscriptions">My Inscriptions</a>
			</li>
			{/if}
			
			
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
		{#if isVisible}
<div class="notification-bar">
    <p>{message}</p>
    <button on:click={closeNotification}>&times;</button>
</div>
{/if}
		
	</nav>
	

	<div class="corner">
		
		<span><a href="https://github.com/bitcoinaudio/directory">
			<img src={github} alt="GitHub" />
		</a></span>
		<button class="connectbutton" on:click={() => (showModal = true)}> 
			<img src={wallet} alt="GitHub" />
		 </button>
	</div>

		
		
</header>


<Modal bind:showModal>
	
	<Connect />

	
</Modal>


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

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(0, 0, 0, 0.7);
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

	.connectbutton {
		background: none;
		border: none;
		cursor: pointer;

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
