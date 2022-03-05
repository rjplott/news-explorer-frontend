export interface Card {
  _id: string;
  date: Date;
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
