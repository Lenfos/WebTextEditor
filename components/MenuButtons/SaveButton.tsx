"use client"

import {OptionButton, SaveButtonProps} from "@/components/OptionButton";
import {Save} from "lucide-react";
import React, {useEffect, useRef} from "react";
import {Editor} from "@tiptap/react";
import {useUploadThing} from "@/lib/uploadThingUtils";


export default function SaveButton ({editor, metaRef} : SaveButtonProps) {
    const {startUpload, isUploading} = useUploadThing("jsonUploader", {
        onClientUploadComplete: (res : any) => {
            console.log("upload terminé");
        },
        onUploadError: (e: any) => {
            console.error("erreur uploadthing : " + e);
        }
    });

    const elem = React.createElement(Save, {className: "size-4"});

    const clickHandler = async () => {
        if (!editor) return null;

        const json = editor.getJSON();
        const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
        const file = new File([blob], "mon-doc.json", { type: "application/json" });


        const filePath = await startUpload([file]);
    }

    const ResultType ={
        icon: elem,
        onClick: clickHandler,
        pressed: isUploading,
    }

    useEffect(() => {
        const init = () => {
            if (!metaRef.current) return;
            metaRef.current.type = ResultType;
        };
        init();
    }, []);

    return <></>
}
