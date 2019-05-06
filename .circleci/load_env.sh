#!/bin/sh
echo 'export GITHUB_REPO=VonOx/Gladys' >> $BASH_ENV
echo 'export VERSION=$(curl -s https://api.github.com/repos/${GITHUB_REPO}/releases/latest | jq -r ".tag_name")' >> $BASH_ENV
echo 'export REGISTRY=vonox' >> $BASH_ENV
echo 'export IMAGE=gladys' >> $BASH_ENV
echo 'export IMAGE_ID="${REGISTRY}/${IMAGE}:${VERSION}-${TAG}"' >> $BASH_ENV
echo 'export DIR=`pwd`' >> $BASH_ENV
echo 'export QEMU_VERSION="v4.0.0"' >>$BASH_ENV
. $BASH_ENV
