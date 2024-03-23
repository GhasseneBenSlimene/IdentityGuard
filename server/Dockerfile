# Utilisez une image de node comme base
FROM node:20.11.1

# Définissez le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances de l'application
RUN npm install

# Copiez le reste des fichiers de l'application
COPY . .

# Exposez le port sur lequel votre application s'exécute
EXPOSE 8000 3000

# Définissez la commande pour exécuter votre application
CMD [ "npm", "start" ]