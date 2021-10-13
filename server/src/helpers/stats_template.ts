const statsTemplate: string =
`{
    "access_rights": %a,
    "num_blocks_allocated": %b,
    "bytes_per_block": %B,
    "file_type": "%F",
    "owner_group_id": %g,
    "owner_group_name": "%G",
    "num_hard_links": %h,
    "inode_number": %i,
    "file_name": "%n",
    "io_block_size": %o,
    "total_size": %s,
    "owner_user_id": %u,
    "owner_user_name": "%U",
    "last_access_time": "%X",
    "last_modification_time": "%Y",
    "last_change_time": "%Z"
},`;

export default statsTemplate;
