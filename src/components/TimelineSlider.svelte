<script>
    export let min;
    export let max;
    export let timeline;
    // export let trackLoaded;
    // export let duration;
    export let getPercentage;
    export let timeChange;
    export let sliderValue;
    export let thumbsliderImage ;
    export let step;
    
</script>

<div class="range-slider">
    <input type="range" min={min} max={max} class="slider"
    bind:value={sliderValue} on:input={() => timeChange(sliderValue)} step={step}/>
    
    <img src={thumbsliderImage} alt="" class="slider-thumb"
    style="left: calc({getPercentage(timeline)} - 0.5em);">

    <div class="progress"
    style="left: calc({getPercentage(timeline)} - 0.5em);">
    </div> 

</div>

<style>
    .slider::-webkit-slider-thumb {
        width: 0;
    }
    .slider-thumb {
        position: absolute;
        width: 2em;
        height: 2em;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: -0.5em;
        transform: translateY(-50%);
        z-index: 2;
        pointer-events: none;
        opacity: 90%;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
    }

</style>