# Install

## Create .env file
```sh
cp .env.example .env
```

## Launch with docker compose
```sh
source .env
docker compose up --build -d
(docker compose exec backend pip install requirements.txt)
docker compose exec backend python manage.py migrate
docker compose exec backend python createsuperuser
```

## Launch without docker compose
```sh
source .env
cd backend
hatch shell
python manage.py runserver
python manage.py migrate
python manage.py createsuperuser

source .env
cd frontend
npm install
npm run dev
```

# Test
Visit http://localhost:5173

# TODO / Missing features
- Tests frontend / backend.
- More css and nicer UI.
- Docker production with nginx / terraform deploy for homelab.
- More factorization of redundant code in ActorView and MovieView.
- Urlparams for modal.
- Review deletion
- Filters for movies, actors
- Edition on Movie page (currently on movies page)
- LocalStorage or session for unauthenticated user rating movies.
- Fish .env activate (for fish you need to set each variables manually).
