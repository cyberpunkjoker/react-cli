###
 # @Description: 写入git commit信息脚本
###

#!/bin/bash

# 保存信息文件
path=$(pwd)
echo "path=>$path"
cd ${path}
gitURL=$(git remote -v)
# 当前分支名
gitBranch=$(git symbolic-ref --short -q HEAD)
echo '------- 开始写入信息文件 -------'
    echo "build date: $(date +%Y-%m-%d--%T)
git url: ${gitURL}
git branch: ${gitBranch}
last commit info:

shell脚本配置git commit。

$(git show -s -n 3)">dist/version.txt
echo '------- 开始写入信息文件 完成 -------'