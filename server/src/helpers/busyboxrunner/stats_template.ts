const statsTemplate: string =
`{
    "accessRights": %a,
    "numBlocksAllocated": %b,
    "bytesPerBlock": %B,
    "fileType": "%F",
    "ownerGroupId": %g,
    "ownerGroupName": "%G",
    "numHardLinks": %h,
    "inodeNumber": %i,
    "fileName": "%n",
    "ioBlockSize": %o,
    "totalSize": %s,
    "ownerUserId": %u,
    "ownerUserName": "%U",
    "lastAccessTime": "%X",
    "lastModificationTime": "%Y",
    "lastChangeTime": "%Z"
},`;

export default statsTemplate;
