#!/bin/sh +xe

aws --profile wakamsha \
  --region ap-northeast-1 s3 sync ./dist s3://learn-react.wakamsha.net \
  --cache-control "private, no-store, no-cache"
