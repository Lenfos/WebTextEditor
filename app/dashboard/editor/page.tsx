
import {loginIsRequiredServer} from '@/lib/auth';
import TiptapEditor from "@/components/TipTapEditor"
import LoginBackground from "@/components/LoginBackground";


export default async function Editor(){

    await loginIsRequiredServer()

    return (
        <LoginBackground
            className="flex flex-col"
            children={<TiptapEditor/>}>
        </LoginBackground>
    )
}
