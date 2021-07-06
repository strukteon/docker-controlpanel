const fs = require("fs")
async function go() {
    let stats_template = (await fs.promises.readFile("endpoints/volume_inspect/list_files/stats_template.txt")).toString();
    let list_file_stats_command = (await fs.promises.readFile("endpoints/volume_inspect/list_files/list_file_stats_command.txt")).toString();

    let path = "/tmp/myvolume/";
    let parsed = list_file_stats_command
        .replaceAll("$_DIR", path)
        .replaceAll("$_STATS_TEMPLATE_ESCAPED", stats_template.replaceAll('"', '\\"'))
        .replaceAll('"', '\\"');
    console.log(parsed)
}

go();