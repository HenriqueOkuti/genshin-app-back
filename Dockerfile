FROM node:15-alpine
WORKDIR /app
COPY package*.json ./app
RUN npm install
COPY . /app
ENV PORT=4000
EXPOSE 4000
RUN npx prisma generate 
CMD ["npm", "run", "dev:migrate"]