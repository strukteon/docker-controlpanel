import stats_template from "./stats_template";

export default (dir: string) =>
`cd ${dir} || exit
if [[ "$(ls -A)" ]]; then
    for f in $( find . -maxdepth 1 ! -path . );
    do
        stat -c "${stats_template.replace(/"/g, '\\"')}" "$f";
    done
fi`;
