<script>
import { goto } from '$app/navigation';

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
	let password2 = '';
	async function onsignup() {
		if (password != password2) {
			alert('both password fields not containing same value');
			return;
		}
		let resp = await client.auth.signUp({email,password})
        console.log(resp.error)
        console.log(resp.user)
		await client.from("user_extra").insert({id:resp.user.id,username:resp.user.email})
		alert("Successfully registered. click to login")
		goto("/login")
	}
</script>

<Card style="" class="rounded-lg m-3 p-2 shadow-lg col-11 col-sm-4">
	<CardTitle class="text-center">Login With Credentials</CardTitle>

	<CardBody>
		<form on:submit|preventDefault={onsignup}>
			<FormGroup>
				<Label>Email ID</Label>
				<Input bind:value={email} name="email" placeholder="Email" />
			</FormGroup>
			<FormGroup>
				<Label>Password</Label>
				<Input type="password" bind:value={password} name="password" placeholder="Password" />
			</FormGroup>
			<FormGroup>
				<Label>Password</Label>
				<Input type="password" bind:value={password2} name="password" placeholder="Password" />
			</FormGroup>
			<Button block>SignUp</Button>
            <br>
			<Button block href="/" color="dark">SignIn</Button>

		</form>
	</CardBody>
</Card>
