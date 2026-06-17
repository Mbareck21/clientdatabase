import connectMongoDB from "@/lib/mongodb";
import Admin from "@/models/admin";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials || {};

                // Reject non-string input so a crafted body like
                // { email: { $ne: null } } can't reach the Mongo query.
                if (typeof email !== "string" || typeof password !== "string") {
                    return null;
                }

                try {
                    await connectMongoDB();
                    const admin = await Admin.findOne({ email });
                    if (!admin) return null;

                    const passwordMatch = await bcrypt.compare(password, admin.password);
                    if (!passwordMatch) return null;

                    // Only return safe fields — never the password hash.
                    return {
                        id: admin._id.toString(),
                        name: admin.name,
                        email: admin.email,
                    };
                } catch (error) {
                    console.error("Authorize error:", error.message);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/'
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
