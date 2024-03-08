# Flask back-end app

## Running the back-end

You can start the flask server by calling the provided launch script.
The launch script will create a virtual environment, install the requirements, and run the flask app. 
```bash
bash ./launch.sh
```

## Adding more dependencies

To add more dependencies with pip install, do the following:

Activate the virtual environment:
```bash
source .venv/bin/activate
```

Install your desired dependencies:
```bash
pip install <name>
```

Save the dependencies:
```
pip freeze > requirements.txt
```


