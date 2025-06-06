'use server'

import { BlobServiceClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
import { readFile } from 'fs/promises';

export async function uploadFile(file) {
  try {
    if (!file) {
      throw new Error('No file provided');
    }
    
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!connectionString) {
      throw new Error('Azure Storage connection string not configured');
    }
    
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    
    const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    
    await containerClient.createIfNotExists({ access: 'blob' });
    
    let buffer;
    
    if (file instanceof File || (file.name && file.type && file.size !== undefined)) {
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else if (file.filepath || file.path) {
      const filePath = file.filepath || file.path;
      buffer = await readFile(filePath);
    } else if (file.stream) {
      const chunks = [];
      for await (const chunk of file.stream()) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
      }
      buffer = Buffer.concat(chunks);
    } else if (Buffer.isBuffer(file)) {
      buffer = file;
    } else if (file.buffer || file.data) {
      buffer = file.buffer || file.data;
    } else if (typeof file === 'string' && file.startsWith('data:')) {
      const base64Data = file.split(',')[1];
      buffer = Buffer.from(base64Data, 'base64');
    } else {
      throw new Error(`Unsupported file format: ${file.constructor.name}`);
    }
    
    const fileName = file.name || file.originalname || 'unknown';
    const fileExtension = fileName.split('.').pop() || 'jpg';  
    const blobName = `${uuidv4()}.${fileExtension}`;
    
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    
    const contentType = file.type || file.mimetype || 'application/octet-stream';
    
    await blockBlobClient.upload(buffer, buffer.length, {
      blobHTTPHeaders: {
        blobContentType: contentType,
      }
    });
    
    return blockBlobClient.url;
    
  } catch (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }
}