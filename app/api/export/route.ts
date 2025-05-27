import {NextRequest, NextResponse} from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
    try {
        const body = req.body;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(`
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  line-height: 1.6; 
                  padding: 20px;
                }
                /* Ajoutez vos styles TipTap ici */
              </style>
            </head>
            <body>${body}</body>
          </html>
        `);

        const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px',
            }
        });

        await browser.close();


        return new NextResponse("",{
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="document.pdf"',
            },
        });

    } catch (e: any) {
        console.error("Server Error", e);
        return NextResponse.error()
    }
}