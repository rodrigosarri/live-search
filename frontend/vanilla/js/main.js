const lowercaseWithoutAccent = text   => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const removeClass = (parent, cssClass) => {
    for (let i = 0; i < parent.length; i++) {
        parent[i].classList.remove(cssClass);
    }
}

const suggestionHeader = (data, formattedValue) => {
    document.getElementsByClassName('suggestion-header')[0].classList.remove('flex');

    if (data.highlights) {
        data.highlights.forEach(highlight => {
            const find = highlight.queries.find(querie => lowercaseWithoutAccent(querie) === formattedValue)
    
            if (find) {
                document.getElementsByClassName('suggestion-header-link')[0].setAttribute('href', highlight.url);
                document.getElementsByClassName('suggestion-header-link')[0].setAttribute('title', highlight.title);
                document.getElementsByClassName('suggestion-icon')[0].setAttribute('src', highlight.logo);
                document.getElementsByClassName('suggestion-icon')[0].setAttribute('alt', highlight.title);
                document.getElementsByClassName('suggestion-icon')[0].setAttribute('title', highlight.title);
                document.getElementsByClassName('suggestion-title')[0].innerText = highlight.title;
    
                document.getElementsByClassName('suggestion-header')[0].classList.add('flex');
            }
        });
    }
}

const suggestionBody = (data, formattedValue) => {
    document.getElementsByClassName('suggestion-body')[0].classList.remove('flex');
    document.getElementsByClassName('word-suggestion')[0].classList.remove('flex');
    document.getElementsByClassName('suggestion-search')[0].innerHTML = '';

    if (data.suggestions) {
        let suggestionArray = [];
        
        data.suggestions.forEach(suggestion => {

            const allWords  = suggestion.split(' ');
            const checkWord = allWords.find(wordSearch => lowercaseWithoutAccent(wordSearch) === formattedValue);

            if (checkWord) {
                suggestion = suggestion.replace(checkWord, `<strong>${checkWord}</strong>`);
                suggestionArray.push(suggestion);

                document.getElementsByClassName('word-suggestion')[0].classList.remove('flex');
            } else {
                if (formattedValue.length >= 3) {
                    const getWord = allWords.find(wordSearch => 
                    lowercaseWithoutAccent(wordSearch.substring(0, formattedValue.length)) === formattedValue);

                    if (getWord) {
                        document.getElementsByClassName('word-suggestion')[0].classList.add('flex');
                        document.getElementsByClassName('word-suggestion')[0].setAttribute('data-word-suggestion', getWord);
                        document.getElementsByClassName('word-suggestion')[0].setAttribute('data-word-origin', formattedValue);

                        let word = '';
                        for (let i = 0; i < getWord.length; i++) {
                            if (formattedValue.charAt(i) === getWord.charAt(i)) {
                                word += `<span class="opacity-0">${getWord.charAt(i)}</span>`;
                            } else {
                                word += `<span>${getWord.charAt(i)}</span>`;
                            }
                        }

                        document.getElementsByClassName('word-suggestion')[0].innerHTML = word;
                    }
                } else {
                    document.getElementsByClassName('word-suggestion')[0].removeAttribute('data-word-suggestion');
                    document.getElementsByClassName('word-suggestion')[0].removeAttribute('data-word-origin');                    
                }
            }
        });

        if (suggestionArray.length > 0) {
            let links = '';
            suggestionArray.forEach(element => {
                links += `<li><a href="http://g1.globo.com/busca/?q=${element.replace(/<[^>]*>/g, '')}">${element}</a></li>`;
            });

            document.getElementsByClassName('suggestion-search')[0].innerHTML = links;
            document.getElementsByClassName('suggestion-body')[0].classList.add('flex');
        }
    }

}

const suggestionFooter = (value) => {
    document.getElementsByClassName('suggestion-footer')[0].classList.remove('flex');
    let searchWord = document.getElementsByClassName('search-word');

    for(let i = 0; i < searchWord.length; i++) {
        searchWord[i].innerText = `'${value}'`;
    }

    document.getElementsByClassName('search-globo')[0].setAttribute('href', `http://g1.globo.com/busca/?q=${value}`);
    document.getElementsByClassName('search-web')[0].setAttribute('href', `https://www.google.com/search?q=${value}`);

    document.getElementsByClassName('suggestion-footer')[0].classList.add('flex');
}

let current = -1;

const getSuggestions = (e) => {
    const value = e.target.value;
    const formattedValue = lowercaseWithoutAccent(value);

    if (value.length === 0) {
        removeClass(document.querySelector('.suggestion').children, 'flex');
        document.getElementsByClassName('suggestion')[0].classList.remove('flex');
        document.getElementsByClassName('word-suggestion')[0].classList.remove('flex');
        return;
    }

    let oReq = new XMLHttpRequest();

    oReq.onload = () => {
        const data = JSON.parse(oReq.response);

        if (
            e.key === 'ArrowDown' || 
            e.key === 'ArrowUp'
        ) {
            let li = document.querySelectorAll('.suggestion-search li');
            
            if (li.length > 0) {
                removeClass(li, 'active');

                if(e.key === 'ArrowDown') {       
                    if (current < li.length - 1) {
                        current++;
                    } else {
                        current = 0;
                    }
                } else if (e.key === 'ArrowUp') {
                    if (current === 0) {
                        current = (li.length - 1);
                    } else {
                        current--;
                    }
                }

                li[current].classList.add('active');
                document.querySelector('.input-field').value = li[current].textContent;
            }
        } else if (e.key === 'ArrowRight') {
            const getWordSuggestion = document.getElementsByClassName('word-suggestion')[0].getAttribute('data-word-suggestion');

            if (getWordSuggestion) {
                document.getElementsByClassName('word-suggestion')[0].classList.remove('flex');
                document.querySelector('.input-field').value = getWordSuggestion;

                current = -1;

                suggestionHeader(data, getWordSuggestion);
                suggestionBody(data, getWordSuggestion);
                suggestionFooter(getWordSuggestion);
            }

        } else if (e.key === 'ArrowLeft') {
            const getWordOrigin = document.getElementsByClassName('word-suggestion')[0].getAttribute('data-word-origin');

            if (getWordOrigin) {
                document.getElementsByClassName('word-suggestion')[0].classList.add('flex');
                document.querySelector('.input-field').value = getWordOrigin; 

                suggestionHeader(data, getWordOrigin);
                suggestionBody(data, getWordOrigin);
                suggestionFooter(getWordOrigin);
            }
        } else {
            document.getElementsByClassName('suggestion')[0].classList.add('flex');
    
            suggestionHeader(data, formattedValue);
            suggestionBody(data, formattedValue);
            suggestionFooter(value);            
        }
    };

    oReq.open('get', 'http://localhost:3001', true);
    oReq.send();
}

let input = document.querySelector('.input-field');
input.addEventListener('keyup', getSuggestions);