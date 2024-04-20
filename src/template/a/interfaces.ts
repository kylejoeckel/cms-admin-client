export interface User {
  name: string;
  email: string;
  userId: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  errorMessage: string;
  clearError: () => void;
}

export interface MenuOpts {
  title: string;
  link?: string;
  download?: boolean;
}
export interface CTA {
  cta?: string;
  ctaLink?: string;
  ctaDownload?: boolean;
  ctaMenuOpts?: MenuOpts[];
  ctaPhone?: boolean;
}

export interface ContentItem {
  [key: string]: any; // Adding an index signature
  title?: string;
  content?: string;
  contentImg?: string;
  ctaList?: CTA[];
}

export interface HeaderData {
  ctaList?: CTA[];
  logoUrl?: string;
}

export interface MetaData {
  appleMobileWebAppTitle?: string;
  appleMobileWebStatusBarStyle?: string;
  appleTouchIcon?: string;
  favicon?: string;
  description?: string;
  keywords?: string;
  ogDescription?: string;
  ogTitle?: string;
  ogUrl?: string;
  ogImage?: string;
  ogSiteName?: string;
  themeColor?: string;
  title?: string;
}

export interface FormData {
  fullName?: string;
  hours?: string;
  address?: string;
  phone?: string;
  latitude?: number;
  longitude?: number;
  domainName?: string;
  contactEmail?: string;
  reservationLink?: string;
  takeoutLink?: string;
  noveltyLink?: string;
  mainLogo?: string;
  navLogo?: string;
  heroImg?: string;
  heroVideo?: string;
  heroVideoPoster?: string;
  menuRoute?: string;
  content?: ContentItem[];
  header?: HeaderData;
  metaData?: MetaData;
}

export interface ContentCardProps {
  index: number;
  contentData: ContentItem;
}
