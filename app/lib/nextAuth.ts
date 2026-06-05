import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { type: "email" },
                password: { type: "password" },
            },

            async authorize(credentials) {
                try {
                    console.log("LOGIN STEP START");

                    const loginRes = await fetch(
                        "https://api.escuelajs.co/api/v1/auth/login",
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                email: credentials?.email,
                                password: credentials?.password,
                            }),
                        }
                    );

                    const loginText = await loginRes.text();
                    console.log("LOGIN RAW RESPONSE:", loginText);

                    if (!loginRes.ok) {
                        throw new Error(`LOGIN FAILED: ${loginText}`);
                    }

                    const tokens = JSON.parse(loginText);

                    console.log("TOKEN:", tokens);

                    const profileRes = await fetch(
                        "https://api.escuelajs.co/api/v1/auth/profile",
                        {
                            headers: {
                                Authorization: `Bearer ${tokens.access_token}`,
                            },
                        }
                    );

                    const profileText = await profileRes.text();
                    console.log("PROFILE RAW:", profileText);

                    if (!profileRes.ok) {
                        throw new Error(`PROFILE FAILED: ${profileText}`);
                    }

                    const user = JSON.parse(profileText);

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        image: user.avatar,
                        apiAccessToken: tokens.access_token,
                    };
                } catch (err) {
                    console.error("AUTHORIZE ERROR:", err);
                    throw err;
                }
            }
        }),
    ],

    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: "/auth/login",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.userId = user.id;
                token.apiAccessToken = user.apiAccessToken;
            }
            return token;
        },

        async session({ session, token }) {
            session.user.id = token.userId;
            session.apiAccessToken = token.apiAccessToken;
            return session;
        },
    },
};