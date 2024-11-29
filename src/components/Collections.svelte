<script>
 import collections from '../collections';
</script>
 
<div
  id="collections"
  class=" "
>
  <div class=" ">
    <h1 class="text-center font-urbanist text-2xl font-semibold md:text-5xl">
      
    </h1>
    <span
      class="text-md font-urbanist mt-2 px-2 text-center md:mt-4 md:px-5 md:text-xl"
      ></span
    > 
  </div>
  <div class="container flex flex-wrap gap-4">
    {#each collections as item, index}
      <div
        class="card max-w-2xl  transition duration-300 hover:-translate-y-1 bg-base-200 rounded-box mt-4 gap-4"
      >
        <div class="card-body shadow-inner">
          
          <iframe src={item.ordinal} title="" scrolling=no  height="100%" width="100%" allowfullscreen></iframe>
         

          <h2 class="font-urbanist card-title text-3xl font-black">
            {item.name}
          </h2>
          <p class="text-md font-urbanist font-medium opacity-60">
            {item.description}
          </p> 

          <div  class="card-actions justify-center">
            <ul class="menu menu-horizontal bg-base-200 rounded-box mt-1">
              <li>
                <a class="tooltip" data-tip="Home">
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
                <a class="tooltip" data-tip="Details" href={item.ordinal} target="_blank">
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
                <a class="tooltip" data-tip="App" href={item.app} target="_blank">
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
</div>
<style>
	.collections {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		
	}

  .iframe {
    height: 100%;
    width: 100%;
  }
</style>