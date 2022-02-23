<script>
	import { goto } from '$app/navigation';

	import client from '$lib/supabase';

	import { onMount } from 'svelte';

	onMount(() => {
		if(!client.auth.user()) goto("/login")
		// client.auth.onAuthStateChange((event) => {
        //     console.log("auth state changed,",event);
        //     //window.location.href = "/"
		// 	//goto('/', { replaceState: true });
		// });
	});
</script>



<slot />
