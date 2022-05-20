#!/bin/bash

docker run -p 5000:5000 --name=frontend -it -v ~/Projects/PSEPSIS:/app/PSEPSIS frontend_image:latest
