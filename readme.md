# Progetto TecWeb 2024/25

Sviluppo di un'applicazione Full Stack per il progetto del corso di Tecnologie Web.  

Università degli Studi di Napoli Federico II, Corso di Laurea Triennale in Informatica.

## Prerequisiti 

- Node.js (versione 20.13.1) - https://nodejs.org/en/download/package-manager
- Angular (versione 18.1.0) - https://v17.angular.io/cli


## Installazione Progetto

1. **Clone Repository** 

    `gh repo clone SimoneIng/HiveMind` 

2. **Move to HiveMind Main Directory** 
    
    `cd HiveMind`

### Installazione e Setup Database 

> If you have already installed postgres on your machine you can also create the database as you like, then modify the `.env` file in backend directory.

1. Install postgres with 

    `sudo apt install postgres`
2. Modify password of user postgres 

    `sudo passw postgres`
3. Run the Database Server 

    `sudo service postgresql start`
4. Modify password of user postgres (on database) with 

    `sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'admin';"`
5. Run 

    `psql`. 
6. Run 
    
    `CREATE DATABASE hivemind;`
7. Run 

    `\c hivemind` then `CREATE SCHEMA app;` 

### Setup Backend 

1. Move to backend Directory 

    `cd backend`
2. Run 

    `npm install` to install all the dependencies. 

3. Create a .env file and copy the code below 

```
DB_NAME = "hivemind"
DB_USER = "postgres"
DB_PSW = "admin" 
DB_PORT = "5432"
DB_SCHEMA = "app"
HOST = "localhost"
SERVER_PORT="3000"
JWT_SECRET = "84e94c6798ba4d9fdea2caff95c167937c6ea7a42be5dbb368ed870c66c7ede4ac23
046d08fe57e459b13df54f4ef14e255981e6e4c01116ea5b1e7afaa8cbc7"
```

4. Run 

    `npm run dbsetup` to setup the database. 
5. Run 

    `npm run filldb` to create some users and ideas.
6. Now you can finally run the server with 

    `npm run start`. 

### Setup Frontend 

1. From Root Directory, move to frontend 

    `cd frontend`
2. Run 

    `npm install`
3. Run 

    `npm start`

4. Go to http://localhost:4200 and enjoy. 
