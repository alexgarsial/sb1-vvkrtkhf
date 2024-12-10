# Game of 11 Server

## Installation

1. Créer un sous-domaine api.light-box.be dans Plesk
2. Activer Node.js pour ce sous-domaine
3. Copier tous les fichiers du dossier server/ vers le document root
4. Dans Plesk, aller dans Node.js et:
   - Installer les dépendances: npm install
   - Démarrer l'application: npm start
   - Vérifier les logs: npm run logs

## Endpoints

- GET /health - Vérifier que le serveur fonctionne
- WebSocket - ws://api.light-box.be pour les connexions temps réel

## Logs

Les logs sont stockés dans:
- logs/combined.log - Tous les logs
- logs/error.log - Logs d'erreur uniquement