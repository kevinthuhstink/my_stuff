#!/usr/bin/env bash
# This script launches the flask app, setting up the virtual environment.

# Ensure python3 is installed
if ! [ -x "$(command -v python3)" ]; then
  echo 'Error: python3 is not installed.' >&2
  exit 1
fi

# Ensure pip is installed
if ! [ -x "$(command -v pip)" ]; then
  echo 'Error: pip is not installed.' >&2
  exit 1
fi

# If no virtual environment exists, create one
if [ ! -d ".venv" ]; then
  python3 -m venv .venv
fi

# Activate the virtual environment
source .venv/bin/activate

# Ensure the requirements are installed
pip install -r requirements.txt

# Launch the app
python3 app.py
