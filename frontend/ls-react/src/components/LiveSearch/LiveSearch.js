import React, { useState } from "react";
import axios from "axios";

import {
  Wrapper,
  InputSearch,
  WordSuggestion,
  IcoMglass,
  Suggestion,
  HeaderLink,
  UnorderedList,
  SuggestionIcon,
  SuggestionTitle,
  SuggestionBodyTitle,
  BodyItems,
  BodyItemLink,
  FooterItems,
  LinkFooter,
  SearchWord,
} from "./Style";

const LiveSearch = () => {
  const [searchWord, setSearchWord] = useState('');
  const [value, setValue] = useState('');
  const [isShowSuggestions, setIsShowSuggestions] = useState(false);
  const [isShowSuggestionsHeader, setIsShowSuggestionsHeader] = useState(false);
  const [isShowSuggestionsBody, setIsShowSuggestionsBody] = useState(false);
  const [isShowWordSuggestion, setIsShowWordSuggestion] = useState(false);
  const [data, setData] = useState({});
  const [highlights, setHighlights] = useState({});
  const [suggestionArray, setSuggestionArray] = useState([]);
  const [suggestionNav, setSuggestionNav] = useState(-1);
  const [letters, setLetters] = useState([]);
  const [wordOrigin, setWordOrigin] = useState('');
  const [wordSuggestion, setWordSuggestion] = useState('');

  const lowercaseWithoutAccent = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const getJson = () => {
    axios.get(`${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_PORT}`).then((res) => {
      setData(res.data);
    });
  };

  const suggestionHeader = (formattedValue) => {
    if (data.highlights) {
      setHighlights({});

      data.highlights.forEach((highlight) => {
        const find = highlight.queries.find(
          (querie) => lowercaseWithoutAccent(querie) === formattedValue
        );

        if (find) {
          setIsShowSuggestionsHeader(true);
          setHighlights({
            title: highlight.title,
            url: highlight.url,
            logo: highlight.logo,
          });
        }
      });
    }
  };

  const suggestionBody = (formattedValue) => {
    if (data.suggestions) {
      setSuggestionArray([]);
      const suggestionItems = [];

      data.suggestions.forEach((suggestion) => {
        const allWords = suggestion.split(" ");
        const checkWord = allWords.find(
          (wordSearch) =>
            lowercaseWithoutAccent(wordSearch) ===
            lowercaseWithoutAccent(formattedValue)
        );

        if (checkWord) {
          setIsShowSuggestionsBody(true);
          suggestionItems.push({
            title: suggestion.replace(checkWord, `<strong>${checkWord}</strong>`),
            active: false,
          });
        } else {
          if (formattedValue.length >= 3) {
            const getWord = allWords.find(
              (wordSearch) =>
                lowercaseWithoutAccent(wordSearch.substring(0, formattedValue.length)) ===
                lowercaseWithoutAccent(formattedValue)
            );

              if (getWord) {
                let word = [];
                setIsShowWordSuggestion(true);

                for (let i = 0; i < getWord.length; i++) {
                    if (formattedValue.charAt(i) === getWord.charAt(i)) {
                      word.push({
                        label: getWord.charAt(i),
                        visible: false
                      });
                    } else {
                      word.push({
                        label: getWord.charAt(i),
                        visible: true
                      });
                    }
                }

                setLetters(word);
                setWordOrigin(formattedValue);
                setWordSuggestion(getWord);
              }
          }
        }
      });

      setSuggestionArray(suggestionItems);
    }
  };

  const getSuggestions = (event) => {
    const value = event.target.value;
    setSearchWord(value);

    if (value.length === 0) {
      setIsShowSuggestions(false);
      setIsShowSuggestionsBody(false);
      setIsShowWordSuggestion(false);

      return;
    }

    if (
      event.key === "ArrowDown" || 
      event.key === "ArrowUp"
    ) {
      setSuggestionArray(
        suggestionArray.map((suggestion) => {
          return {
            title: suggestion.title,
            active: false,
          };
        })
      );

      let nav = suggestionNav;

      if (event.key === "ArrowDown") {
        if (nav < suggestionArray.length - 1) {
          nav++;
        } else {
          nav = 0;
        }
      } else if (event.key === "ArrowUp") {
        if (nav === 0) {
          nav = suggestionArray.length - 1;
        } else {
          nav--;
        }
      }

      const newSuggestionArray = suggestionArray.map((suggestion, index) => {
        return {
            title: suggestion.title,
            active: index === nav,
          };
      });

      setSuggestionArray(newSuggestionArray);
      setValue(removeHTML(suggestionArray[nav].title));
      setSearchWord(removeHTML(suggestionArray[nav].title));

      setSuggestionNav(nav);
    } else if (event.key === "ArrowRight") {
      setIsShowWordSuggestion(false);
      setValue(wordSuggestion);

      suggestionHeader(wordSuggestion);
      suggestionBody(wordSuggestion);
      setSearchWord(wordSuggestion);

      setSuggestionNav(-1);
    } else if (event.key === "ArrowLeft") {
      setIsShowWordSuggestion(true);
      setValue(wordOrigin);

      suggestionHeader(wordOrigin);
      suggestionBody(wordOrigin);
      setSearchWord(wordOrigin);
    } else {
      setIsShowSuggestions(true);
      getJson();

      const formattedValue = lowercaseWithoutAccent(value);
      suggestionHeader(formattedValue);
      suggestionBody(formattedValue);
    }
  };

  const getValue = (value) => {
    setValue(value);
  }
  
  const createMarkup = (html) => {
    return { __html: html };
  }  

  const removeHTML = (html) => {
    return html.replace(/<[^>]*>/g, '')    ;
  }

  return (
    <div id="live-search">
      <Wrapper>
        <div>
          <IcoMglass />
          <form method="get" action="http://g1.globo.com/busca/">
            <InputSearch
              id="search"
              className="input-field"
              type="search"
              placeholder="Buscar"
              data-type="search"
              autoComplete="off"
              name="q"
              value={value}
              onKeyUp={(e) => getSuggestions(e)}
              onChange={(e) => getValue(e.target.value)}
            />
            {isShowWordSuggestion && (
              <WordSuggestion>
                {letters.map((item, index) => {
                  return (
                    <span className={!item.visible ? 'invisible' : null} key={index}>{ item.label }</span>
                  );
                })}
            </WordSuggestion>
            )}
          </form>
          {isShowSuggestions && (
            <Suggestion>
              {isShowSuggestionsHeader && highlights && (
                <div className="suggestion-header">
                  <HeaderLink href={highlights.url} title={highlights.title}>
                    <SuggestionIcon
                      src={highlights.logo}
                      alt={highlights.title}
                      title={highlights.title}
                    />
                    <SuggestionTitle>{highlights.title}</SuggestionTitle>
                  </HeaderLink>
                </div>
              )}
              {isShowSuggestionsBody && suggestionArray.length > 0 && (
                <div className="suggestion-body">
                  <SuggestionBodyTitle>Sugestão de busca</SuggestionBodyTitle>
                  <UnorderedList className="suggestion-search">
                    {suggestionArray.map((item, index) => {
                      return (
                        <BodyItems
                          key={index}
                          className={`${item.active ? "active" : ""}`}
                        >
                          <BodyItemLink href={`http://g1.globo.com/busca/?q=${removeHTML(item.title)}`} dangerouslySetInnerHTML={createMarkup(item.title)}>
                          </BodyItemLink>
                        </BodyItems>
                      );
                    })}
                  </UnorderedList>
                </div>
              )}
              <div className="suggestion-footer">
                <UnorderedList>
                  <FooterItems>
                    <LinkFooter
                      href={`http://g1.globo.com/busca/?q=${searchWord}`}
                      title="buscar na Globo.com"
                    >
                      buscar <SearchWord>{searchWord}</SearchWord> na Globo.com
                      &#x203A;
                    </LinkFooter>
                  </FooterItems>
                  <FooterItems>
                    <LinkFooter
                      href={`https://www.google.com/search?q=${searchWord}`}
                      title="buscar na Web"
                    >
                      buscar <SearchWord>{searchWord}</SearchWord> na Web
                      &#x203A;
                    </LinkFooter>
                  </FooterItems>
                </UnorderedList>
              </div>
            </Suggestion>
          )}
        </div>
      </Wrapper>
    </div>
  );
};

export default LiveSearch;
