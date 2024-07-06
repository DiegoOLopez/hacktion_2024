//0ATx3LY7JIObTmyXJQTWKlfewH5WvGk_x1j9LHCdWz_trVL5H3-8A1t_5n1QV5l4kvToqoQ

const {VertexAI} = require('@google-cloud/vertexai');

/**
 * TODO(developer): Update these variables before running the sample.
 */
async function generate_from_text_input(projectId = 'd-FL95Q19q7MQmFpd7hHD0Ty') {
  const vertexAI = new VertexAI({project: projectId, location: 'us-central1'});

  const generativeModel = vertexAI.getGenerativeModel({
    model: 'gemini-1.5-flash-001',
  });

  const prompt =
    "What's a good name for a flower shop that specializes in selling bouquets of dried flowers?";

  const resp = await generativeModel.generateContent(prompt);
  const contentResponse = await resp.response;
  console.log(JSON.stringify(contentResponse));
}

generate_from_text_input();