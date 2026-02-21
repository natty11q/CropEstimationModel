# Venv Setup

To setup the environment, cd into core and run
    * `chmod +x setup_venv.sh`
    * then run `./setup_venv.sh`

Or on windows
    * `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`
    * `.\setup_venv.ps1`

The virtual environment should now be setup in the .venv folder and activated.
now simply run [manage.py](./manage.py "manage.py file") to start the server.


Run Banckend:
    * `cd backend`
    * `python manage.py runserver`