    import { NextRequest, NextResponse } from 'next/server';
    import { draftMode } from 'next/headers';

    export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const redirect = url.searchParams.get('redirect') || '/';
    (await draftMode()).disable();
    return NextResponse.redirect(new URL(redirect, req.url));
    }
