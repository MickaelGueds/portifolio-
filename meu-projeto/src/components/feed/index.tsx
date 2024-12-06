import axios from 'axios';
import { useEffect } from 'react';

export function InstaFeed() {
    async function getInstaFeed() {
        const token = import.meta.env.VITE_INSTA_TOKEN;
        const fields = "media_url,media_type,permalink";
        const url = `https://graph.instagram.com/me?fields=id,username&access_token=${token}`;
        

        const {data} = await axios.get(url);
        console.log(data)
        
    }

    useEffect(() => {
        getInstaFeed()
    },[])
    return (
        <section>
            <p>
                testando esse krlh
            </p>
        </section>
    )
}