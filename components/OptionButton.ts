import React, {JSX} from "react";
import {Editor} from "@tiptap/react";


export type OptionButton = {
    icon : JSX.Element,
    onClick : any,
    pressed: boolean
}

export type SaveButtonProps = {
    editor: Editor | null;
    metaRef: React.RefObject<{ type?: OptionButton }>;
};