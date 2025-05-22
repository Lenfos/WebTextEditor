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
import {JSX, useEffect, useRef, useState} from "react";
import {OptionButton} from "@/components/OptionButton";
import SaveButton from "@/components/MenuButtons/SaveButton";
import ExportButton from "@/components/MenuButtons/ExportButton";
import {Separator} from "@/components/ui/separator";

export default function MenuBar({editor}: {editor: Editor | null}) {
    const SaveMetaRef = useRef<{type?: OptionButton }>({type : undefined});
    const ExportMetaRef = useRef<{type?: OptionButton }>({type : undefined});
    const [dynamicOptions, setDynamicOptions] = useState<OptionButton[]>([]);

    useEffect(() => {
        const initButtonList = () => {
            const saveType = SaveMetaRef.current?.type;
            const exportType = ExportMetaRef.current?.type;

            const extra: OptionButton[] = [];
            if (saveType) extra.push(saveType);
            if (exportType) extra.push(exportType);

            setDynamicOptions(extra);
        };

        initButtonList();

    }, [SaveMetaRef.current.type, ExportMetaRef.current.type]);

    if (!editor) {
        return null;
    }


    const staticOptions : OptionButton[] = [
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


    const options : any = [];
    options.push(dynamicOptions);
    options.push(staticOptions);



    return (
            <div className="z-50 !sticky top-4">
                <SaveButton editor={editor} metaRef={SaveMetaRef} />
                <ExportButton editor={editor} metaRef={ExportMetaRef} />
                <Card className="flex-row py-2 gap-0 ">
                    {options.map((section : any, sectionIndex : any) => (
                        <div key={sectionIndex} className="flex items-center">
                            {section.map((option : any, index : any) => (
                                <Toggle
                                    key={`${sectionIndex}-${index}`}
                                    pressed={option.pressed}
                                    onClick={option.onClick}
                                >
                                    {option.icon}
                                </Toggle>
                            ))}
                            {/* Ajoute un séparateur entre les sections, sauf après la dernière */}
                            {sectionIndex < options.length - 1 && (
                                <Separator orientation="vertical" className="mx-1 bg-foreground" />
                            )}
                        </div>
                    ))}
                </Card>
            </div>)
}