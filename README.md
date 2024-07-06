# hacktion_2024

Mejor automatización

#Planteamiento del problema
Existe el área de oportunidad en captura de datos y presentación de estadísticas en todos los juegos de fútbol americano de la liga Nacional. ONEFA

Actualmente una persona levanta los datos de cada jugada de un juego y los registra en un formato en papel.
Posteriormente se manda la imagen a un administrador que vacía esa info en un excel.

Este excel se junta con la información de los otros estadistas y se procesa para dar los resultados en un PDF que se publica una semana después de finalizar la jornada.

Ejemplo: https://www.cdpro-guia.com/14-grandes-2023.txt

-Los tiempos del proceso son excesivos y no funcionales para la preparación de los siguientes juegos con cada equipo.
-La afición está esperando tener resultados frescos.
-Representa una pérdida ante la seriedad de una liga nacional.

Solución del problema
Optimizar la captura de datos clave de cada jugada de un partido de fútbol americano, mediante una aplicación por medio de voz, mostrando estadísticas básicas en tiempo real.

Como se soluciona
Cada jugada del partido se narra y se transcribe en un archivo .txt
Del párrafo se extraen los datos clave del formato de texto.
	Down
		Primero
		Segundo
		Tercero
		Cuarto
	Tipo de Jugada
		Pase
		Carrera
	Yardas G/L
		-100
		+100

Se anexan a la base de datos en Notion contando cada una de las jugadas hasta que finaliza el juego.
steps

Grabar desde el navegador un audio con el micrófono integrado, y guardarlo.
Usar la API de chat gpt o utilizar un modelo de sumarización para darle el formato específico al texto que se necesita
Mandar el registro a una base de datos y mostrarlos.

Limitaciones.
La cantidad de datos que se tienen en una jugada real puede ser muy extensa y no se tiene el tiempo suficiente en esta sesión más que para tratar 3 fundamentales.
Calidad de audio y formatos de entrada.
Utilización y pruebas para encontrar el mejor modelo de extracción de los datos de importancia.
Tiempos para revisar la efectividad del algoritmo.


Alcances.
El proyecto es escalable para capturar todas los datos requeridos en una jugada y completar una base de datos ideal para manejar estadísticas reales y totalmente funcionales.
El algoritmo se puede adaptar para capturar datos en cualquier otro deporte y actividad con fines estadísticos.
 
Fortalezas.
Obtención de datos fieles en tiempo real.


