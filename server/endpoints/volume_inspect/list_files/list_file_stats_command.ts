import stats_template from "./stats_template";

export default (dir: string) =>
`cd ${dir}
for f in *;
do
    stat -c "${stats_template.replace(/"/g, '\\"')}" "$f";
done`;
