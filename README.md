# Documentation du Projet IDENTITYGUARD

## Structure du Projet

### Frontend

Dans le répertoire `client`, nous avons structuré notre frontend React :

- `components` : Composants réutilisables tels que `NavBar.jsx`.
- `context` : Gestion de l'état global avec Context API, comme `userContext.jsx`.
- `pages` : Modules séparés pour chaque page, comme `Auth`, `Dashboard`, `Home`, qui permettent une collaboration sans conflit.

### Backend

Notre backend, situé dans le répertoire `server`, utilise Node.js et Express.js :

- `controllers` : Contient la logique des routeurs Express.js.
- `models` : Schémas de données pour MongoDB.
- `routes` : Définitions des itinéraires pour notre API.

## Travailler Avec GitHub

Nous utilisons GitHub pour la collaboration. Pour contribuer :

1. **Clonez le Répertoire** : Clonez le projet sur votre machine locale avec `git clone url_du_repo`.
2. **Installez les Dépendances** : Exécutez `npm install` dans les dossiers `client` et `server` pour installer les dépendances nécessaires.
3. **Créez une Branche** : Créez votre propre branche avec `git checkout -b nom_de_votre_branche`.
4. **Apportez des Modifications** : Travaillez sur votre fonctionnalité ou correction.
5. **Commit et Push** : Faites commit de vos changements avec `git commit` et poussez-les sur GitHub avec `git push origin nom_de_votre_branche`.
6. **Ouvrez une Pull Request** : Allez sur GitHub pour ouvrir une pull request pour discussion et revue de code.

### Installation du Projet

Pour installer le projet après le clonage :

1. Ouvrez le terminal.
2. Changez de répertoire vers `client` et `server` avec `cd client` ou `cd server`.
3. Exécutez `npm install` pour installer les dépendances du projet.

Assurez-vous d'avoir Node.js installé sur votre machine pour exécuter les commandes npm.

### Pour les Collaborateurs

#### Frontend

- Familiarisez-vous avec les composants fonctionnels React et les hooks

#### Backend

- Maîtrisez les concepts de Node.js et Express.js.
- Assurez-vous de comprendre les opérations CRUD avec MongoDB.
