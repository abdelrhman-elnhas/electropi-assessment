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
                    throw new Error("Missing email or password");
                }

                try {
                    const controller = new AbortController();
                    const timeout = setTimeout(() => controller.abort(), 8000);

                    const loginRes = await fetch(
                        "https://api.escuelajs.co/api/v1/auth/login",
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                            }),
                            signal: controller.signal,
                        }
                    );

                    clearTimeout(timeout);

                    const loginData = await loginRes.json().catch(() => null);

                    if (!loginRes.ok) {
                        console.log("LOGIN FAILED:", loginData);
                        throw new Error("Invalid login credentials");
                    }

                    const tokens = loginData;

                    const profileRes = await fetch(
                        "https://api.escuelajs.co/api/v1/auth/profile",
                        {
                            headers: {
                                Authorization: `Bearer ${tokens.access_token}`,
                            },
                        }
                    );

                    const profileData = await profileRes.json().catch(() => null);

                    if (!profileRes.ok) {
                        console.log("PROFILE FAILED:", profileData);
                        throw new Error("Failed to fetch user profile");
                    }

                    return {
                        id: profileData.id,
                        email: profileData.email,
                        name: profileData.name,
                        image: profileData.avatar,
                        apiAccessToken: tokens.access_token,
                    };
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        console.error("AUTHORIZE ERROR:", error.message);
                        throw new Error(error.message);
                    }

                    console.error("AUTHORIZE ERROR:", error);
                    throw new Error("Authentication failed");
                }
            },
        }),
    ],

    session: {
        strategy: "jwt",
        maxAge: 1 * 24 * 60 * 60,
    },

    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: "/auth/login",
        newUser: "/auth/register",
    },

    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.userId = user.id;
                token.name = user.name;
                token.email = user.email;
                token.image = user.image;
                token.apiAccessToken = user.apiAccessToken;
            }

            if (trigger === "update" && session?.user) {
                token.name = session.user.name;
                token.email = session.user.email;
                token.image = session.user.image;
            }

            return token;
        },

        async session({ session, token }) {
            session.user.id = token.userId;
            session.apiAccessToken = token.apiAccessToken;
            return session;
        },

        async redirect({ baseUrl }) {
            return `${baseUrl}/`;
        },
    },
};