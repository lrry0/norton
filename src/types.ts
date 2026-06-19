export interface SupportArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  readingTime: string;
  tags: string[];
}

export type ProductActionType = 
  | 'download' 
  | 'renew' 
  | 'account' 
  | 'device' 
  | 'password' 
  | 'backup' 
  | 'vpn' 
  | 'family' 
  | 'business' 
  | 'threat';

export interface ProductCardData {
  id: string;
  title: string;
  iconName: string;
  description: string;
  actionType: ProductActionType;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface SecurityScanStats {
  filesScanned: number;
  threatsFound: number;
  progress: number;
  currentPath: string;
}
