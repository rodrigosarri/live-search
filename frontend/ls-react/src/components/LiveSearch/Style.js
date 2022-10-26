import styled from 'styled-components'

export const Wrapper = styled.div`
    background-color: var(--red);
    padding: var(--spacing-xs) var(--spacing-md);  
    margin-bottom: var(--spacing-md);

    > div {
        position: relative;

        > form {
            position: relative;
        }
    }
`

export const InputSearch = styled.input`
    font-family: "helvetica-narrowbold";
    min-height: var(--spacing-md);
    border: 0 none;
    border-radius: var(--spacing-xxxs);
    min-width: 100%;
    padding: var(--spacing-xxxs) var(--spacing-md);
    box-sizing: border-box;
    font-size: 14px;

    &:focus {
        outline-width: 0;
        outline: none;        
    }
`

export const WordSuggestion = styled.div`
    font-family: "helvetica-narrowbold";
    font-size: 14px;
    position: absolute;
    left: 32px;
    top: 8px;
    color: var(--gray);
    display: flex;

    > span {
        display: flex;

        &.invisible {
            opacity: 0;
        }
    }
`

export const IcoMglass = styled.span`
    position: absolute;
    display: inline-block;
    background: var(--white);
    border-radius: 30px;
    height: var(--spacing-xxs);
    width: var(--spacing-xxs);
    border: 2px solid var(--mine-shaft);
    top: var(--spacing-xxs);
    left: var(--spacing-xxs);

    &::after {
        content: "";
        height: 2px;
        width: var(--spacing-xxs);
        background: var(--mine-shaft);
        position: absolute;
        top: 10px;
        left: 7px;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
    }
`;

export const Suggestion = styled.div`
    border-radius: var(--spacing-xxxs);
    box-shadow: 1px 1px var(--spacing-xxs) 0px rgba(198, 198, 198, 0.75);
    position: absolute;
    background: var(--white);
    min-width: 100%;
    margin-top: var(--spacing-xs);
    padding: var(--spacing-xs) 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    &::before {
        content: "";
        display: block;
        position: absolute;
        top: -12px;
        border-bottom: 12px solid var(--white);
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        left: calc(50% - 10px);
    }

    > div {
        padding: var(--spacing-xxs);
        border-bottom: solid 1px var(--alto);
        display: flex;
        flex-direction: column;
        
        &::first-child {
            padding: var(--spacing-xs) var(--spacing-xxs);            
        }
    }
`;

export const UnorderedList = styled.ul`
    padding: 0;
    list-style: none;
    margin: var(--spacing-xxs) 0;
`

export const HeaderLink = styled.a`
    display: flex;
    align-items: center;
    text-decoration: none;    
`;

export const SuggestionIcon = styled.img`
    max-width: 100%;
    height: 100%;
    margin-right: var(--spacing-xs);
`

export const SuggestionTitle = styled.h2`
    margin: 0;
    font-family: "helvetica-narrowbold";
    color: var(--tundora);
    font-size: 18px;
`

export const SuggestionBodyTitle = styled.span`
    margin-left: auto;
    color: var(--silver);
    font-style: italic;
`

export const BodyItems = styled.li`
    color: var(--mine-shaft);
    padding: var(--spacing-xxxs) 0;  
    
    &:hover,
    &.active {
        background-color: var(--alto);
    }
`

export const BodyItemLink = styled.a`
    color: var(--mine-shaft);
    text-decoration: none;

    &:active,
    &:visited {
        color: var(--mine-shaft);
    }
`

export const FooterItems = styled.li`
    border-bottom: solid 1px var(--alto);

    &:last-child {
        border-bottom: 0 none;
    }
`

export const LinkFooter = styled.a`
    color: var(--gray);
    text-decoration: none;
    padding: var(--spacing-xxs) 0;
    display: inline-block;
`

export const SearchWord = styled.span`
    color: var(--mine-shaft);    
`