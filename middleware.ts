import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import * as jose from "jose";
// import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest, ev: NextFetchEvent) {

    
  if (request.nextUrl.pathname.startsWith('/checkout')) {

    /* Codigo nuevo que no anduvo:
    const session = await getToken({ request, secret: process.env.NEXTAUTH_SECRET })
    console.log(session)
    if(!session) {
        const {protocol, host, pathname} = request.nextUrl;
        return NextResponse.redirect(`${protocol}//${host}/auth/login?p=${pathname}`);
    }
    return NextResponse.next(); */
    
    // This logic is only applied to /checkout/address
        const token = request.cookies.get('token');
        
        try {
            await jose.jwtVerify(
                token || "",
                new TextEncoder().encode(process.env.JWT_SECRET_SEED || "")
            );
            //If no error is thrown, the JWT is valid, you can even the payload if necessary
            return NextResponse.next();
        } catch (error) {
            console.error(`JWT Invalid or not signed in`, {error})
            const {protocol, host, pathname} = request.nextUrl;
            return NextResponse.redirect(
                `${protocol}//${host}/auth/login?p=${pathname}`
            );   
        }    
  }

}

export const config = {
    matcher: ['/checkout/:path*'],
};