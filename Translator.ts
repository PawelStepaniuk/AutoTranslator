import GoogleTranslatorConfig from './GoogleTranslatorConfig';

export default class Translator {
  translator = new GoogleTranslatorConfig();

  translateText = async (text, targetLanguage:string): Promise<String> => {
    try {
      return await this.translator.translate(text, targetLanguage);
    } catch (error:any) {
      throw new Error(error);
    }
  };

  async translateObject<T>(object: T, language: string) {
    const copyOfObject = { ...object };
    const keys = Object.keys(copyOfObject);
    try {
      for (const key of keys) {
        const isValueObjectType = Object.prototype.toString.call(copyOfObject[key]) === '[object Object]';
        const isValueArrayType = Array.isArray(copyOfObject[key]) && Object.prototype.toString.call(copyOfObject[key]) === '[object Array]';
        if (isValueObjectType || isValueArrayType) {
          copyOfObject[key] = await this.translateObject(copyOfObject[key], language);
        }
        const isValueStringType = typeof copyOfObject[key] === 'string';
        if (isValueStringType) {
          const translatedObjectFromAPI = await this.translateText(copyOfObject[key], language);
          const [translatedText] = translatedObjectFromAPI;
          copyOfObject[key] = translatedText;
        }
      }
    } catch (error) {
      console.error(error);
    }
    return copyOfObject;
  }
}
