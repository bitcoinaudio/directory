<script>
    import { onMount } from 'svelte';
    import idesofmarch from '../lib/collections/idesofmarch.json';
    import ordImage from '../lib/images/ordinals.svg';
	import iomImage from '../lib/images/idesofmarch.png';
    let items = idesofmarch;
    let itemsPerPage = 10; // default items per page
    let currentPage = 1; 
  
    // Compute the total number of pages
    $: totalPages = Math.ceil(items.length / itemsPerPage);
  
    // Compute the displayed items for the current page
    $: startIndex = (currentPage - 1) * itemsPerPage;
    $: endIndex = startIndex + itemsPerPage;
    $: currentItems = items.slice(startIndex, endIndex);
  
    // Handlers for pagination
    function prevPage() {
      if (currentPage > 1) {
        currentPage--;
      }
    }
  
    function nextPage() {
      if (currentPage < totalPages) {
        currentPage++;
      }
    }
  
    function handleItemsPerPageChange(event) {
      itemsPerPage = parseInt(event.target.value, 10);
      currentPage = 1; // Reset to first page when items per page changes
    }

    onMount(() => {
        console.log("Gallery mounted");
    });
  </script>
  
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">The Ides of March Collection</h1>
  
    <!-- Items per page selector -->
    <div class="mb-4">
      <label class="mr-2">Items per page:</label>
      <select class="select select-bordered w-32" on:change={handleItemsPerPageChange}>
        <option value="5">5</option>
        <option value="10" selected>10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  
    <!-- Gallery Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {#each currentItems as item}
        <div class="card bg-base-100 shadow-md">
          <figure><iframe
            src={ 'https://ordinals.com/content/' + item.id}
            title={"Inscription " + item.id}
            scrolling="no"
            allowfullscreen>
        </iframe></figure>
          <div class="card-body">
            <h2 class="card-title">{item.meta.name}</h2>
            <!-- Additional info can go here, if available -->
            <p>ID: {item.id}</p>
             <div class="card-actions justify-center">
                <ul class="menu menu-horizontal bg-base-200 rounded-box mt-1">
                    <li>
                        <a class="tooltip" data-tip="Home" href="/" target="_blank">
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
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a class="tooltip" data-tip="Details" href="/collection" target="_blank">
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
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a class="tooltip" data-tip="App" href="/myinscriptions" target="_blank">
                            <img class="size-5" src={ordImage} alt="IOM" />
                        </a>
                    </li>
                    <li>
                        <a class="btn btn-sm" href={"https://ordinals.com/content/" + item.id} target="_blank">
                            <img src={iomImage} alt="IOM" class="w-10 h-10" />
                        </a>
                    </li>

                </ul>
            </div>

          </div>
        </div>
      {/each}
    </div>
  
    <!-- Pagination Controls -->
    {#if totalPages > 1}
      <div class="flex items-center justify-center space-x-2 mt-8">
        <button class="btn btn-sm" on:click={prevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button class="btn btn-sm" on:click={nextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    {/if}
  </div>
  
  <style>
    /* Optional additional styles */
  </style>
  