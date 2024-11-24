<script>
    import ThemeToggle from "./ThemeToggle.svelte";
	import { page } from '$app/stores';
    import { walletConnected } from "../stores";


    const navigation = [
        { name: "Home", href: "#home" },
        { name: "Services", href: "#services" },
        { name: "Testimonial", href: "#testimonial" },
        { name: "Team", href: "#team" },
        { name: "Contact Us", href: "#contactus" },
        { name: "My Inscriptions", href: "/myinscriptions"},
        { name: "Collections", href: "/collections"},
        
        
    ];

    let active = "Home";
    export let message = 'This site is currently in experimental mode. Some features may not work as expected.';
    let isVisible = false;

    function closeNotification() {
        isVisible = false;
    }

    /**
     * @param {string} itemName
     */
    function setActive(itemName) {
        active = itemName;
    }
</script>
<nav>
    
  
    {#if isVisible}
<div class="notification-bar">
<p>{message}</p>
<button on:click={closeNotification}>&times;</button>
</div>
{/if}
    
</nav>

<div class="sticky top-0 z-50 flex justify-center py-4">
    <div class="navbar max-w-xs rounded-full bg-base-100/90 py-0 shadow-2xl outline outline-base-content/5 backdrop-blur md:max-w-4xl">
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
                        <li aria-current={$page.url.pathname === '/collections' ? 'page' : undefined}>
                            <a href="/collections">Collections</a>
                        </li>
                        <li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
                            <a href="/about">About Us</a>
                        </li>
                        {#if walletConnected}
                        <li aria-current={$page.url.pathname === '/radinals' ? 'page' : undefined}>
                            <a href="/radinals">Radinals</a>
                        </li>
                      
                        <li aria-current={$page.url.pathname === '/myinscriptions' ? 'page' : undefined}>
                            <a href="/myinscriptions">My Inscriptions</a>
                        </li>
                        {/if}
                    {/each}

                </ul>
            </div>
            <a href="/" class="btn btn-ghost rounded-full font-urbanist text-lg font-semibold">Inscribed Audio</a>
        </div>
        
        <div class="navbar-center ml-10 hidden lg:flex">
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
        </div>
        <div class="navbar-end h-10">
            <ThemeToggle />
         </div>
    </div>
</div>
