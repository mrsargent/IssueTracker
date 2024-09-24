import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod';
import prisma from '@/prisma/client';
import { issueSchema } from "../../validationSchemas";


export async function POST (request: NextRequest){
    const body = await request.json();
    const validation = issueSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400}); //status 400 = bad request

    const newIssue = await prisma.issue.create({
        data: {title: body.title, descrition: body.description}
    });

    return NextResponse.json(newIssue, {status: 201});
}



