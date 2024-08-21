# Utiliza la imagen de Node.js iron lts en Alpine como base
FROM node:iron-alpine

# Establece el hostname del contenedor
ENV HOSTNAME="api-master"

# Establece el horario del contenedor a UTC
ENV TZ="UTC"

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /home/app

# instala nodemon para desarrollo y debug de la aplicación
RUN npm install -g nodemon

# Copia los archivos de package.json al directorio de trabajo e instala las dependencias sin eliminar el package.json
COPY src/package.json /home/app
RUN npm install

# Copia el codigo fuente de la aplicación al directorio de trabajo
COPY src /home/app

# Expone el puerto que utilizará la aplicación
EXPOSE 4000

# Definimos una variable de entorno por defecto para el modo de ejecución
ENV RUN_MODE="default"

# Copiar script de inicio del contenedor y darle permisos de ejecución
COPY startup.sh /home/startup.sh
RUN chmod +x /home/startup.sh

# Cambier el CR-LF de los archivos del archivo startup.sh a LF para evitar errores de ejecución en Linux (por si acaso)
RUN sed -i 's/\r$//' /home/startup.sh

# Fix permisos de las carpetas y archivos
RUN chown -R node:node /home/app
RUN chown -R node:node /home/startup.sh

# Utilizamos el usuario node para ejecutar la aplicación
USER node

# Comando para iniciar la aplicación dependiendo del valor de la variable RUN_MODE
#CMD ["sh", "-c", "if [ \"$RUN_MODE\" = \"debug\" -o \"$RUN_MODE\" = \"dev\" ]; then npm run dev; else npm start; fi"]
ENTRYPOINT ["/home/startup.sh"]
#CMD ["tail", "-f", "/dev/null"]