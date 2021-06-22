import { Router } from "express";
import Endpoint from "../Endpoint";
import dockerode from "dockerode";

const status: Endpoint = {
    path: "/volumes",
    router: Router(),
}

status.router.get("/all", async (req, res) => {
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
})

export default status;
