# Progetto TecWeb 2024/25

Sviluppo di un'applicazione Full Stack per il progetto del corso di Tecnologie Web.  

Università degli Studi di Napoli Federico II, Corso di Laurea Triennale in Informatica.


## Traccia 

Si vuole realizzare **HIVEMIND**, un social network per favorire la condivisione di idee e opinioni. 

Il sistema permette a un utente, previa registrazione e autenticazione, di pubblicare una nuova “idea” nel sistema. 
Una idea è caratterizzata da un titolo e da un breve testo descrittivo di al più 400 caratteri.

È richiesta la possibilità di inserire testo formattato nella descrizione di un’idea, specificando eventualmente la presenza di parti di testo in corsivo, in grassetto, o link ipertestuali (per esempio, utilizzando un linguaggio di annotazione come Markdown).

Accedendo, previa autenticazione, alla homepage del sistema, gli utenti possono visualizzare e valutare le idee proposte da altri utenti.
In particolare, gli utenti possono assegnare un singolo voto positivo (upvote, +1) oppure un singolo voto negativo (downvote, -1) a ciascuna idea non proposta da loro, per simboleggiare il fatto di essere d’accordo o meno.

Nella homepage, il sistema mostra le idee più controverse dell’ultima settimana, ovvero quelle che hanno avuto il più alto numero di upvote e downvote, e hanno un saldo complessivo di upvote e downvote prossimo allo zero. 
Le idee sono paginate, con 10 elementi per pagina.

Tramite un apposito controllo, è possibile visualizzare le idee più unpopular, ovvero quello che nell’ultima settimana hanno ricevuto più pareri di disaccordo (quelle con il saldo di upvote/downvote più basso) e quelle più mainstream, ovvero quelle che hanno ricevuto più pareri di accordo (quelle con il saldo di upvote/downvote più alto).

Per favorire la discussione, gli utenti possono anche inserire commenti a una specifica idea e
visualizzare i commenti lasciati da altri utenti nella pagina di dettaglio di ciascuna idea.

## Prerequisiti 

- Node.js (versione ) []
- Angular (versione ) []
- 

## Installazione 

1. **Clone Repository** `gh repo clone SimoneIng/HiveMind` 

2. **Move to HiveMind Main Directory** `cd HiveMind`

### Setup Database 

> If you have already installed postgres on your machine you can also create the database as you like, then modify the `env` file in backend directory.

1. Install postgres with `sudo apt install postgres`
2. Modify password of user postgres `sudo passw postgres`
3. Run the Database Server `sudo service postgresql start`
4. Modify password of user postgres (on database) with `sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'admin';"`
5. Run `psql`. 
6. Run `CREATE DATABASE hivemind;`
7. Run `\c hivemind` then `CREATE SCHEMA app;` 

```
DB_NAME = "hivemind"
DB_USER = "postgres"
DB_PSW = "<postgres password you chooce earlier>"
DB_PORT = "5432"
DB_SCHEMA = "app"
HOST = "localhost"
SERVER_PORT="3000"
JWT_SECRET = "84e94c6798ba4d9fdea2caff95c167937c6ea7a42be5dbb368ed870c66c7ede4ac23
046d08fe57e459b13df54f4ef14e255981e6e4c01116ea5b1e7afaa8cbc7"
```

### Setup Backend 

1. Move to backend Directory `cd backend`
2. Run `npm install` to install all the dependencies. 
3. Run `npm run dbsetup` to setup the database. 
4. Run `npm run filldb` to create some users and ideas.
5. Now you can finally run the server with `npm run start`. 

### Setup Frontend 

1. From Root Directory, move to frontend `cd frontend`
2. Run `npm install`
3. Run `ng serve`
4. Go to http://localhost:4200 and enjoy. 