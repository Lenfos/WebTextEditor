'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {Loader2} from "lucide-react";
import {toast} from "sonner";

type customFile = {
    id: number,
    name: string,
    size: number
    lastModified: number
}

const Files : customFile[] = [{
    id: 0,
    name: "Test",
    lastModified: 20052025,
    size: 123,
}]

export default function ListFiles() {
    const [files, setFiles] = useState<customFile[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()


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
            const jsonFile = await fetch(`/api/Files/${id}`);

            if (jsonFile.status != 200) {
                throw Error()
            }
            const res = await jsonFile.json();
            sessionStorage.clear()
            const stringFile = JSON.stringify(res);
            sessionStorage.setItem("file", stringFile);

            router.push("/dashboard/editor")
        } catch (e) {
            toast.error("Server error", {
                description: "Error while opening files editor, please try again",
                className: "text-base px-6 py-4 [&>div]:text-base"
            })
        }
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