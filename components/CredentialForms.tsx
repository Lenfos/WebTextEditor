"use client"

import React, {useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import { Button } from "./ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"



export default function CredentialForms(){
const router = useRouter();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [submitting, setSubmitting] = useState(false);


const onSubmit = async (e : any) => {
    e.preventDefault();

    setSubmitting(true);

    const res = await signIn("credentials",
        {
            redirect: false,
            email,
            password,
        });

    if (res?.error){
        setSubmitting(false);
        toast.error("Sign In error", {
            description: "Please check your credentials",

            className: "text-base px-6 py-4 [&>div]:text-base"
        })

    }else{
        router.push("/dashboard");
    }
}

    return (
        <Card className={"w-[380px] h-1/2 flex flex-col justify-center"}>
            <CardHeader>
                <CardTitle className="text-2xl">Sign In</CardTitle>
            </CardHeader>
            <CardContent className="mb-4">
                <form className="space-y-8 max-w-md mx-auto">

                    <div className="grid w-full max-w-sm items-center gap-2">
                        <Label htmlFor={"email"}>Email</Label>
                        <Input
                            type={"email"}
                            id={"email"}
                            placeholder={"example@example.com"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required/>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-2">
                        <Label htmlFor={"password"}>Password</Label>
                        <Input
                            type={"password"}
                            id={"password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required/>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex items-center justify-center w-full">
                <Button className="" variant={"default"} onClick={onSubmit} disabled={submitting}>
                    {submitting && <Loader2 className="animate-spin" />}
                    Submit
                </Button>
            </CardFooter>
        </Card>
    )

}