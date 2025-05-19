const BlocksToMarkdown = require('@sanity/block-content-to-markdown');
const groq = require('groq');
const client = require('../utils/sanityClient.js');
const serializers = require('../utils/serializers');
const overlayDrafts = require('../utils/overlayDrafts');
const imageUrl = require('../utils/imageUrl');
const hasToken = !!client.config().token;

function generateEditingServices (editingServices) {
    const serviceCards = editingServices.serviceCards
      ? editingServices.serviceCards.map((card) => ({
          ...card,
          description: BlocksToMarkdown(card.description, { serializers, ...client.config() }),
        }))
      : [];

    return {
      ...editingServices,
      introduction: BlocksToMarkdown(
        editingServices.introduction,
        { serializers, ...client.config() }
      ),
      serviceCards: serviceCards,
      image: editingServices.mainImage !== null
            ? imageUrl(editingServices.mainImage)
                .height(580)
                .width(460)
                .url() : null,
    }
}

async function getEditingServices () {
  const filter = groq`*[_type == "editingServices"]`;
  const projection = groq`{
    _id,
    mainImage,
    title,
    introduction[]{
      ...,
      children[]{
        ...
      }
    },
    serviceCards[]{
      ...,
      children[]{
        ...
      }
    },
  }`
  const query = [filter, projection].join(' ');
  const docs = await client.fetch(query).catch(err => console.error(err));
  const reducedDocs = overlayDrafts(hasToken, docs);
  const prepareEditingServices = reducedDocs.map(generateEditingServices);
  return prepareEditingServices[0];
}

// Export the function after its definition
module.exports = getEditingServices;
