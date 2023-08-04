import { Injectable } from '@angular/core';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root'
})
export class AzureBlobStorageService {

  accName ="unibooksstorageacc ";
  containerName = "blobcontainerhelptip";

  constructor() { }

  private containerClient() : ContainerClient {
    return new BlobServiceClient(`https://${this.accName}.blob.core.windows.net`)
    .getContainerClient(this.containerName);
  }

  public async listVideos(): Promise<string[]> {
    let result: string[] = [];
    let blobs = this.containerClient().listBlobsFlat();
    for await (const blob of blobs) {
      result.push(blob.name);
    }

    return result
  }
}
