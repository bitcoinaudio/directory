<script>
    import ThemeToggle from "./ThemeToggle.svelte";
    import logo from '$lib/images/ia-logo-1.webp';
	import github from '$lib/images/github.svg';
	import wallet from '$lib/images/wallet.svg';
	import { page } from '$app/stores';
    import { walletConnected } from "../stores";
    import Modal from "./Modal.svelte";
    import ConnectUnisat from '../components/ConnectUnisat.svelte';
	import ConnectXverse from '../components/ConnectXverse.svelte';
    import ConnectMagic from '../components/ConnectMagic.svelte';
    import ConnectLaserEyes from '../components/ConnectLaserEyes.svelte';

    const navigation = [
        { name: "My Inscibed", href: "/" },
        // { name: "Services", href: "#services" },
        // { name: "Testimonial", href: "#testimonial" },
        // { name: "Team", href: "#team" },
        // { name: "Contact Us", href: "#contactus" },
        // { name: "My Inscriptions", href: "/myinscriptions"},
        { name: "Collections", href: "/collections"},
        // { name: "Radinals", href: "/radinals"},
        
        
    ];

    let active = "Home";
   

    /**
     * @param {string} itemName
     */
    function setActive(itemName) {
        active = itemName;
    }

    
</script>
 
<nav>
<div class="sticky top-0 z-50 flex justify-center py-4 ">
    <!-- <img src={logo} alt="Inscribed Audio Logo" class="w-40 h-30" /> -->

    <div class="navbar max-w-4xl rounded-box py-0 shadow-xl backdrop-blur md:max-w-3xl gap-8 ">
        <div class="navbar-start">
            <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-circle btn-ghost lg:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul class="menu dropdown-content menu-md z-[1] mt-3 w-52 gap-2 rounded-box bg-base-100 p-2 shadow">
                    {#each navigation as item}
                        <li>
                            <a href={item.href} class="font-urbanist">{item.name}</a>
                        </li>
                    {/each}
                    
                    {#if $walletConnected}
                    <li aria-current={$page.url.pathname === '/callback' ? 'page' : undefined}>
                        <a href="/callback" >Callback</a>
                    </li>
                    <li aria-current={$page.url.pathname === '/myinscriptions' ? 'page' : undefined}>
                        <a href="/myinscriptions" >My Media</a>
                    </li>
                    <li aria-current={$page.url.pathname === '/samplerr' ? 'page' : undefined}>
                        <a href="/samplerr" on:click={() => setActive("Samplerr")}>Samplerr</a>
                    </li>
                    {/if}
                    <li><ConnectUnisat /></li>
                    <li><ConnectXverse /></li>
                </ul>
            </div>
            <a href="https://inscribed.audio" class="btn btn-ghost rounded-full font-urbanist text-lg font-semibold">Inscribed Audio</a>
        </div>
        
        <div class="navbar-center ml-10 hidden lg:flex gap-4">
            {#each navigation as item}
                <nav class="menu menu-horizontal px-1">
                    <a
                        href={item.href}
                        class={`btn btn-ghost rounded-full font-urbanist text-sm font-light ${
                            active === item.name ? "bg-base-300" : ""
                        }`}
                        on:click={() => setActive(item.name)}>{item.name}</a>
                </nav>
            {/each}
            {#if $walletConnected}
            <li aria-current={$page.url.pathname === '/myinscriptions' ? 'page' : undefined}>
                <a 
                href="/myinscriptions" on:click={() => setActive("My Media")}
                class={`btn btn-ghost rounded-full font-urbanist text-sm font-light ${
                    active === "My Media" ? "bg-base-300" : ""
                }`} >My Media</a>
            </li>
            <li aria-current={$page.url.pathname === '/samplerr' ? 'page' : undefined}>
                <a href="/samplerr"
                class={`btn btn-ghost rounded-full font-urbanist text-sm font-light ${
                    active === "Samplerr" ? "bg-base-300" : ""
                }`}
                 on:click={() => setActive("Samplerr")}>Samplerr</a>
            </li>
            {/if}
            <div class="dropdown dropdown-bottom dropdown-end btn-ghost">
                {#if !$walletConnected}
                <div tabindex="0" role="button" class="btn-ghost m-1">Connect</div>
                {/if}
                {#if $walletConnected}
                <div tabindex="0" role="button" class="btn-ghost m-1">Disconnect</div>
                {/if}

                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <!-- <li><ConnectMagic /></li> -->
                <li><ConnectUnisat /></li>
                <li><ConnectXverse /></li>
                <!-- <li><ConnectLaserEyes /></li> -->
                </ul>
            </div>
                            
         </div>

         <div class="navbar-end">
            <ThemeToggle />
         </div>
       
    </div>
</div>
</nav>