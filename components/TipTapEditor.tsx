'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from "@/components/MenuBar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import {PageBreak} from "@/lib/page-break";


const PAGE_HEIGHT = 931 // px utiles, hors marges


export default function TiptapEditor(){

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ["heading", 'paragraph'],
            }),
            Highlight.configure({
                multicolor: true,
            }),
            PageBreak
        ],
        onUpdate: () => {
            requestAnimationFrame(() => {
                checkIfNewPageNeeded()
            })
        },
        editorProps: {
            attributes: {
                class: " min-h-[156px] border rounded-md bg-card py-2 px-3"
            }
        },
        autofocus: false,
        immediatelyRender: false,
    });

    const checkIfNewPageNeeded = () => {
        const proseMirror = document.querySelector('.ProseMirror') as HTMLElement;
        if (!proseMirror) return;

        const blocks = Array.from(proseMirror.children) as HTMLElement[];

        // Trouver l'index du dernier page-break (s'il existe)
        let startIndex = 0;
        for (let i = blocks.length - 1; i >= 0; i--) {
            if (blocks[i].classList.contains("page-break")) {
                startIndex = i + 1;
                break;
            }
        }

        // Ne considérer que les blocs après le dernier page-break
        const remainingBlocks = blocks.slice(startIndex);

        let currentHeight = 0;

        for (const el of remainingBlocks) {
            currentHeight += el.offsetHeight;

            if (currentHeight > PAGE_HEIGHT) {
                const pos = editor?.view.posAtDOM(el, 0);
                if (pos !== undefined) {
                    editor?.commands.insertContentAt(pos, '<div class="page-break"></div><p></p>');
                    return;
                }
            }
        }
    }

    return <>
        <MenuBar editor={editor} />
        <div className="shadow-md prose flex flex-col items-center my-10">
            <EditorContent editor={editor} />
        </div>
    </>



}
