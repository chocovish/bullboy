<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import client from '$lib/supabase';

	import {
		Card,
		CardBody,
		CardHeader,
		CardTitle,
		Input,
		Label,
		FormGroup,
		Form,
		Button
	} from 'sveltestrap';

	let email = '';
	let password = '';
	async function onsignin() {
		let resp = await client.auth.signIn({ provider: 'facebook' },{redirectTo:`http://${$page.url.host}`});
		// if (resp.error) {
		// 	alert(resp.error.message);
		// } else {
		// 	console.log('user is', resp.user);
		// 	let count = await client
		// 		.from('user_extra')
		// 		.upsert({ id: resp.user.id, username: resp.user.email });
		// 		alert("wait..")
		// 	console.log(resp.user, count);
		// 	//goto('/');
		// }
	}
</script>

<Card class="rounded-lg m-3 p-2 shadow-lg col-11 col-sm-4">
	<CardHeader>
		<CardTitle class="text-center">Login With Credentials</CardTitle>
	</CardHeader>
	<CardBody>
		<!-- <form on:submit|preventDefault={onsignin}>
			<FormGroup>
				<Label>Email ID</Label>
				<Input bind:value={email} name="email" placeholder="Email" />
			</FormGroup>
			<FormGroup>
				<Label>Password</Label>
				<Input bind:value={password} name="password" placeholder="Password" type="password" />
			</FormGroup>
			<Button block>SignIn</Button>
			
			<br />
			<Button size="lg" color="dark" block href="/register">SignUp</Button>
		</form> -->

		<Button color="primary" on:click={onsignin} block
			>SignIn With <strong>Facebook</strong></Button
		>
	</CardBody>
</Card>
