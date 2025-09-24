    import { NextRequest, NextResponse } from 'next/server';
    import { draftMode } from 'next/headers';
    import { verifyPreviewToken } from '@/lib/preview';

    export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token') || '';
    const redirect = searchParams.get('redirect') || '/';

    const payload = verifyPreviewToken(token);
    if (!payload) {
        return NextResponse.redirect(new URL(redirect, req.url));
    }

    (await draftMode()).enable();
    return NextResponse.redirect(new URL(redirect, req.url));
    }
