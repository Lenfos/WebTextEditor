import {NextRequest, NextResponse} from "next/server";


export async function GET(req: NextRequest, {params} : {params: {id: string}}) {
    try {
        const awaitParams = await params;
        const FilesId = parseInt(awaitParams.id);

        if (isNaN(FilesId)) {
            throw new Error("File ID is null");
        }

        const jsonFiles = await fetch("https://t8bgtx6k9j.ufs.sh/f/rG08XAxNg9vMdBOFytYBlCbP7ixEQIUmg9stKNnwDT5hSqjO");

        if (!jsonFiles.ok) {
            throw new Error("No json file found.");
        }

        const fileData = await jsonFiles.json();
        return NextResponse.json(fileData);
    } catch (e) {
        return NextResponse.error();
    }

}