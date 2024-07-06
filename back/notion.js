const { Client } = require('@notionhq/client');

// Configura tu token de integración de Notion y el ID de la base de datos
const notion = new Client({
    auth: "secret_DICRTOXgBlxQqcYlQ2xj2fnn4xFyozs3kiVdIuWY3gY",
});

// ID de tu base de datos en Notion
const databaseId = "dd14154735144ef79e9568e8364336d9";

async function insertarFilaEnNotion(datos) {
    try {
        const response = await notion.pages.create({
            parent: {
                database_id: databaseId,
            },
            properties: {
                numero: {
                    title: [
                        {
                            text: {
                                content: datos.numero
                            }
                        }
                    ]
                },
                down: {
                    rich_text: [
                        {
                            text: {
                                content: datos.down
                            }
                        }
                    ]
                },
                tipo_jugada: {
                    rich_text: [
                        {
                            text: {
                                content: datos.tipo_jugada
                            }
                        }
                    ]
                },
                yardas: {
                    rich_text: [
                        {
                            text: {
                                content: datos.yardas
                            }
                        }
                    ]
                },
                // Puedes agregar más propiedades aquí según tu base de datos
            }
        });

        console.log('Datos insertados en Notion:');
        return response;
    } catch (error) {
        console.error('Error al insertar datos en Notion:', error);
        throw error;
    }
}


module.exports = { insertarFilaEnNotion };