import dockerode from "dockerode";
import {buildErrorResponse, buildSuccessResponse} from "../../../response_builder";
import {createBusyboxContainer, listBusyboxFiles} from "../../../src/helpers/BusyboxRunner";

export default async function list_files(docker: dockerode | undefined, volumeName: string, dir: string = "", filters: any = {}) {
    if (!docker) {
        throw new Error("dockerode object is undefined");
    }

    // check if volume exists
    console.log(await docker.getVolume(volumeName).inspect());

    const container = await createBusyboxContainer(docker, volumeName);

    let files = await listBusyboxFiles(container, dir);

    for (let elem of files) {
        elem.file_name = elem.file_name.replace("\./", "");
        if (['regular empty file', 'regular file'].includes(elem.file_type))
            elem.file_type = 'file';
    }

    return buildSuccessResponse(files);
}
