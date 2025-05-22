"use client"

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {toast} from "sonner";

export default function ButtonRedirect() {
    const router = useRouter();

    const onClickButton = () => {
        try {
            sessionStorage.clear()
            sessionStorage.setItem('file', 'new')

            router.push('dashboard/editor')


        } catch (e) {
            toast.error("Editor Error", {
                description: "Can't create new file, please try again later",

                className: "text-base px-6 py-4 [&>div]:text-base"
            })
        }
    }

    return <Button onClick={(e) => { onClickButton()}}>Go to editor</Button>
}