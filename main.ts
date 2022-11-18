import TranslatorService from './TranslatorService';
import { TranslationRequest } from './Types';

const pl: TranslationRequest<any> = {
  language: 'en',
  objectToTranslate: {
    attention: {
      title: 'Dobrze, że jesteś, sprawdź to zadanie',
      subtitle: 'Pomoże Ci ogarnąć jak zmieniać język w apkach reacta',
      ctaButton: 'Dowiedź się więcej',
    },
    newsletter: {
      title: 'Bądź na bieżąco',
      ctaButton: 'Idź do repo ->',
      action: '/new-subscriber?lang=pl',
      nextAction: { title: 'Haha, niespodzianka!', actions: ['Glaskaj kitka!'] },
    },
  },
};

const translator = new TranslatorService();
translator.getTranslate(pl);
