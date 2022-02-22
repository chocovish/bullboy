<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import client from '$lib/supabase';
	import { onMount } from 'svelte';
	import { Column, Container, Input, Button, Row, Modal, ModalBody } from 'sveltestrap';
	import NavBar from '../components/nabvar.svelte';

	let user = client.auth.user();

	let showOnlyFav = false;
	let messages = [];
	let loading = false;
	let all_msgs = messages;
	let modalOpen = false;
	let modalMsg = '';

	$: {
		if (showOnlyFav) {
			messages = all_msgs.filter((m) => m.favourite == true);
		} else {
			messages = all_msgs;
		}
	}

	async function sharelink() {
		navigator.share({
			title: 'hey tell me something!',
			url: `//${$page.url.host}/${user?.email}`
		});
	}

	async function getMessages() {
		loading = true;
		all_msgs = (await client.from('messages').select('*').order('id', { ascending: false })).data;
		console.table(messages);
		loading = false;
	}
	async function deleteMessage(msg_id) {
		if (!confirm('You sure wanna delete this message?')) return;
		let resp = await client.from('messages').delete().eq('id', msg_id);
		getMessages();
	}

	async function favToggle(msg) {
		let resp = await client.from('messages').update({ favourite: !msg.favourite }).eq('id', msg.id);
		if (resp.error) {
			console.log(resp.error);
			//alert(resp.error.details);
			return;
		}
		getMessages();
		// alert('Marked as favourite');
		modalMsg = msg.favourite ? 'Removed from favourite' : 'Marked as favourite';
		modalOpen = true;
	}

	onMount(() => {
		if (!client.auth.user()) {
			goto('/login');
			return;
		}
		getMessages();
	});
</script>

<svelte:head>
	<title>Hushh - Get anonymous messages</title>
</svelte:head>


<div
	style="position:fixed;top:0;left:0;background-image: linear-gradient( 95.2deg, rgba(173,252,234,1) 26.8%, rgba(192,229,246,1) 64% );min-height:100%;min-width:100%"
/>
<NavBar />
<Container class="mt-3">
	<Modal isOpen={modalOpen} toggle={() => (modalOpen = !modalOpen)}>
		<ModalBody>
			{modalMsg}
		</ModalBody>
	</Modal>
	<div class="row justify-content-center">
		<div class="col col-12 col-sm-6">
			<div class="card text-center p-2 shadow">
				Your page link: {`${$page.url.host}/${user?.email}`}
				<Button class="px-2" size="sm" color="secondary" on:click={sharelink}>Share</Button>
			</div>

			<Input
				on:change={() => (showOnlyFav = !showOnlyFav)}
				type="switch"
				label={showOnlyFav ? 'Show all' : 'Show only Favourites'}
				bsSize="lg"
				class="my-2"
			/>
			{#each messages as msg}
				<div class="card mt-2">
					<div class="card-body p-4 m-1">
						{msg.message}
					</div>
					<div class="card-footer text-end">
						<span class="text-muted">{new Date(msg.created_at).toLocaleString()}</span>
						<button on:click={() => favToggle(msg)} class="btn btn-warning"
							>{msg.favourite ? 'Remove from Favourite' : 'Mark as favourite'}</button
						>
						<a
							href="#!"
							on:click|preventDefault={() => deleteMessage(msg.id)}
							class="btn btn-danger">Delete</a
						>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Container>
