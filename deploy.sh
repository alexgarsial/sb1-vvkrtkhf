#!/bin/bash

# Créer le dossier de build
npm run build

# Créer le dossier de déploiement
mkdir -p deploy

# Copier les fichiers de build
cp -r dist/* deploy/

# Copier le fichier .htaccess depuis public/
cp public/.htaccess deploy/

# Copier les fichiers de configuration
cp .env.production deploy/

echo "Build terminé ! Les fichiers sont prêts dans le dossier 'deploy'"
echo "Uploadez le contenu du dossier 'deploy' vers votre hébergement"