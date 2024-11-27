FROM node:18-alpine
WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier la structure complète du projet
COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]