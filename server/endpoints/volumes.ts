import { Router, Response } from "express";
import Endpoint from "../Endpoint";
import dockerode from "dockerode";

const status: Endpoint = {
    path: "/volumes",
    router: Router(),
}

status.router.get("/all", async (req, res: Response) => {
    let [containers, disk_usage] = await Promise.all([
        status.docker?.listContainers({all: true}),
        status.docker?.df()
    ]);
    if (! containers || ! disk_usage?.Volumes)
        return res.json("error");

    let volume_obj: Object = disk_usage.Volumes.reduce((obj: Object, cur: any) => ({...obj, [cur.Name]: cur}), {});
    for (const volumeObjElement in volume_obj) {
        // @ts-ignore
        if (volume_obj[volumeObjElement])
        { // @ts-ignore
            volume_obj[volumeObjElement].Containers = [];
        }
    }

    /**/for (let container of containers) {
        for (let mount of container.Mounts) {
            if (mount.Type !== "volume") continue;
                // @ts-ignore
            volume_obj[mount.Name].Containers.push({
                    Id: container.Id,
                    Names: container.Names,
                    State: container.State
                })
        }
    }
    res.json(Object.values(volume_obj));
});

status.router.get("/kokoko", async (req, res: Response) => {
    status.docker?.run("busybox",
        ["/bin/sh", "-c", `for f in /tmp/myvolume/*; do     stat -c "{     \\"access_rights\\": %a,    \\"num_blocks_allocated\\": %b,    \\"bytes_per_block\\": %B,    \\"file_type\\": \\"%F\\",    \\"owner_group_id\\": %g,    \\"owner_group_name\\": \\"%G\\",    \\"num_hard_links\\": %h,    \\"inode_number\\": %i,    \\"file_name\\": \\"%n\\",    \\"io_block_size\\": %o,    \\"total_size\\": %s,    \\"owner_user_id\\": %u,    \\"owner_user_name\\": \\"%U\\",    \\"last_access_time\\": \\"%X\\",    \\"last_modification_time\\": \\"%Y\\",    \\"last_change_time\\": \\"%Z\\" }," "$f"; done`], process.stdout,
        {
            "HostConfig": {
                "Mounts": [
                    {
                        "Target":   "/tmp/myvolume",
                        "Source":   "34f180affc92b8e01af5cd18b1dffa3eec59cd89c23f5bf6b945e492b04200a0",
                        "Type":     "volume",
                        "ReadOnly": false
                    }
                ]
            }
            });
    res.json("ok");
});

status.router.delete("/:name", async (req, res: Response) => {
    const volume_name = req.params.name;
    if (! status.docker) return;
    try {
        const del_response = await status.docker.getVolume(volume_name).remove();
        res.json({
            message: "volume deleted",
        })
    } catch (e) {
        console.error('error happened', e, e.statusCode)
        if (e.statusCode === 404)
            res.json({
                message: "volume does not exist",
            })
        else
            res.json({
                message: 'error',
                code: e.statusCode
            })
    }
});



export default status;
