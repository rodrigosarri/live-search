import { Component, OnInit } from '@angular/core';
import { LiveSearchService } from './live-search.service';
import { Highlights, SuggestionHeader, SuggestionBody } from './live-search.model';

@Component({
  selector: 'app-live-search',
  templateUrl: './live-search.component.html',
  styleUrls: ['./live-search.component.scss']
})

export class LiveSearchComponent implements OnInit {

  public value: string = '';

  public showSuggestion: boolean = false;
  public showSuggestionHeader: boolean = false;
  public showSuggestionBody: boolean = false;
  public showWordSuggestion: boolean = false;

  public data: {
    highlights: Array<Highlights>;
    suggestions: Array<string>;
  } | undefined;

  public header: SuggestionHeader = {
    title: '',
    href: '',
    src: ''
  }

  public suggestionArray: Array<SuggestionBody> = [];
  public letters: Array<{
    label: string,
    visible: boolean,
  }> = [];

  private suggestionNav: number = -1;
  private wordSuggestion: string = '';
  private wordOrigin: string = '';

  constructor(
    private liveSearch: LiveSearchService
  ) { }

  ngOnInit(): void {

  }

  private lowercaseWithoutAccent = (text: string) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  private suggestionHeader(): void {
    this.showSuggestionHeader = false;

    if (this.data?.highlights) {
      this.header.title = '';
      this.header.href = '';
      this.header.src = '';

      this.data.highlights.forEach((highlight: Highlights) => {
        const find = highlight.queries.find((querie: string) =>
          this.lowercaseWithoutAccent(querie) === this.lowercaseWithoutAccent(this.value));

        if (find) {
          this.header.title = highlight.title;
          this.header.src = highlight.logo;
          this.header.href = highlight.url;

          this.showSuggestionHeader = true;
        }

      });
    }
  }

  private suggestionBody(): void {
    this.showSuggestionBody = false;

    if (this.data?.suggestions) {
      this.suggestionArray = [];
      this.data.suggestions.forEach(suggestion => {

        const allWords = suggestion.split(' ');
        const checkWord = allWords.find(wordSearch =>
          this.lowercaseWithoutAccent(wordSearch) === this.lowercaseWithoutAccent(this.value));

        if (checkWord) {
          suggestion = suggestion.replace(checkWord, `<strong>${checkWord}</strong>`);

          this.showSuggestionBody = true;
          this.suggestionArray.push({
            title: suggestion,
            active: false
          });
        } else {
          if (this.value.length >= 3) {
            const getWord = allWords.find(wordSearch =>
              this.lowercaseWithoutAccent(wordSearch.substring(0, this.value.length)) === this.lowercaseWithoutAccent(this.value));

              if (getWord) {
                this.letters = [];
                this.showWordSuggestion = true;

                for (let i = 0; i < getWord.length; i++) {
                    if (this.value.charAt(i) === getWord.charAt(i)) {
                      this.letters.push({
                        label: getWord.charAt(i),
                        visible: false
                      });
                    } else {
                      this.letters.push({
                        label: getWord.charAt(i),
                        visible: true
                      });
                    }
                }

                this.wordOrigin = this.value;
                this.wordSuggestion = getWord;
              }
          }
        }
      });
    }
  }

  public removeHTML(title: string): string {
    return title.replace(/<[^>]*>/g, '');
  }

  public getSuggestions(event: any): void {
    this.value = event.target.value;

    if (
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp'
    ) {
      this.suggestionArray = this.suggestionArray.map(suggestion => {
        return {
          title: suggestion.title,
          active: false
        }
      });

      if (event.key === 'ArrowDown') {
        if (this.suggestionNav < this.suggestionArray.length - 1) {
          this.suggestionNav++;
        } else {
          this.suggestionNav = 0;
        }
      } else if (event.key === 'ArrowUp') {
        if (this.suggestionNav === 0) {
          this.suggestionNav = (this.suggestionArray.length - 1);
        } else {
          this.suggestionNav--;
        }
      }

      this.suggestionArray[this.suggestionNav].active = true;
      this.value = this.removeHTML(this.suggestionArray[this.suggestionNav].title);

    } else if (event.key === 'ArrowRight') {
      this.showWordSuggestion = false;
      this.value = this.wordSuggestion;

      this.suggestionNav = -1;

      this.suggestionHeader();
      this.suggestionBody();
    } else if (event.key === 'ArrowLeft') {
      this.showWordSuggestion = true;
      this.value = this.wordOrigin;

      this.suggestionHeader();
      this.suggestionBody();
    } else {
      if (this.value.length > 0) {
        this.liveSearch.getData().subscribe((data) => {
          if (data) {
            this.showSuggestion = true;
            this.data = data;

            this.suggestionHeader();
            this.suggestionBody();
          }
        });
      } else {
        this.showSuggestion = false;
        this.showSuggestionHeader = false;
        this.showSuggestionBody = false;
      }
    }
  }
}
