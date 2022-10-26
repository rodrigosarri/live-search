export interface Highlights {
  title: string;
  url: string;
  logo: string;
  queries: Array<string>;
};

export interface SuggestionHeader {
  title: string;
  href: string;
  src: string;
}

export interface SuggestionBody {
  title: string,
  active: boolean
}
