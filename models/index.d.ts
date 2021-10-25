import docker from 'dockerode';

export type WebsocketMessageOptions = object | string | number | boolean | undefined;

export type WebsocketMessage = {
    type: "info" | "set_room" | "message",
    data: object | string | number | boolean,
    options?: WebsocketMessageOptions,
}


export type FileStats = {
    accessRights: number,
    numBlocksAllocated: number,
    bytesPerBlock: number,
    fileType: string,
    ownerGroupId: number,
    ownerGroupName: string,
    numHardLinks: number,
    inodeNumber: number,
    fileName: string,
    ioBlockSize: number,
    totalSize: number,
    ownerUserId: number,
    ownerUserName: string,
    lastAccessTime: string,
    lastModificationTime: string,
    lastChangeTime: string
}

export namespace Dockerode {
    type DiskFree = {
        LayersSize?: number,
    }
}
