import dockerode from "dockerode";
import streams from "memory-streams";
import list_file_stats_command from "./list_file_stats_command";

export default async function list_files(docker: dockerode | undefined, volumeName: string, dir: string = "") {
    if (!docker) {
        throw new Error("dockerode object is undefined");
    }

    const stdout = new streams.WritableStream();

    const list_script = list_file_stats_command(`/tmp/myvolume/${dir}`);
    const create_options = {
        HostConfig: {
            Mounts: [
                {
                    ReadOnly: false,
                    Source:   "34f180affc92b8e01af5cd18b1dffa3eec59cd89c23f5bf6b945e492b04200a0",
                    Target:   "/tmp/myvolume",
                    Type:     "volume",
                },
            ],
        },
    };

    await docker.run("busybox", ["/bin/sh", "-c", list_script], stdout, create_options);

    const output = "[" +
        stdout.toString()
            .replace(/\s*[\n\r]/g, "") // remove all line breaks
            .slice(0, -1) // remove trailing comma
        + "]";

    const output_json = JSON.parse(output);

    return output_json;
}
