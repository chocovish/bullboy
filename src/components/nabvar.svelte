<script>
import client from '$lib/supabase';

	import { Navbar, NavbarBrand, NavItem, NavLink, Nav,Button } from 'sveltestrap';



	
</script>

<Navbar color="dark" class="w-100 shadow text-white"> 
	<NavbarBrand><strong>Hushh</strong></NavbarBrand>
	<Nav>
		{#if client.auth.user()}
		<NavItem><Button on:click={()=>client.auth.signOut()}>Logout</Button></NavItem>
		{/if}
		
		
		
	</Nav>
</Navbar>
