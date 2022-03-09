export interface Card {
  _id?: string;
  date: string;
  image: string;
  title: string;
  text: string;
  source: string;
  keyword: string;
  link: string;
}

export interface Articles {
  cards: Card[];
  numDisplayed: number;
  displayedCards: Card[];
}

export interface User {
  name: string;
}

export interface FormValidationData {
  values: {
    [k: string]: string;
  };
  errors: {
    [k: string]: string;
  };
  isValid: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetForm: (
    values: {
      [k: string]: string;
    },
    errors: {
      [k: string]: string;
    },
    isValid: boolean
  ) => void;
}

export interface ApiArticle {
  source: {
    id: null | string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
