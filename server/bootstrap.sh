#!/bin/bash

pm2 start \
  --cwd $(pwd) \
  --name amongus \
  --interpreter $(which ts-node) \
  src/index.ts
