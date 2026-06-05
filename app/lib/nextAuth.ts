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
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                try {
                    const loginRes = await fetch(
                        "https://api.escuelajs.co/api/v1/auth/login",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                            }),
                        }
                    );

                    const loginData = await loginRes.json();

                    if (!loginRes.ok) {
                        throw new Error("Invalid login credentials");
                    }

                    const profileRes = await fetch(
                        "https://api.escuelajs.co/api/v1/auth/profile",
                        {
                            headers: {
                                Authorization: `Bearer ${loginData.access_token}`,
                            },
                        }
                    );

                    const profileData = await profileRes.json();

                    if (!profileRes.ok) {
                        throw new Error("Failed to fetch profile");
                    }

                    return {
                        id: profileData.id,
                        email: profileData.email,
                        name: profileData.name,
                        image: profileData.avatar,
                        apiAccessToken: loginData.access_token,
                    };
                } catch (error) {
                    console.error("AUTH ERROR:", error);
                    throw error;
                }
            },
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