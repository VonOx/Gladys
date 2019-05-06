#!/bin/sh

set -eu

export IMAGE_ID="${REGISTRY}/${IMAGE}:${VERSION}-${TAG}"

# ============
# <qemu-support>
  wget https://github.com/multiarch/qemu-user-static/releases/download/${QEMU_VERSION}/x86_64_qemu-${QEMU_ARCH}-static.tar.gz -P ~/docker_tmp
  cd ~/docker_tmp && tar -xvf ~/docker_tmp/x86_64_qemu-${target_arch}-static.tar.gz && cd -
  docker run --rm --privileged multiarch/qemu-user-static:register
# </qemu-support>
# ============

# Replace the repo's Dockerfile with our own.
docker build -t ${IMAGE_ID} \
  --build-arg target=$TARGET \
  --build-arg arch=$QEMU_ARCH -f ./docker/Dockerfile.${TARGET} .

# Login to Docker Hub.
echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin
# Push push push
docker push ${IMAGE_ID}
if [ $CIRCLE_BRANCH == 'master' ]; then
  docker tag "${IMAGE_ID}" "${REGISTRY}/${IMAGE}:latest-${TAG}"
  docker push "${REGISTRY}/${IMAGE}:latest-${TAG}"
fi
