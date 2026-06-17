import connectMongoDB from "@/lib/mongodb";
import Admin from "@/models/admin";
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { email } = await req.json()
        if (typeof email !== "string") {
            return NextResponse.json({ message: "Invalid email" }, { status: 400 });
        }
        await connectMongoDB()
        const admin = await Admin.findOne({ email }).select('_id')
        return NextResponse.json({ admin })

    } catch (error) {
        console.error("adminExists error:", error.message);
        return NextResponse.json({ message: "An error occurred while checking admin existence." }, { status: 500 });
    }
}
