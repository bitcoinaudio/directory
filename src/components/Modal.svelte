<script>
	export let showModal;
	let dialog; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog class="modal"
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div  class="modal-box">
		<slot name="header" />
		<!-- <hr />
		<slot name="cp" />
		<hr /> -->
		<slot />
		
		<!-- svelte-ignore a11y-autofocus -->
		<div class="closebtn">
		<button class='btn' autofocus on:click={() => dialog.close()}>close this</button>
	</div>
	</div>
</dialog>
