import {NextRequest, NextResponse} from "next/server";


export async function GET(req: NextRequest) {

    try {
        const listFiles = [
            {
                id: 0,
                name: "Test",
                lastModified: 20052025,
                size: 123,
            }
        ]

        return NextResponse.json(listFiles);
    } catch (e) {
        return NextResponse.error()
    }

}