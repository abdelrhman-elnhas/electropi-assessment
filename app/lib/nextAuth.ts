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
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                            }),
                        }
                    );

                    const loginText = await loginRes.text();
                    let loginData;

                    try {
                        loginData = JSON.parse(loginText);
                    } catch {
                        throw new Error("Invalid login response from server");
                    }

                    if (!loginRes.ok) {
                        console.log("LOGIN FAILED:", loginData);
                        throw new Error(loginData?.message || "Login failed");
                    }

                    const profileRes = await fetch(
                        "https://api.escuelajs.co/api/v1/auth/profile",
                        {
                            headers: {
                                Authorization: `Bearer ${loginData.access_token}`,
                            },
                        }
                    );

                    const profileText = await profileRes.text();
                    let profileData;

                    try {
                        profileData = JSON.parse(profileText);
                    } catch {
                        throw new Error("Invalid profile response");
                    }

                    if (!profileRes.ok) {
                        console.log("PROFILE FAILED:", profileData);
                        throw new Error(profileData?.message || "Profile failed");
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