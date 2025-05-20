"use client"

import {
    AlignCenter, AlignJustify,
    AlignLeft,
    AlignRight,
    Bold,
    Heading1,
    Heading2,
    Heading3, Highlighter,
    Italic,
    Strikethrough
} from "lucide-react";

import {Toggle} from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import {Card} from "@/components/ui/card";
import {JSX, useEffect, useRef} from "react";
import {OptionButton} from "@/components/OptionButton";
import SaveButton from "@/components/MenuButtons/SaveButton";

export default function MenuBar({editor}: {editor: Editor | null}) {
    const metaRef = useRef<{type?: OptionButton }>({});
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const loop = () => {
        timerRef.current = setTimeout(() => {
            InitButtonList();
            // Appel récursif : continue la boucle
            loop();
        }, 100); // 1 seconde
    };


    if (!editor) {
        return null;
    }


    const options : OptionButton[] = [
        {
            icon: <Heading1 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({level: 1}).run(),
            pressed: editor.isActive("heading", { level: 1 }),
        },
        {
            icon: <Heading2 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({level: 2}).run(),
            pressed: editor.isActive("heading", { level: 2 }),
        },
        {
            icon: <Heading3 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({level: 3}).run(),
            pressed: editor.isActive("heading", { level: 3 }),
        },
        {
            icon: <Bold className="size-4" />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            pressed: editor.isActive("bold"),
        },
        {
            icon: <Italic className="size-4" />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            pressed: editor.isActive("italic"),
        },
        {
            icon: <Strikethrough className="size-4" />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            pressed: editor.isActive("strike"),
        },
        {
            icon: <Highlighter className="size-4" />,
            onClick: () => editor.chain().focus().toggleHighlight({ color: '#ffcc00'}).run(),
            pressed: editor.isActive("highlight"),
        },
        {
            icon: <AlignLeft className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("left").run(),
            pressed: editor.isActive({ textAlign: "left" }),
        },
        {
            icon: <AlignCenter className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("center").run(),
            pressed: editor.isActive({ textAlign: "center" }),
        },
        {
            icon: <AlignRight className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("right").run(),
            pressed: editor.isActive({ textAlign: "right" }),
        },
        {
            icon: <AlignJustify className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("justify").run(),
            pressed: editor.isActive({ textAlign: "justify" }),
        },
    ]

    const InitButtonList = () => {
        if (metaRef.current && metaRef.current.type) {
            options.push(metaRef.current.type)
            if (timerRef.current){
                clearTimeout(timerRef.current)
                timerRef.current = null
            }
        }
        else {
            if (!timerRef.current){
                loop();
            }
        }
        return null
    }

    return (
        <div className="z-50 !sticky top-4">
            {metaRef.current ? InitButtonList(): null}
            {metaRef.current ? (
                <SaveButton editor={editor} metaRef={metaRef} /> ): null}
                <Card className="flex-row py-2 gap-0 ">
                    {options.map((option, index) => (
                        <Toggle key={index} pressed={option.pressed} onClick={option.onClick}>
                            {option.icon}
                        </Toggle>
                    ))}
                </Card>
            </div>)
}