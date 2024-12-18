<script lang="ts">
  import {LaserEyesProvider, MAINNET} from "@omnisat/lasereyes";
    let count: number = 0;
  
    function increment() {
      count += 1;
    }
  </script>
  
  <button on:click={increment}>
    Count is {count}
  </button>
  