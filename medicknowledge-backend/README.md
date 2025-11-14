# MedicKnowledge

This is the backend of the app that i develop which is called MedicKnowledge. This app is used to check the drug availability in nearby medicals.

# To run the backend on the local machine

# create virtual environment. To create one, do as follows:

    - Go to project root(backend) directory in terminal and run "python -m venv venv"
    - Activate the venv by running the comment: .\venv\scripts\activate

# After activating the venv, install all the dependencies:

    - go to project root where requirements.txt presented.
    - run the comment: pip install -r requirements.txt

# After that configure the .env file:

    - go to backend\ directory. you'll find the .env file. change the variables present in the .env file according to your database configurations.

# Set the Database client:

    - In the settings.py file, on line around 80 - 90, you'll find the database variable which is a dictionary. It'll have something like:

        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.postgresql',
                'NAME': os.getenv('DB_NAME'),
                'USER':  os.getenv('DB_USER'),
                'PASSWORD':  os.getenv('DB_PASSWORD'),
                'HOST':  os.getenv('DB_HOST'),
                'PORT': '',

            }
        }

    - In above, Change the Engine to: django.db.backends.mysql if you are using mysql.
    - make sure that you have a database with the DB_NAME in .env file created.

# After that run These comments:

    - python manage.py makemigrations
    - python manage.py migrate
    - python manage.py runserver: # To run the server
