import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
    secure: true,
})

export async function uploadImageFromBuffer(buf: Buffer, filename: string) {
    return await new Promise<{secure_url: string}>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {folder: process.env.CLOUDINARY_FOLDER, public_id: filename},
            (err, res) => (err ? reject(err) : resolve(res as any))
        )
        stream.end(buf);
    })
}