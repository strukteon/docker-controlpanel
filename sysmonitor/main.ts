import ws from "ws";
import osutils from "os-utils"

const config = {
    UPDATE_INTERVAL_MS: Number(process.env.UPDATE_INTERVAL_MS) ?? 1000,
    PORT: Number(process.env.PORT) ?? 80
}

const wss = new ws.Server({
    port: config.PORT
})

const broadcast = (msg: string | Object) => wss.clients.forEach(c => c.send(msg));

setInterval(async () => {
    const [cpuFree, cpuUsage, [hdTotal, hdFree, hdUsage]] = await Promise.all([
        new Promise<number>((resolve) => osutils.cpuFree(resolve)),
        new Promise<number>((resolve) => osutils.cpuUsage(resolve)),
        new Promise<number[]>((resolve) => osutils.harddrive((t, f, u) => resolve([t, f, u]))),
    ]);

    const data = {
        cpuCount: osutils.cpuCount(),
        cpuFree,
        cpuUsage,
        totalMemory: osutils.totalmem(),
        freeMemory: osutils.freemem(),
        freeMemoryPercentage: osutils.freememPercentage(),
        hdTotal,
        hdFree,
        hdUsage,
        systemUptime: osutils.sysUptime(),
    };

    broadcast(data);

}, config.UPDATE_INTERVAL_MS);
