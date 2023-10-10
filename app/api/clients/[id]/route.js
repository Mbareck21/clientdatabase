import connectMongoDB from "@/lib/mongodb";
import Client from "@/models/client";
import { NextResponse } from "next/server";


export async function PUT(request, {params}) {
    const { id } = params
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
    } = await request.json()
 console.log('newClient:', {
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
 await connectMongoDB()
 await Client.findByIdAndUpdate(id, {
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
    })
 return NextResponse.json({message: 'Client Updated'},{status: 200})
}

export async function GET(request, {params}) {
    const { id } = params 
    await connectMongoDB()
    const client = await Client.findOne({_id: id})
    return NextResponse.json({client}, {status: 200})
}