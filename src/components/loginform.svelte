<script>
import { goto } from "$app/navigation";

import client from "$lib/supabase";

    import { Card,CardBody,CardHeader,CardTitle,Input,Label,FormGroup,Form,Button } from "sveltestrap";
    

    let email = '';
	let password = '';
	async function onsignin() {
		let resp = await client.auth.signIn({email,password})
        if(resp.error){
            alert(resp.error.message)
        }
        else {
            console.log(resp.user)
            goto("/")
        }
       

	}
</script>

<Card style="min-width:30rem">
    <CardHeader>
        <CardTitle class="text-center">
            Login With Credentials
        </CardTitle>
    </CardHeader>
    <CardBody>
        <form on:submit|preventDefault={onsignin}>
            <FormGroup>
            <Label>Email ID</Label>
            <Input bind:value={email} name="email" placeholder="Email" />
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input bind:value={password} name="password" placeholder="Password" type="password" />
                </FormGroup>
            <Button block>SignIn</Button>
            <br>
            <Button size="lg" color="dark" block href="/register">SignUp</Button>
        </form>
    </CardBody>
</Card>

