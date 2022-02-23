<script>
import { goto } from '$app/navigation';

import client from '$lib/supabase';

import { onMount } from 'svelte';

	import LoginForm from '../components/loginform.svelte';
	import NavBar from '../components/nabvar.svelte';

	onMount(()=>{
		if(client.auth.user()){
			goto("/")
		}
	})
</script>

<svelte:head>
	<title>Hushh - Login</title>
</svelte:head>

<NavBar />
<div class="d-flex align-items-center justify-content-center vh-100" style="margin-top: -3%;">
	<LoginForm />
</div>
