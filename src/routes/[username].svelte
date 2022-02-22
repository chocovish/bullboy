<script>
	import { page } from '$app/stores';
	import client from '$lib/supabase';
	import { onMount } from 'svelte';
import { Modal, ModalBody, Table } from 'sveltestrap';
	let username = $page.params.username;
	let message = '';

	let modalMsg = ""
	let modalOpen = false;

	let user_extra = {};
	async function getUserExtra() {
		let resp = await client.from('user_extra').select('id').eq('username', username);
		if (resp.data) {
			user_extra = resp.data[0];
		}
	}
	async function saveMessage() {
		await getUserExtra()
		if(!user_extra) {
			alert("unable to send. user does not exist")
			return
		}
		console.table(user_extra)
        let resp = await client.from("messages").insert({message,user_id:user_extra.id},{returning:"minimal"})
        if(resp.error){
            alert(resp.error.message)
            console.table(resp.error)
        } else {
			message = ""
			modalMsg = "Sucessfully sent!"
			modalOpen = true;
            // alert("Successfully sent!")
        }
    }
	// onMount(getUserExtra);
</script>

<section class="d-flex align-items-center justify-content-center vh-100">
	<Modal isOpen={modalOpen} toggle={() => (modalOpen = !modalOpen)}>
		<ModalBody>
			{modalMsg}
		</ModalBody>
	</Modal>
	<div class="container col-12 col-sm-4 text-center">
		<div class="card p-2 shadow-lg">
			<div class="card-body">
				<h5 class="card-title">Give a constructive message to {username}</h5>
				<form on:submit|preventDefault={saveMessage}>
					<textarea
						class="form-control"
						bind:value={message}
						required
						name="message"
						id=""
						cols="20"
						rows="5"
					/>
					<button class="btn btn-success mt-1 block">Send Message</button>
				</form>
			</div>
		</div>
		<a href="/login" class="btn btn-dark btn-lg mt-4 fw-bold">Make your profile here 😍</a>
	</div>
</section>
