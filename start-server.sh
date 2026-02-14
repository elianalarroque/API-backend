#Levantar servicios docker
echo "Levantando servicios (DB y pgAdmin)..."
npm run start-services

#Esperar a que Postgres esté listo
echo "Esperando a que la base de datos esté lista..."
sleep 5  # espera 5 segundos

#Instalar dependencias
echo "Instalando dependencias..."
npm install

#Reset completo de la DB
echo "Reseteando base de datos..."
npx sequelize db:drop
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all

#Levantar backend en modo dev
echo "Levantando backend en modo dev..."
npm run start-dev
