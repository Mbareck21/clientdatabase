import Admin from "@/models/admin";
import connectMongoDB from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { formData } = await req.json()
        const { name, email, password } = formData || {};

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            !name.trim() || !email.trim() || !password
        ) {
            return NextResponse.json({ message: "Invalid registration data" }, { status: 400 })
        }

        await connectMongoDB()

        // Signup is locked to the first admin only. Once any admin account
        // exists, registration is closed (server-enforced).
        const adminCount = await Admin.countDocuments()
        if (adminCount > 0) {
            return NextResponse.json({ message: "Registration is closed" }, { status: 403 })
        }

        const existing = await Admin.findOne({ email })
        if (existing) {
            return NextResponse.json({ message: "An account with this email already exists" }, { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        await Admin.create({ name, email, password: hashedPassword })
        return NextResponse.json({ message: "Admin Created" }, { status: 201 })
    } catch (error) {
        // Duplicate key (race between the check above and create)
        if (error?.code === 11000) {
            return NextResponse.json({ message: "An account with this email already exists" }, { status: 409 })
        }
        console.error("Admin creation error:", error.message)
        return NextResponse.json({ message: "Admin Creation Failed" }, { status: 500 })
    }
}
