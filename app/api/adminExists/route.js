import connectMongoDB from "@/lib/mongodb";
import Admin from "@/models/admin";
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        await connectMongoDB()
        const { email } = await req.json()
        const admin = await Admin.findOne({ email }).select('_id')
        console.log('admin ID: ', admin);
        return NextResponse.json({ admin })

    } catch (error) {
        console.log(error);
    }
}
