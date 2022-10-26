=====================
#### Live Search

Componente de Live Search baseado na imagem abaixo.

![Live Search](exemplo.png?raw=true)

O componente deve exibir os dados correspondentes à busca feita pelo usuário, de acordo com a especificação exemplificada neste [JSON](exemplo.json).

============================
#### Requisitos
1. O live search deve ser atualizado conforme o usuário digita o termo de busca no campo de texto;
2. A busca deve ignorar a diferença entre letras maiúsculas/minúsculas (case insensitive) e acentos;
3. Caso algum item da seção "highlights" no JSON de resultado seja compatível com a busca do usuário através da chave "queries", o mesmo deve ser exibido como no exemplo "Pop & Arte" acima, com a logo, e clicável para sua URL;
4. Caso algum termo da seção "suggestions" seja compatível com a busca, o mesmo deve aparecer como "Sugestões de busca", com um link para ```http://g1.globo.com/busca/?q=<TERMO PESQUISADO>```;
5. As teclas (↓, ↑) devem navegar pelos links de sugestão e autocompletar o texto já digitado;
6. O JSON de resultado deve ser servido por um servidor, preferencialmente escrito em python, ruby ou node;
7. A página deve ser responsiva;

O projeto deve estar "pronto para produção" em termos de:

1. Formatação e estruturação do código;
2. Performance (client e server);
3. Segurança.

===============================================