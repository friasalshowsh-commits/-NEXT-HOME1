import { TranslationSchema } from '../translations';

export type LangType = 'ar' | 'en';

export interface SectionProps {
  lang: LangType;
  currentTrans: TranslationSchema;
}
