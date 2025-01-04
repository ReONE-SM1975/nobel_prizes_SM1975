# noble_prizes_SM1975

## Developer

### Client

How to run this project:

#### Pre-preparation

Install the necessary npm packages according to `package.json` at your client folder:

```js
npm install 
```

#### Run the front end

- While at the client folder, run the following:

```sh
npm run start
```

- Press: `Ctrl - C` to exit

While developing the client front-end, always install the dependencies at local.

### Server

#### Pre-Preparation (Running for the first time)

- If this is your initial setup, go to the server folder, create the virtual environment, or run the following:-

```sh
python -m venv venv
```

- while in development, obtain the `.env` file from the admin team and place it inside the server folder

- install the `requirements.txt` via pip

```sh
pip install -r requirements.txt
```

__NB__: If you have not yet create any database yet, go into `psql` to create one. Learn how to install `postgresql` for your respective operating system or device and create the database accordingly:

```psql
CREATE DATABASE nobelprizesdatabasename;
```

Make sure the `noble prizes database name` are consistence with the name inside your `.env` file.

If you have never run any migration to the setup the table in the nobel prizes database, do so:-

```sh
python manage.py migrate
```

#### Start the server

- run the environment:

```sh
source venv/bin/activate
```

- run the server

```sh
python manage.py runserver
# or 
source runserver.sh
```

__NB__: You may wanted a script to disable the server every time you leave your physical computer at local. Search online for script to disable every time you log-off your respective operating system or device.
