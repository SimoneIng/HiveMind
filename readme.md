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


## Installazione 

Da terminale: Eseguire il Comando `gh repo clone SimoneIng/HiveMind` 

1. `cd HiveMind`

### Setup Backend 

Da terminale: 

1. Sposati nella cartella Backend : `cd backend`
2. Installazzione delle dependecies : `npm install`
3. Setup del Database : `npm run dbsetup`
4. Riempire il Database : `npm run filldb`
5. Avviare il Backend : `npm run start`

### Setup Frontend 

