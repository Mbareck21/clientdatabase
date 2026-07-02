import connectMongoDB from "@/lib/mongodb";
import Client from "@/models/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";

export async function PUT(request, { params }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid client id" }, { status: 400 });
    }

    try {
        const {
            principalApplicant,
            contact,
            caseSize,
            country,
            pendingCase,
            applicationDate,
            caseType,
            receipt,
            caseStatus,
            lawyer,
            notes,
            interviewDate,
            biometricsDate,
            approvalDate,
            denialDate,
            caseClosingDate,
        } = await request.json();

        await connectMongoDB();
        const updated = await Client.findByIdAndUpdate(id, {
            principalApplicant,
            contact,
            caseSize,
            country,
            pendingCase,
            applicationDate,
            caseType,
            receipt,
            caseStatus,
            lawyer,
            notes,
            interviewDate,
            biometricsDate,
            approvalDate,
            denialDate,
            caseClosingDate,
        });

        if (!updated) {
            return NextResponse.json({ message: "Client not found" }, { status: 404 });
        }
        return NextResponse.json({ message: 'Client Updated' }, { status: 200 });
    } catch (error) {
        console.error("Update client error:", error.message);
        return NextResponse.json({ message: "Failed to update client" }, { status: 500 });
    }
}

export async function GET(request, { params }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid client id" }, { status: 400 });
    }

    try {
        await connectMongoDB();
        const client = await Client.findById(id);
        if (!client) {
            return NextResponse.json({ message: "Client not found" }, { status: 404 });
        }
        return NextResponse.json({ client }, { status: 200 });
    } catch (error) {
        console.error("Fetch client error:", error.message);
        return NextResponse.json({ message: "Failed to fetch client" }, { status: 500 });
    }
}
