import {getServerSession, NextAuthOptions, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {redirect} from "next/navigation";
import {useSession} from "next-auth/react";

export const authConfig : NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name : "email",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: {
                    label: "Password",
                    type: "password"
                },
            },
            async authorize(credential){
                if (!credential || !credential.email || !credential.password){
                    return null;
                }

                //TODO Add Db logic

                if (credential.email == process.env.AUTH_USER && credential.password == process.env.AUTH_PWD){
                    const {password, ...UserWithoutPassword} = credential;
                    return UserWithoutPassword as User
                }

                return null;
            }
        })
    ],
    session: {
        maxAge: 3600,
        strategy: "jwt"
    },
    jwt: {
        maxAge: 3600,
    },

}

export async function loginIsRequiredServer() {
    const session = await getServerSession(authConfig);
    if (!session){
        return redirect("/");
    }
    return session.user;
}

export async function loginIsRequiredClient() {
    if (typeof window !== "undefined") {
        const session = useSession();
        if (!session) {
            return redirect("/");
        }
    }
}