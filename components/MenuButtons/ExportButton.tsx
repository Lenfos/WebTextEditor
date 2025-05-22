"use client"

import {SaveButtonProps} from "@/components/OptionButton";
import React, { useEffect } from "react";
import {Download} from "lucide-react";

export default function ExportButton({editor, metaRef} : SaveButtonProps){
    const [exporting, setExporting] = React.useState(false);

    const elem = React.createElement(Download, {className: "size-4"});

    const clickHandler = (e: any) => {
        setExporting(true);

        console.log("C'est bon ça marche en fait");

        setExporting(false);
    }

    const ResultType ={
        icon: elem,
        onClick: clickHandler,
        pressed: exporting,
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