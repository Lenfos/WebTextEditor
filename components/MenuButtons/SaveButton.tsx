"use client"

import {OptionButton} from "@/components/OptionButton";
import {Save} from "lucide-react";
import React, {useRef} from "react";
import {Editor} from "@tiptap/react";
import {useUploadThing} from "@/lib/uploadThingUtils";

type SaveButtonProps = {
    editor: Editor | null;
    metaRef: React.RefObject<{ type?: OptionButton }>;
};

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

        await startUpload([file]);
    }

    const ResultType ={
        icon: elem,
        onClick: clickHandler,
        pressed: true,
    }

    const init = () => {
        metaRef.current.type = ResultType;
    }

    init();
    return <></>
}
