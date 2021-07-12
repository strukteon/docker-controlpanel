import dockerode from "dockerode";
import streams from "memory-streams";
import list_file_stats_command from "./list_file_stats_command";
import {buildErrorResponse, buildSuccessResponse} from "../../../response_builder";

export default async function list_files(docker: dockerode | undefined, volumeName: string, dir: string = "", filters: any = {}) {
    if (!docker) {
        throw new Error("dockerode object is undefined");
    }

    // check if volume exists
    await docker.getVolume(volumeName).inspect();

    const stdout = new streams.WritableStream();

    const list_script = list_file_stats_command(`/tmp/myvolume/${dir}`);
    const create_options = {
        HostConfig: {
            Mounts: [
                {
                    ReadOnly: false,
                    Source:   volumeName,
                    Target:   "/tmp/myvolume",
                    Type:     "volume",
                },
            ],
        },
    };

    await docker.run("busybox", ["/bin/sh", "-c", list_script], stdout, create_options);

    const raw_output = stdout.toString();

    if (raw_output.startsWith("/bin/sh: cd: line 1: can't cd to"))
        return buildErrorResponse("path does not exist in volume");

    const output = "[" +
        raw_output
            .replace(/\s*[\n\r]/g, "") // remove all line breaks
            .slice(0, -1) // remove trailing comma
        + "]";

    const output_json = JSON.parse(output);
    const filtered = output_json.filter((file: any) => {
        for (let filter_option in filters)
            if (!(file[filter_option] && file[filter_option] === filters[filter_option]) && filters[filter_option] !== undefined)
                return false;
        return true;
    })

    return buildSuccessResponse(filtered);
}
