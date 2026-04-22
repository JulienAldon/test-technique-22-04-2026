# Install

## Create .env file
```sh
cp .env.example .env
```

## Launch docker compose
```sh
source .env
docker compose up --build -d
(docker compose exec backend pip install requirements.txt)
docker compose exec backend python manage.py migrate
docker compose exec backend python createsuperuser
```

# Test
Visit http://localhost:5173

# TODO / Missing features
- Tests : Not enough time left
- More css and nicer UI
- Docker prod / terraform deploy for homelab
- more factorization of redundant code in ActorView and MovieView
- Urlparams for modal 
- LocalStorage or session for unauthenticated user rating movies
