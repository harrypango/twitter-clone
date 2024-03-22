import formidable from "formidable";

export default defineEventHandler(async (event) => {
  const form = formidable({});

  const response = await new Promise((resolve, reject) => {
    form.parse(event.req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
      console.log(files.image[0].filepath);
    });
  });

  return {
    hello: response,
  };
});
