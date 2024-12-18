<svelte:head>
    <script>WebAudioControlsOptions = {
        useMidi:1,
        preserveMidiLearn:1,
      }
      
   webAudioControlsWidgetManager.addMidiListener(function(event) {
    var data = event.data;
    var channel = data[0] & 0xf;
    var controlNumber = data[1];

    console.log(
      "Midi event hook: data:[" + data + "] channel:" 
      + channel + " cc:"+ controlNumber);

    // do whatever you want with the event
    // ...
});
      </script>
     <script src="https://g200kg.github.io/webaudio-controls/webaudio-controls.js"></script>
  
</svelte:head>

<script>
    import { onMount } from "svelte";
    import * as Tone from "tone";
     import TimelineSlider from "./TimelineSlider.svelte";
    //  import loadTrack  from "./MultiTrack.svelte";
    //  import '@fontsource/material-symbols-outlined';
     let randomTrack;


    // Existing variables
    let sampleGrid;
    let durationSlider;
    let durationDisplay = 0;
    let bpmSlider;
    let bpmDisplay;
    let sampleLength;
    let SampleLengthValue = 0.0;
    let sampleStartValue = 0;
    const numSamples = 16;
    let trackUrl = randomTrack;
    let albumsIndex;
    let trackindex;
    let albumTracks = [];


    let player;
    let selected = false;
    let selectedSampleIndex = -1;
    let baseSampleDuration = 0;
    let defaultBPM = 91.5;
    let bpmMin = 45;
    let bpmMax = 260;
    let bpmSliderValue = defaultBPM;

    let loopStarts = new Array(numSamples).fill(0);
    let loopEnd;
    let loopLengths = new Array(numSamples).fill(1.0); 
    let loopBPM = new Array(numSamples).fill(91.5);
    let sessionName;
    let volumemuted = false;
    let volume = 0.5;
    let maxVolume = 100;
    let volumeSliderValue = 0.5;    
    let clearCanvas;

    let timeline;
    let startTime = 0;
    let sampleDuration;
    let trackLoaded = false;
    let sliderValue = 0;

    let midi = null;
    let midiAccess = null;

    let listeningFor = null;
    let midiAssignments = {
        volume: null,
        bpm: null,
        sampleStart: null,
        sampleLength: null
    };
    let midiAvailable = false;
    let webAudioControlsLoaded = false;
    let midiControlsLoaded = false;

    let producerName ;
    let artist;
    let audioUrl = "https://ordinals.com/content/78b3b56af07cb926b0f8ac22322cf02714db23984b875bc5be15c726cd1ed27ci0";
    let imageUrl = "./iom-icon-headphones.png";
    // New variable to control looping
    let isLooping = true;
    function handleLoadTrack() {
        //loadTrack;
    }
  
    function loadSoundAndImage(url, imageUrl) {
        player = new Tone.Player({
            url: url,
            loop: isLooping
        }).toDestination();
        player.autostart = false;
        loadAndDrawImage(imageUrl);

        Tone.loaded().then(() => {
            sampleDuration = player.buffer.duration;
            baseSampleDuration = (sampleDuration / numSamples);
            trackLoaded = player.loaded;
            
        });
    }

    function loadAndDrawImage(imageUrl) {
        const img = new Image();
        img.src = imageUrl;    
        img.onload = function() {
            fillGridWithImage(img);
        };
    }

    function fillGridWithImage(img) {
        const numCols = 4;
        const numRows = 4;
        const canvasWidth = 100; // Match the CSS size
        const canvasHeight = 100; // Match the CSS size
        const imageAspectRatio = img.width / img.height;
        const gridAspectRatio = numCols * canvasWidth / (numRows * canvasHeight);
        let sx, sy, sWidth, sHeight;
    
        if (imageAspectRatio > gridAspectRatio) {
            // Image is wider than the grid
            sHeight = img.height;
            sWidth = img.height * gridAspectRatio;
            sx = (img.width - sWidth) / 2;
            sy = 0;
        } else {
            // Image is taller than the grid
            sWidth = img.width;
            sHeight = img.width / gridAspectRatio;
            sx = 0;
            sy = (img.height - sHeight) / 2;
        }
    
        for (let i = 0; i < numCols * numRows; i++) {
            const canvas = document.createElement('canvas');
 
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            canvas.id = i.toString();
            
            const ctx = canvas.getContext('2d');
            const col = i % numCols;
            const row = Math.floor(i / numCols);
            const dx = col * canvasWidth;
            const dy = (numRows - 1 - row) * canvasHeight; // Reverse the row order
    
            
            ctx.drawImage(img, sx + (col * sWidth / numCols), sy + (row * sHeight / numRows), sWidth / numCols, sHeight / numRows, 0, 0, canvasWidth, canvasHeight);
          
            sampleGrid.appendChild(canvas);
            canvas.addEventListener('mousedown', () => selectSample(i));
        }
    }

    function selectSample(index) {
        if (selectedSampleIndex !== -1) {
            sampleGrid.children[selectedSampleIndex].classList.remove('selected');
            sampleGrid.children[selectedSampleIndex].classList.remove('pad');
            sampleGrid.children[selectedSampleIndex].style.border = "";
        }
        selected = true;
        selectedSampleIndex = index;
        updateLoopLength(loopLengths[index]);
        updateLoopStart(loopStarts[index]);
        updateLoopBPM(loopBPM[index]);
        sampleGrid.children[index].classList.add('selected');
        sampleGrid.children[index].classList.add('pad');
        sampleGrid.children[index].style.border = "2px solid yellow";
        durationSlider = baseSampleDuration;
        updateDurationDisplay(baseSampleDuration);
     }

     function handleMIDIMessage(event) {
    console.log('MIDI Message received:', {
        data: event.data,
        command: event.data[0],
        note: event.data[1],
        velocity: event.data[2]
    });
    const data = event.data;
    const channel = data[0] & 0xf;  // Get the MIDI channel (0-15)
    const command = data[0] & 0xf0;  // Get the command
    const note = data[1];
    const velocity = data.length > 2 ? data[2] : 0;

    // Handle drum pads (channel 0)
    if (channel === 0) {
        console.log('Drum channel message:', note);
        
        // Note On message with velocity > 0
        if (command === 0x90 && velocity > 0) {
            const index = note - 36;               
            selectSample(index);
            playSample(index);
            toggleCanvasState(index, true);
        }
        // Note Off message or Note On with velocity 0
        else if (command === 0x80 || (command === 0x90 && velocity === 0)) {
            const index = note - 36;
            toggleCanvasState(index, false);
        }
    }
     // Handle Keyborad pads (channel 9)
     if (channel === 9) {
        console.log('Keyborad channel message:', note);
        
        // Note On message with velocity > 0
        if (command === 0x90 && velocity > 0) {
            const index = note - 36;               
            selectSample(index);
            playSample(index);
            toggleCanvasState(index, true);
        }
        // Note Off message or Note On with velocity 0
        else if (command === 0x80 || (command === 0x90 && velocity === 0)) {
            const index = note - 36;
            toggleCanvasState(index, false);
        }
    }
    // Handle Control Change messages (knobs/sliders)
    else if (command === 0xB0) {  // 176 (0xB0) is Control Change
        // Control change message
        const control = note;
        const value = velocity / 127;  // Normalize to 0-1 range

        if (listeningFor) {
            // Learning mode - assign control to parameter
            midiAssignments[listeningFor] = control;
            localStorage.setItem('midiAssignments', JSON.stringify(midiAssignments));
            alert(`Assigned control ${control} to ${listeningFor}`);
            listeningFor = null;
        } else {
            // Normal mode - use control
            if (control === midiAssignments.volume) {
                adjustVolume(value);
            } else if (control === midiAssignments.bpm) {
                adjustLoopBPM(Math.round(value * 180)); // Scale to BPM range
            } else if (control === midiAssignments.sampleStart) {
                adjustLoopStart(value * sampleDuration);
            } else if (control === midiAssignments.sampleLength) {
                adjustLoopLength(value * sampleDuration);
            }
        }
        
        // Log the control being used
        console.log('Control Change:', {
            control,
            value,
            assignment: Object.entries(midiAssignments)
                .find(([key, val]) => val === control)?.[0]
        });
        }
    }

    function toggleCanvasState(index, isActive) {
    const canvas = document.getElementById(index.toString());
    if (canvas) {
        if (isActive) {
            canvas.style.border = "2px solid yellow"; // Example of active state
            canvas.classList.add('active');
        } else {
            canvas.style.border = ""; // Reset to default state
            canvas.classList.remove('active');
        }
        }
    }
  
     function setupMIDI() {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess()
            .then(access => {
                midiAccess = access;
                const inputs = access.inputs.values();
                console.log('MIDI Access granted', inputs);
                
                // Log available inputs
                for (let input of access.inputs.values()) {
                    console.log('MIDI Input:', input.name);
                    input.onmidimessage = handleMIDIMessage;
                }

                midiAvailable = access.inputs.size > 0;
                console.log('MIDI Available:', midiAvailable);
            })
            .catch(err => {
                console.error('MIDI Access Failed:', err);
                midiAvailable = false;
            });
    } else {
        console.warn('WebMIDI not supported in this browser');
        midiAvailable = false;
        }
    }

    function adjustVolume(value) {
        volume = value;
        player.volume.value = Tone.gainToDb(value);
    }

    function adjustLoopStart(value) {
        sampleStartValue = value;
            // startTime = sampleStartValue;
        if (selectedSampleIndex !== -1) {
            loopStarts[selectedSampleIndex] = parseFloat(value);
            updateLoopStart(value);
            playSample(selectedSampleIndex);
        }
    }

    function adjustLoopLength(value) {
        SampleLengthValue = value;
        sampleLength = sampleDuration - SampleLengthValue;
        if (selectedSampleIndex !== -1) {
            loopLengths[selectedSampleIndex] = parseFloat(value);
            updateLoopLength(value);
            playSample(selectedSampleIndex);
        }
    }

    function adjustLoopBPM(value) {
        bpmSliderValue = Math.round(value);
        if (selectedSampleIndex !== -1) {
            loopBPM[selectedSampleIndex] = bpmSliderValue;
            updateLoopBPM(bpmSliderValue);
            playSample(selectedSampleIndex);
            console.log("bpmSliderValue", bpmSliderValue);
        }
    }


    function updateLoopBPM(value) {
        bpmSliderValue = value; // Ensure the BPM value is a whole number
        sessionStorage.setItem('loopBPM',  (loopBPM));
        // console.log("loopBPM", value);
    }

    function loadSessionData() {
        // Try loading from sessionStorage first
        const storedLengths = sessionStorage.getItem('loopLengths');
        const storedStarts = sessionStorage.getItem('loopStarts');
        const storedBPM = sessionStorage.getItem('loopBPM');

        // Try loading saved session from localStorage
        const savedSession = localStorage.getItem('sessionSettings');
        
        if (savedSession) {
            loopLengths = savedSession.loopLengths;
            loopStarts = savedSession.loopStarts;
            loopBPM = savedSession.loopBPM;
            midiAssignments = savedSession.midiAssignments;
            sessionName = savedSession.albumName;
         } else if (storedLengths) {
            loopLengths = storedLengths;
            loopStarts = storedStarts;
            loopBPM = storedBPM;
        }

        const storedMidiAssignments = JSON.parse(localStorage.getItem('midiAssignments'));
        if (storedMidiAssignments) {
            midiAssignments = storedMidiAssignments;
        }
    }

    function updateDurationDisplay(value) {
        durationDisplay = value;
        if (selectedSampleIndex !== -1) {
            playSample(selectedSampleIndex);
         }        
    }

    function playSample(index) {
    // Stop the player in case it's already playing
    player.stop();

    // Use the selected sample's start time and length
    const startTime = loopStarts[index];
    const duration = loopLengths[index];

    player.loopStart = startTime;
    player.loopEnd = startTime + duration;
    player.loop = isLooping;
    player.playbackRate = bpmSliderValue / defaultBPM;
        if (isLooping) {
            player.start(Tone.now(), startTime);
        } else {
            player.start(Tone.now(), startTime, duration);
        }
    
}

function updateLoopStart(value) {
    sampleStartValue = value;
    loopStarts[selectedSampleIndex] = value;
    player.loopStart = value;
    sessionStorage.setItem('loopStarts', JSON.stringify(loopStarts));
}

function updateLoopLength(value) {
    SampleLengthValue = value;
    loopLengths[selectedSampleIndex] = value;
    player.loopEnd = loopStarts[selectedSampleIndex] + value;
    sessionStorage.setItem('loopLengths', JSON.stringify(loopLengths));
}

    function format(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return `${minutes}:${seconds}`;
    }

    function getPercentage(currentTime) {
        const percentage = (Math.floor(currentTime) / sampleDuration) * 100 + "%";
        return percentage;
    }

    function listenForControl(parameter) {
        listeningFor = parameter;
        alert(`Listening for MIDI control to assign to ${parameter}...`);
    }
     function changeVolume(volumeSliderValue) {
      volume = volumeSliderValue / 100;
      if (volume === 0) {
          volumemuted = true;
      } else {
          volumemuted = false;
      }
  }

  function muteUnmute() {
      if (volumemuted === true) {
          volumemuted = false;
          volume = 0.5;
      } else {
          volumemuted = true;
          volume = 0;
      }
  }
  function stopSample() {
        if (player) {
            player.stop();
        }
    }
    $: if (player) {
    player.loop = isLooping;
    if (player.state === "started") {
        // Restart the player to apply the new loop setting
        const currentTime = player.loopStart;
        player.stop();
        if (isLooping) {
            player.start(Tone.now(), currentTime);
        } else {
            const duration = player.loopEnd - player.loopStart;
            player.start(Tone.now(), currentTime, duration);
        }
    }
}

    onMount(() => {
    //  loadSessionData();
    loadSoundAndImage(audioUrl, imageUrl);
    setupMIDI();
    
    // Cleanup function
    return () => {
        if (midiAccess) {
            for (let input of midiAccess.inputs.values()) {
                input.onmidimessage = null;
            }
        }
        };
    });

    // Add this new function after the other function declarations in the <script> section
    function saveSessionSettings() {
        const sessionSettings = {
            loopLengths,
            loopStarts,
            loopBPM,
            midiAssignments,
            sessionName,
            trackUrl,
            imageUrl,
            // albumName: $randomItems.trackAlbum
        };
        
        localStorage.setItem('sessionSettings', JSON.stringify(sessionSettings));
        alert('Session settings saved!');
    }

    // Add this new function after saveSessionSettings
    function clearSessionSettings() {
        // Clear localStorage
        localStorage.removeItem('sessionSettings');
        localStorage.removeItem('midiAssignments');
        
        // Reset arrays to default values
        loopLengths = new Array(numSamples).fill(1.0);
        loopStarts = new Array(numSamples).fill(0);
        loopBPM = new Array(numSamples).fill(91.5);
        midiAssignments = {
            volume: null,
            bpm: null,
            sampleStart: null,
            sampleLength: null
        };
        
        // Reset current values if a sample is selected
        if (selectedSampleIndex !== -1) {
            updateLoopLength(1.0);
            updateLoopStart(0);
            updateLoopBPM(91.5);
        }
        
        alert('Session settings cleared!');
    }

    function dragOverHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}
function dropHandler(ev, type) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
            if (ev.dataTransfer.items[i].kind === 'file') {
                var file = ev.dataTransfer.items[i].getAsFile();
                var reader = new FileReader();
                
                reader.onload = (function(theFile) {
                    return function(e) {
                        if (type === 'image') {
                            // Handle image URL
                            console.log('Image URL:', e.target.result);
                        } else if (type === 'audio') {
                            // Handle audio URL
                            console.log('Audio URL:', e.target.result);
                        }
                    };
                })(file);

                // Read the file as a data URL
                reader.readAsDataURL(file);
            }
        }
    } else {
        // Use DataTransfer interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.files.length; i++) {
            console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
        }
    }
}

</script>

<div class="w-96 text-white/80 flex justify-center">
    <div class="flex flex-col sm:flex-row sm:gap-4 lg:flex-col">
        <div id="sampleGrid"  bind:this={sampleGrid} class="grid sm:w-1/2 lg:w-full"></div>
        <div class="sm:w-1/2 lg:w-full">
            <!-- <p class="text-sm font-bold text-center font-mono p-1">{producerName}</p>
            <p class="text-sm font-bold text-center font-mono p-1">{$randomItems.trackAlbum}</p> -->
            
            {#if trackLoaded}
                <div class="controls">
                    <small class="text-sm font-bold text-center font-mono p-1">startTime: {format(startTime)}</small>
                    <small class="text-sm font-bold text-center font-mono p-1">Sample Length: {format(durationDisplay)}</small>
                
                    <label for="bpmSlider">BPM: {bpmSliderValue}</label>
                    {#if midiAvailable}
                     <button on:click={() => listenForControl('bpm')}>Listen for BPM</button>
                     {/if}
                     <TimelineSlider
                        min={0}
                        max={260}
                        timeline={bpmSliderValue/10}
                         {getPercentage}
                        timeChange={adjustLoopBPM}
                        sliderValue={bpmSliderValue}
                        thumbsliderImage={imageUrl}
                        step={1}
                    />
                     <br/>
                    <label for="sampleLength" id="SampleLengthValue">Sample Length: {SampleLengthValue}</label>
                    {#if midiAvailable}
                    <button on:click={() => listenForControl('sampleLength')}>Listen for Sample Length</button>
                    {/if}
                    <TimelineSlider
                        min={0}
                        max={sampleDuration}
                        timeline={SampleLengthValue}
                         {getPercentage}
                        timeChange={adjustLoopLength}
                        sliderValue={SampleLengthValue}
                        thumbsliderImage={imageUrl}
                        step={0.1}
                    />
                     <br/>
                    <label for="sampleStart" id="sampleStartValue">Sample Start: {format(sampleStartValue)}</label>
                    {#if midiAvailable}
                    <button on:click={() => listenForControl('sampleStart')}>Listen for Sample Start</button>
                    {/if}
                    <TimelineSlider
                        min={0}
                        max={sampleDuration}
                        timeline={sampleStartValue}
                         {getPercentage}
                        timeChange={adjustLoopStart}
                        sliderValue={sampleStartValue}
                        thumbsliderImage={imageUrl}
                        step={0.1}
                    />
                 
                   <br/>
                    <div class="flex justify-between col-span-4 gap-4">
                        <div class=" ">
                            <label class="loop-toggle ">
                                <input type="checkbox" bind:checked={isLooping}>
                                Loop Sample
                            </label>
                        </div>
                        <div class="flex gap-2">
                            <button class="mx-auto" on:click={stopSample}>
                                🛑
                                {#if midiAvailable}
                                <button class="text-sm font-bold text-center font-mono p-1" on:click={() => listenForControl('sampleStart')}>Listen for Sample Start</button>
                                {/if}
                            </button>
                            <!-- <button 
                                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                                on:click={saveSessionSettings}>
                                Save Session
                            </button>
                            <button 
                                class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                                on:click={clearSessionSettings}>
                                Clear Session
                            </button> -->
                        </div>
                    </div>
                </div>
            {:else}
                <p class="text-sm font-bold text-center font-mono p-2">...Loading</p>
            {/if}
        </div>
    </div>
</div>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(4, 100px);
        grid-gap: 4px;
        box-shadow: 1px 1px 20px 6px rgb(27, 27, 27);
        
    }

    .controls {
        background-color: #111111e3;
        border: #1c2023;
        padding: 10px;
        font-size: 1em;
        border-radius: 8px;
        border-color: rgba(0, 0, 0, 0.53);
        border-width: 1px;
        box-shadow: 1px 1px 20px 5px rgb(27, 27, 27);
      }
 
  
</style>
