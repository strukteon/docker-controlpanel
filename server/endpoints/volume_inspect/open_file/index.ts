import dockerode from "dockerode";
import streams from "memory-streams";
import open_file_command from "./open_file_command";
import {Response} from "express";

import fs from "fs"

export default async function open_file(docker: dockerode | undefined, res: Response, volumeName: string, path: string) {
    if (!docker) {
        throw new Error("dockerode object is undefined");
    }

    // check if volume exists
    await docker.getVolume(volumeName).inspect();

    const list_script = open_file_command(`/tmp/myvolume/${path}`);
    const create_options = {
        HostConfig: {
            Binds: [ `${volumeName}:/tmp/myvolume` ],
        },
        image: "busybox:latest"
    };

    let container = await docker.createContainer(create_options);
    let archive = await container.getArchive({path: "/tmp/myvolume/" + path});
    const writable = new streams.WritableStream();


    let fileInfos: Buffer | null = null;
    let processedFileLength = 0;
    let fileName: string;
    let fileSize: number;


    writable._write = (chunk: Buffer, encoding, next) => {
        if (fileInfos === null) {
            console.log(chunk.length)
            fileInfos = chunk.slice(0, 512);
            chunk = chunk.slice(512)
            fileName = fileInfos.toString("ascii", 0, 100);
            fileSize = 100663296
            console.log(fileInfos)
            console.log(fileName, fileName.length, fileName.indexOf(String.fromCharCode(0)))
            console.log(fileSize, fileInfos.toString('ascii', 124, 136), 10)
            res.writeHead(200, {
                "Content-Disposition": "attachment;filename=" + fileName.substring(0, fileName.indexOf(String.fromCharCode(0))),
              //  "Content-Length": fileSize
            });
        }
        console.log(chunk.length, processedFileLength, fileSize)
        if (processedFileLength + chunk.length < fileSize) {
            console.log("processedFileLength + chunk.length < fileSize")
            res.write(chunk);
            processedFileLength += chunk.length
        }
        else if (processedFileLength < fileSize) {
            console.log("processedFileLength < fileSize")
            let slicedChunk = chunk.slice(0, fileSize - processedFileLength);
            console.log(slicedChunk)
            res.write(slicedChunk)
            processedFileLength = fileSize
        }
        // res.write(chunk);
        next();
    }

    writable.on('finish', function() {
        console.log("Write is completed.");
        res.end()
    });
        archive.pipe(writable)
    //res.send("asd")
}
