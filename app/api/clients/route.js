import connectMongoDB from "@/lib/mongodb";
import Client from "@/models/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";

async function requireSession() {
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	return null;
}

export async function POST(request) {
	const unauthorized = await requireSession();
	if (unauthorized) return unauthorized;

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
		await Client.create({
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
		return NextResponse.json({ message: "Client Created" }, { status: 201 });
	} catch (error) {
		console.error("Create client error:", error.message);
		return NextResponse.json({ message: "Failed to create client" }, { status: 500 });
	}
}

export async function GET(request) {
	const unauthorized = await requireSession();
	if (unauthorized) return unauthorized;

	try {
		await connectMongoDB();

		const url = new URL(request.url);
		const page = parseInt(url.searchParams.get('page') || '1');
		const limit = parseInt(url.searchParams.get('limit') || '10');
		const skip = (page - 1) * limit;

		const clients = await Client.find().skip(skip).limit(limit);
		const totalClients = await Client.countDocuments();

		return NextResponse.json({ clients, totalClients });
	} catch (error) {
		console.error("Fetch clients error:", error.message);
		return NextResponse.json({ message: "Failed to fetch clients" }, { status: 500 });
	}
}

export async function DELETE(request) {
	const unauthorized = await requireSession();
	if (unauthorized) return unauthorized;

	const id = request.nextUrl.searchParams.get('id');
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return NextResponse.json({ message: "Invalid client id" }, { status: 400 });
	}

	try {
		await connectMongoDB();
		const deleted = await Client.findByIdAndDelete(id);
		if (!deleted) {
			return NextResponse.json({ message: "Client not found" }, { status: 404 });
		}
		return NextResponse.json({ message: "Client deleted" }, { status: 200 });
	} catch (error) {
		console.error("Delete client error:", error.message);
		return NextResponse.json({ message: "Failed to delete client" }, { status: 500 });
	}
}
