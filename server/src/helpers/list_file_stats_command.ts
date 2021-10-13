import statsTemplate from "./stats_template";

export const statsCommand = (fileName: string) => [ `stat`, `-c`, `"${statsTemplate.replace(/"/g, '\\"')}"`, `"${fileName}"` ];

export default (dir: string) =>
`cd ${dir} || exit
if [[ "$(ls -A)" ]]; then
    for f in $( find . -maxdepth 1 ! -path . );
    do
        ${statsCommand("$f").join(" ")};
    done
fi`;
