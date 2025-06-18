import { prisma } from "@/prisma/client";
import { parseAppSegmentConfig } from "next/dist/build/segment-config/app/app-segment-config";
import { resolveViewport } from "next/dist/lib/metadata/resolve-metadata";
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

export async function DELETE(request: NextRequest, {params}: {params: Promise<{id: string}>}){
    const resolveParams = await params;
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(resolveParams.id)}
    });

    if(!issue){
        return NextResponse.json({
            message: 'Issue not found'
        }, {status: 404});
    }

    await prisma.issue.delete({
        where: {id: parseInt(resolveParams.id)}
    });

    return NextResponse.json({
        message: 'Issue deleted successfully.'
    });
}