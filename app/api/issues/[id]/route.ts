import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: Promise<{id: string}>;
}
export async function PATCH(request: NextRequest, {params}: Props){
    const resolveParams = await params;
    const body = await request.json();

    const issue = prisma.issue.findUnique({
        where: {
            id: parseInt(resolveParams.id)
        }
    });

    if(!issue){
        return NextResponse.json({
            message: 'Issue not found'
        }, {status: 404});
    }

    const editedIssue = await prisma.issue.update({
        where: {
            id: parseInt(resolveParams.id)
        },
        data: {
            title: body.title,
            description: body.description
        }
    });

    return NextResponse.json({
        message: "Issue Updated Successfully."
    }, {status: 200});
}