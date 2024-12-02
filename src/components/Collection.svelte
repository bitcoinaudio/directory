<script>
  import iomCollection from '$lib/images/collections/idesofmarch.json'
 
 // Pagination state
 let currentPage = 1;
 const itemsPerPage = 21; // Adjust this number as needed

 // Calculate the total number of pages
 const totalPages = Math.ceil(iomCollection.length / itemsPerPage);

 // Get the items for the current page
 $: paginatedItems = iomCollection.slice(
   (currentPage - 1) * itemsPerPage,
   currentPage * itemsPerPage
 );

 // Function to change the page
 function changePage(page) {
   if (page > 0 && page <= totalPages) {
     currentPage = page;
   }
 }
</script>
 <div class="grid grid-cols-4 gap-4">   
  
 
    {#each paginatedItems as item, index}
    <div class="card flex flex-wrap ">
      
          <div class="card-body shadow-inner flex flex-col justify-center">
          
          <iframe src={"https://radinals.bitcoinaudio.co/content/" + item.id} title=""   allowfullscreen></iframe>
         
          <a href={"https://ordinals.com/inscription/" + item.id} target="_blank"> 

          <p class="font-urbanist font-black ">
            {item.meta.name}
          </p>
          </a>

          <div  class="card-actions justify-center">
            <ul class="menu menu-horizontal bg-base-200 rounded-box mt-1">
              <li>
                <!-- svelte-ignore a11y-missing-attribute -->
                <a class="tooltip" data-tip="Home" href={'/collections'}>
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </a>
              </li>
              <li>
                <a class="tooltip" data-tip="Details" href={"https://ordinals.com/inscription/" +  item.id} target="_blank">
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              </li>
              <li>
                <a class="tooltip" data-tip="App" href={"https://ordinals.com/content/" + item.id} target="_blank">
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </a>
              </li>
            </ul>
            </div>

        </div>
      </div> 

    {/each}
    
  </div>
<!-- Pagination Controls -->
<div class="join pagination-controls">
  <button class="join-item" on:click={() => changePage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
  <span class="join-item">Page {currentPage} of {totalPages}</span>
  <button class="join-item" on:click={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
</div>

<style>

	.card {
 		margin: 10px;
	}

	.card-body {
		padding: 10px;
	}

	 

	.card-title {
		font-size: 1.5rem;
	}

  iframe {
    height: 200px ;
    width: 200px;
  }

	.text-md {
		font-size: 0.875rem;
	}

	.pagination-controls {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}

	.pagination-controls button {
		margin: 0 5px;
		padding: 5px 10px;
		background-color: #f0f0f0;
		border: none;
		cursor: pointer;
	}

	.pagination-controls button:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
</style>