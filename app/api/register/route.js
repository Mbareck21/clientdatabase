import Admin from "@/models/admin";
import connectMongoDB from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server"


export async function POST(req) {
    try {
        const { formData } = await req.json()
        console.log('server received:', formData);
        const hashedPassword = await bcrypt.hash(formData.password, 10)
        console.log("hashed password", hashedPassword);
        await connectMongoDB()
        await Admin.create({ ...formData, password: hashedPassword })
        return NextResponse.json({ message: "Admin Created" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Admin Creation Failed" }, { status: 500 })
    }

}