<script>
	import LoginForm from '../components/loginform.svelte';
	import NavBar from '../components/nabvar.svelte';
</script>

<svelte:head>
	<title>Hushh - Login</title>
</svelte:head>

<NavBar />
<div class="d-flex align-items-center justify-content-center vh-100" style="margin-top: -3%;">
	<LoginForm />
</div>
