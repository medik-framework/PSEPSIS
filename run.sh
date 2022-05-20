#!/bin/bash

<<<<<<< HEAD
docker run --name=frontend -it -v ~/Projects/PSEPSIS:/app/PSEPSIS -p 5000:5000  frontend_image:latest
=======
docker run -p 5000:5000 --name=frontend -it -v ~/Projects/PSEPSIS:/app/PSEPSIS frontend_image:latest
>>>>>>> main
