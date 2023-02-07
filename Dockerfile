FROM node:15-alpine
WORKDIR /app
COPY package*.json ./app
RUN npm install
COPY . /app
ENV PORT=8444
EXPOSE 8444
RUN npx prisma generate 
CMD ["npm", "run", "dev:migrate"]