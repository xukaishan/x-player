#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e



git add -A
git commit -m 'update'

git push -f git@github.com:xukaishan/x-player.git main:main