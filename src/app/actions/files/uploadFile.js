'use server'

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-2',
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
  forcePathStyle: true,
});

const BUCKET_NAME = 'pet-images';

export async function uploadFile(file) {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    if (!process.env.AWS_ACCESS_KEY_ID) {
      throw new Error('Neon Object Storage not configured');
    }

    let buffer;
    let originalName = 'unknown';
    let mimeType = 'application/octet-stream';

    if (file instanceof File || (file.name && file.type && file.size !== undefined)) {
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
      originalName = file.name || originalName;
      mimeType = file.type || mimeType;
    } else if (file.buffer || file.data) {
      buffer = file.buffer || file.data;
      originalName = file.originalname || file.name || originalName;
      mimeType = file.mimetype || file.type || mimeType;
    } else if (typeof file === 'string' && file.startsWith('data:')) {
      const base64Data = file.split(',')[1];
      buffer = Buffer.from(base64Data, 'base64');
      mimeType = file.split(';')[0].split(':')[1] || mimeType;
    } else {
      throw new Error('Unsupported file format');
    }

    const fileExtension = originalName.split('.').pop() || 'jpg';
    const key = `pet-images/${uuidv4()}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
      ACL: 'public-read',
    });

    await s3Client.send(command);

    const endpoint = process.env.AWS_ENDPOINT_URL_S3;
    const publicUrl = `${endpoint}/${BUCKET_NAME}/${key}`;

    return publicUrl;

  } catch (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }
}
