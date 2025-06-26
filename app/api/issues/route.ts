import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/client';
import { createIssueSchema } from "../../validationSchema";
import { resolveViewport } from "next/dist/lib/metadata/resolve-metadata";
import authOptions from "@/app/auth/Options";
import { getServerSession } from "next-auth";


export async function POST(request: NextRequest){

    const session = await getServerSession(authOptions);

    if (!session){
        return NextResponse.json({message: 'you are unothorized'}, {status: 401});
    }

    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);

    if (!validation.success){
        return NextResponse.json(validation.error.format(), {status: 400});
    }

    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    });

    return NextResponse.json(newIssue, {status: 201});
}

