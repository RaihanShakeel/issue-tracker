import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { patchIssueSchema } from "@/app/validationSchema";

interface Props {
    params: Promise<{id: string}>;
}
export async function PATCH(request: NextRequest, {params}: Props){
    const resolveParams = await params;
    const body = await request.json();

    const validation = patchIssueSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json(validation.error.format())
    }

    const {assignedToUserId, title, description} = body;
    if(assignedToUserId){
        const user = await prisma.user.findUnique({
            where: {id: assignedToUserId}
        });
        if(!user){
            return NextResponse.json(
                {message: 'Invalid User'},
                {status: 400}
            )
        }
    }

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
            title: title,
            description: description,
            assignedToUserId: assignedToUserId
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