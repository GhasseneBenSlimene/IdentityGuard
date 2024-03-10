# Documentation du Projet IDENTITYGUARD

# IDENTITEGUARD

IDENTITYGUARD est une application composée d'une partie client et d'une partie serveur.

## Démarrage avec Docker

Pour démarrer l'application à l'aide de Docker, suivez les étapes ci-dessous :

1. Assurez-vous que [Docker](https://www.docker.com/) est installé sur votre machine.
2. Ouvrez un terminal et placez-vous à la racine du projet.
3. Exécutez la commande suivante pour construire et démarrer l'application :

```bash
npm run docker:build
```

Pour arrêter l'application, utilisez :

```bash
npm run docker:stop
```

Cette méthode assure que l'application fonctionne correctement dans un environnement Dockerisé.

## Démarrage sans Docker (local)

Si vous préférez exécuter l'application localement sans Docker, vous devrez avoir Node.js version `20.11.1`. Vous pouvez installer cette version spécifique depuis le site officiel de Node.js [ici](https://nodejs.org/).

### Démarrage du Serveur

1. Dans le terminal, allez dans le dossier du serveur :

```bash
cd server
```

2. Installez les dépendances :

```bash
npm install
```

3. Démarrez le serveur :

```bash
npm start
```

### Démarrage du Client

1. Ouvrez un nouveau terminal et allez dans le dossier du client depuis la racine du projet :

```bash
cd client
```

2. Installez les dépendances :

```bash
npm install
```

3. Démarrez l'application client :

```bash
npm start
```

Une fois le serveur et le client lancés, vous pouvez accéder à l'application web via votre navigateur.

## Contribution au projet

Pour contribuer au projet, vous devez être ajouté en tant que collaborateur. Cela vous donnera les permissions nécessaires pour pousser des modifications (`push`) sur les branches de développement.

Une fois que vous êtes collaborateur, assurez-vous de travailler sur une branche distincte pour chaque fonctionnalité ou correctif, et non directement sur la branche `main`.

```bash
# Créez une nouvelle branche à partir de 'main' et basculez dessus
git checkout -b ma-nouvelle-branche
```

Après avoir terminé vos modifications et effectué les tests nécessaires, vous pouvez pousser votre branche sur le dépôt distant :

```bash
git push origin ma-nouvelle-branche
```
