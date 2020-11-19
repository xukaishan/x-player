#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

if [[ -z $1 ]]; then
  echo "Enter new version: "
  read -r VERSION
else
  VERSION=$1
fi

git add -A
git commit -m "update:$VERSION"

git push -f git@github.com:xukaishan/x-player.git main:main