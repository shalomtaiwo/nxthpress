    import crypto from 'crypto';

    const SECRET =
    process.env.PREVIEW_SECRET ||
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    'dev-secret-change-me';

    type PreviewPayload = {
    id: string;
    exp: number;
    };

    function b64url(input: Buffer | string) {
    return Buffer.from(input)
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    }

    export function signPreviewToken(payload: PreviewPayload) {
    const body = b64url(JSON.stringify(payload));
    const sig = b64url(crypto.createHmac('sha256', SECRET).update(body).digest());
    return `${body}.${sig}`;
    }

    export function verifyPreviewToken(token: string): PreviewPayload | null {
    const [body, sig] = token.split('.');
    if (!body || !sig) return null;
    const expected = b64url(crypto.createHmac('sha256', SECRET).update(body).digest());
    if (sig !== expected) return null;
    try {
        const payload = JSON.parse(Buffer.from(body, 'base64').toString()) as PreviewPayload;
        if (!payload.exp || Date.now() > payload.exp) return null;
        return payload;
    } catch {
        return null;
    }
    }

    export function buildPreviewEnterUrl(redirectPath: string, id: string) {
    const exp = Date.now() + 5 * 60 * 1000;
    const token = signPreviewToken({ id, exp });
    const redirect = encodeURIComponent(redirectPath + `?previewId=${encodeURIComponent(id)}`);
    return `/preview?token=${encodeURIComponent(token)}&redirect=${redirect}`;
    }

    export function buildPreviewExitUrl(redirectPath: string) {
    const redirect = encodeURIComponent(redirectPath);
    return `/preview/exit?redirect=${redirect}`;
    }
