"use client"

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export default function ButtonRedirect() {
    const router = useRouter();

    return <Button onClick={(e) => { router.push("/dashboard/editor") }}>Go to editor</Button>
}