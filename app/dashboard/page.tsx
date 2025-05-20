
import LoginBackground from "@/components/LoginBackground";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {loginIsRequiredServer} from "@/lib/auth";
import ButtonRedirect from "@/components/ButtonRedirect";

export default async function Dashboard() {

    await loginIsRequiredServer();

    return (
        <LoginBackground
            className="flex justify-center items-center h-screen"
            children={
            <Card className="w-3/4">
                <CardHeader>
                    <CardTitle>Choose your file</CardTitle>
                </CardHeader>
                <CardContent>
                    <ButtonRedirect/>
            </CardContent>
        </Card>}
        />
    )
}