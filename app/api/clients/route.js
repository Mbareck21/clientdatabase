import connectMongoDB from "@/lib/mongodb";
import Client from "@/models/client";
import { NextResponse } from "next/server";

export async function POST(request) {
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
}

export async function GET(request) {
	await connectMongoDB();

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

	const clients = await Client.find().skip(skip).limit(limit);
    const totalClients = await Client.countDocuments();

	return NextResponse.json({clients, totalClients});
}

export async function DELETE(request) {
	const id = request.nextUrl.searchParams.get('id');
	await connectMongoDB();
	await Client.findByIdAndDelete(id);
	return NextResponse.json({ message: "Client deleted" }, { status: 200 });
}
