import Translator from './Translator';
import CacheStorage from './CacheStorage';
import { TranslationRequest } from './Types';

export default class TranslatorService {
    private translator = new Translator();

    private cache = new CacheStorage();

    public async getTranslate<T>(requestBody: TranslationRequest<T>) {
      if (!this.cache.isExist(requestBody.language)) {
        const translatedObject = await this.translator.translateObject(requestBody.objectToTranslate, requestBody.language);
        this.cache.saveToFile(requestBody.language, JSON.stringify(translatedObject));
      }
      return this.cache.readFromFile(requestBody.language);
    }
}
