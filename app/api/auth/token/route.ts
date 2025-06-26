// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest){
//     const token = await getToken({
//         req: request,
//         secret: process.env.AUTH_SECRET,
//         cookieName: 'authjs.session-token'
//     });

//     return NextResponse.json(token);
// }


import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    // Debug information
    console.log("NEXTAUTH_SECRET exists:", !!process.env.NEXTAUTH_SECRET);
    console.log("Cookies:", request.cookies.getAll());
    console.log("Headers:", Object.fromEntries(request.headers.entries()));
    
    const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET, // Auth.js v5 uses AUTH_SECRET
        cookieName: "authjs.session-token" // Auth.js v5 cookie name
    });

    console.log("Token result:", token);

    return NextResponse.json({
        token,
        hasSecret: !!process.env.NEXTAUTH_SECRET,
        cookies: request.cookies.getAll(),
        // Don't log full headers in production for security
        debug: process.env.NODE_ENV === "development" ? {
            headers: Object.fromEntries(request.headers.entries())
        } : null
    });
}