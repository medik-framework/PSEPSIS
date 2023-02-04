#!/bin/bash

docker run --name=frontend -it -v ~/Projects/PSEPSIS:/app/PSEPSIS -p 5000:5000  frontend-with-k:latest
