'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {Loader2} from "lucide-react";
import {toast} from "sonner";
import {useRive} from "@rive-app/react-canvas";
import { Atma } from 'next/font/google'

const atma = Atma({
    weight: "300",
    subsets: ['latin']
});

type customFile = {
    id: number,
    name: string,
    size: number
    lastModified: number
}

export default function ListFiles() {
    const [files, setFiles] = useState<customFile[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [loadingEditor, setLoadingEditor] = useState<boolean>(false)
    const router = useRouter()
    const {RiveComponent} = useRive({
        src: "/ghosty.riv",
        autoplay: true,
    })


    useEffect(() => {
        const fetchFilesList = async () => {
            try {
                const res = await fetch('/api/Files')
                if (res.status != 200) {
                    setLoading(false)
                    throw Error()
                }
                const resListFiles = await res.json()
                setFiles(resListFiles)
                setLoading(false);
            }catch (e){
                toast.error("Server error", {
                    description: "Error while fetching files, please try again",
                    className: "text-base px-6 py-4 [&>div]:text-base"
                })
            }
        };
        fetchFilesList();
    }, []);

    const onClickGetFile = async (id: number) => {
        try {
            setLoadingEditor(true);

            const jsonFile = await fetch(`/api/Files/${id}`);

            if (jsonFile.status != 200) {
                throw Error()
            }
            const res = await jsonFile.json();
            sessionStorage.clear()
            const stringFile = JSON.stringify(res);
            sessionStorage.setItem("file", stringFile);

            setLoadingEditor(true)
            router.push("/dashboard/editor")
        } catch (e) {
            setLoadingEditor(false);
            toast.error("Server error", {
                description: "Error while opening files editor, please try again",
                className: "text-base px-6 py-4 [&>div]:text-base"
            })
        }
    }

    if (loadingEditor) {
        return <div className="absolute top-0 left-0 w-screen h-screen bg-loading-background flex justify-center items-center">
            <Loader2 className="animate-spin size-10"/>
        </div>
    }

    if (!loading && files.length == 0) {
        return <div className="flex justify-center items-center w-full h-full flex-col">
                <RiveComponent className={"w-50 h-50 mr-10"}/>
                <p className={"text-xl " + atma.className}>Ghosty didn't find existing files</p>
            </div>
    }

    return  loading ?
        <div className="flex justify-center items-center w-full h-full">
            <Loader2 className="animate-spin size-8"/>
        </div> :
        <Table className="min-w-full mt-6" >
            <TableHeader>
                <TableRow className="text-left">
                    <TableHead className="w-1/4">File Name</TableHead>
                    <TableHead className="w-1/4">Last modified</TableHead>
                    <TableHead className="w-1/4">File Size</TableHead>
                    <TableHead className="w-1/8">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {files.map((file) => (
                    <TableRow key={file.id}>
                        <TableCell>{file.name}</TableCell>
                        <TableCell>{file.lastModified}</TableCell>
                        <TableCell>{file.size} Mb</TableCell>
                        <TableCell>
                            <Button onClick={() => {
                                onClickGetFile(file.id);
                            }}>Open in Editor</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>


}