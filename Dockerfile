FROM node:22-slim 
# O slim é mais leve para produção

WORKDIR /app

COPY package*.json ./

# Instala TUDO (inclusive devDeps) porque você precisa do Vite e TSC para o build
RUN npm install

COPY . .

# --- ADICIONE ESTAS LINHAS ---
ARG NEXT_PUBLIC_API_URL
ARG AUTH_KEYCLOAK_ID
ARG AUTH_KEYCLOAK_SECRET
ARG AUTH_KEYCLOAK_ISSUER
ARG AUTH_KEYCLOAK_ADMIN
ARG NEXT_PUBLIC_TARGET_URL
ARG PUBLIC_KEY
ARG NEXT_HOSTNAME
# Elas tornam as variáveis disponíveis para o processo do 'npm run build'
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV AUTH_KEYCLOAK_ID=$AUTH_KEYCLOAK_ID
ENV AUTH_KEYCLOAK_SECRET=$AUTH_KEYCLOAK_SECRET
ENV AUTH_KEYCLOAK_ISSUER=$AUTH_KEYCLOAK_ISSUER
ENV AUTH_KEYCLOAK_ADMIN=$AUTH_KEYCLOAK_ADMIN
ENV NEXT_PUBLIC_TARGET_URL=$NEXT_PUBLIC_TARGET_URL
ENV PUBLIC_KEY=$PUBLIC_KEY
ENV NEXT_HOSTNAME=$NEXT_HOSTNAME
# ----------------------------

# Executa o build
RUN npm run build

# Remove dependências de desenvolvimento após o build para economizar espaço (opcional)
# RUN npm prune --production

EXPOSE 3000

CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0"]