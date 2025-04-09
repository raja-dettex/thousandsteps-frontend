import { NextRequest, NextResponse } from "next/server";


export const middleware =  (request: NextRequest) => { 
    const { pathname } = request.nextUrl; 
    if (
        pathname.startsWith("/login") ||
        pathname.startsWith("/register") || // if any
        pathname.startsWith("/api") ||
        pathname.startsWith("/_next") ||
        pathname === "/"
      ) {
        return NextResponse.next();
      }
    if(pathname.startsWith("/trips/booking")) { 
        const title = request.cookies.get('title')?.value;
        console.log('title in middleware: ', title)
        if(title) { 
            return NextResponse.next()
        }
    }
    if(pathname.startsWith('/checkout')) { 
        const token = request.cookies.get('token')?.value;
        const role = request.cookies.get('role')?.value;
        if(!token || !role) { 
            return NextResponse.redirect(new URL('/signIn', request.url));
        }
        if(role === "user" && request.nextUrl.pathname.startsWith('/checkout')) {
            return NextResponse.next()
    }
    }
    const token = request.cookies.get('token')?.value;
    const role = request.cookies.get('role')?.value;
    console.log('token : ' , token, ' role: ' , role)
    if(!token || !role) { 
        return NextResponse.redirect(new URL('/signIn', request.url));
    }
    if(role === "admin" && request.nextUrl.pathname.startsWith('/dashboard/admin')) {
        return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/unauthorized', request.url))
 

} 


export const config = { 
    matcher: ['/dashboard/admin', '/checkout']
}