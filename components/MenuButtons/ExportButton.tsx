"use client";

import {SaveButtonProps} from "@/components/OptionButton";
import React, {useCallback, useEffect} from "react";
import {Download} from "lucide-react";


export default function ExportButton({editor, metaRef} : SaveButtonProps){
    const [exporting, setExporting] = React.useState(false);

    const elem = React.createElement(Download, {className: "size-4"});

    useEffect(() => {
        const init = () => {
            if (!metaRef.current) return;
            metaRef.current.type = ResultType;
        };

        init();
    }, []);

    const clickHandler = async (e: any) => {
        if (!editor) return;

        setExporting(true);

        const element = editor.getHTML();

        const response = await fetch('/api/export', {
            method: 'POST',
            headers: {
                ContentType: "application/json",
            },
            body: JSON.stringify({element}),
        })

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = 'document.pdf';
            a.click();
        }

        setExporting(false);
    };

    const ResultType ={
        icon: elem,
        onClick: clickHandler,
        pressed: exporting,
    }

    return <></>
}