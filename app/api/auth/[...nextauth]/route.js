// pages/api/auth/[...nextauth].js
import connectMongoDB from "@/lib/mongodb";
import Admin from "@/models/admin";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs';

export const authOptions = {
    providers: [
        CredentialsProvider({
            firstName: "Credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password, } = credentials;
                try {
                    await connectMongoDB();
                    const admin = await Admin.findOne({ email });
                    console.log('Admin: ', admin);
                    if (!admin) return null;
                    const passwordMatch = await bcrypt.compare(password, admin.password);
                    if (!passwordMatch) return null;
                    return admin
                } catch (error) {
                    console.log(error.message);
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        
        

    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/'
    },  
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST } 
