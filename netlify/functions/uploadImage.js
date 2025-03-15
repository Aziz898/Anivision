// netlify/functions/uploadImage.js
const cloudinary = require('cloudinary').v2;
const Busboy = require('busboy');

// Конфигурация Cloudinary
cloudinary.config({ 
    cloud_name: 'dpfbiv1au', 
    api_key: '963141356556696', 
    api_secret: 'tdFCI_qvRMvJkYw0f8pnH7bwuQQ'
});

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  
  return new Promise((resolve, reject) => {
    const busboy = new Busboy({ headers: event.headers });
    let uploadPromise;

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      uploadPromise = new Promise((res, rej) => {
        cloudinary.uploader.upload_stream(
          { folder: "aniVision" },
          (error, result) => {
            if (error) {
              console.error("Cloudinary error:", error);
              rej(error);
            } else {
              res(result);
            }
          }
        ).end();
        file.on('data', (data) => {
          // Можно отслеживать прогресс, если нужно
        });
      });
    });

    busboy.on('finish', async () => {
      try {
        const uploadResult = await uploadPromise;
        resolve({
          statusCode: 200,
          body: JSON.stringify(uploadResult)
        });
      } catch (error) {
        resolve({ statusCode: 500, body: JSON.stringify(error) });
      }
    });

    busboy.write(event.body, event.isBase64Encoded ? 'base64' : 'binary');
    busboy.end();
  });
};
