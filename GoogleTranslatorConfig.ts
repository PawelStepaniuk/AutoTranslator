const { Translate } = require('@google-cloud/translate').v2;

require('dotenv').config();

export default class GoogleTranslatorConfig {
   private CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

   constructor() {
     return new Translate({
       credentials: this.CREDENTIALS,
       projectId: this.CREDENTIALS.project_id,
     });
   }
}
