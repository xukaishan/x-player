#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

if [[ -z $1 ]]; then
  echo "Enter commit message: "
  read -r msg
else
  msg=$1
fi

git add -A
git commit -m "update: $msg"

git push -f git@github.com:xukaishan/x-player.git main:main