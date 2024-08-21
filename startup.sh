#!/bin/sh

# Obtener el valor de la variable de entorno RUN_MODE a partir de las variables de entorno del contenedor
RUN_MODE=$API_MASTER_RUN_MODE

# Verificar que la variable de entorno RUN_MODE este definida
if [ -z "$RUN_MODE" ]; then
  echo "La variable de entorno RUN_MODE no esta definida."
  exit 1
fi

# Variable para el mensaje de configuracion, inicialmente vacio
CONFIG_MSG=""

# variable para el comando de ejecucion de la aplicacion, inicialmente vacio
RUN_COMMAND=""

check_settings() {
  case "$RUN_MODE" in
    "dev")
      # Configuracion para el modo de desarrollo, correra npm run dev a partir del contenido del archivo package.json
      RUN_COMMAND='npm run dev'
      CONFIG_MSG="Configuracion aplicada: dev"
      ;;
    "debug")
      # Configuracion para el modo de depuracion, correra npm run debug a partir del contenido del archivo package.json
      RUN_COMMAND='npm run debug'
      CONFIG_MSG="Configuracion aplicada: debug"
      ;;
    "default")
      # Configuracion para el modo de produccion, correra npm run start a partir del contenido del archivo package.json
      RUN_COMMAND='npm run start'
      CONFIG_MSG="Configuracion aplicada: default"
      ;;
  esac
}

# Verificar la configuracion a aplicar segun el valor de la variable de entorno RUN_MODE
check_settings

# Mostrar el mensaje de configuración aplicada en la consola
echo $CONFIG_MSG

# Ejecutar el comando de ejecucion de la aplicacion segun la configuracion aplicada y dejar el proceso en ejecucion
exec $RUN_COMMAND