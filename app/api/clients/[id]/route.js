import connectMongoDB from "@/lib/mongodb";
import Client from "@/models/client";
import { NextResponse } from "next/server";


export async function PUT(req, {params}) {
    const { id } = params
    const { newClient } = await req.json()
 console.log('newClient:', newClient);   
 await connectMongoDB()
 await Client.findByIdAndUpdate(id)
 return NextResponse.json({message: 'Client Updated'},{status: 200})
}

export async function GET(req, {params}) {
    const { id } = params 
    await connectMongoDB()
    const client = await Client.findOne({_id: id})
    return NextResponse.json({client}, {status: 200})
}