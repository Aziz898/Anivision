const cloudinary = require('cloudinary').v2;
const Busboy = require('busboy');

// Прямо прописываем ваши Cloudinary-данные
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

    // Принимаем файл (multipart/form-data)
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      uploadPromise = new Promise((res, rej) => {
        // Загружаем поток файла в Cloudinary
        cloudinary.uploader.upload_stream(
          { folder: "aniVision" }, // Можно заменить на любую желаемую папку
          (error, result) => {
            if (error) {
              console.error("Cloudinary error:", error);
              rej(error);
            } else {
              // Результат содержит secure_url, public_id и т.д.
              res(result);
            }
          }
        ).end();

        // Можно отследить прогресс, если нужно
        file.on('data', (data) => {
          // console.log(`Получено ${data.length} байт`);
        });
      });
    });

    // Когда Busboy закончит читать запрос
    busboy.on('finish', async () => {
      try {
        const uploadResult = await uploadPromise;
        // Возвращаем JSON с данными о загруженном изображении
        resolve({
          statusCode: 200,
          body: JSON.stringify(uploadResult)
        });
      } catch (error) {
        resolve({ statusCode: 500, body: JSON.stringify(error) });
      }
    });

    // Если тело запроса base64, передаём 'base64', иначе 'binary'
    busboy.write(event.body, event.isBase64Encoded ? 'base64' : 'binary');
    busboy.end();
  });
};
