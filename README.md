
# Aplicação para Organização de Dados do Projeto FaunABC

Uma aplicação React simples para ajudar na organização dos dados de animais no TCC de Desenvolvimento de Sistemas.

## Sumário

- [Sobre](#sobre)
- [Contribuindo](#contribuindo)

## Sobre

Este projeto visa facilitar a organização e a gestão dos dados de animais para o TCC de Desenvolvimento de Sistemas, conhecido como Projeto FaunABC.


## Contribuindo

instruções para colocar o projeto em sua máquina e conseguir adicionar dados de animais
1. **Faça um fork do projeto:**
- Clique no botão "Fork" no canto superior direito da página do repositório.![Botão de Fork](https://github.com/Leticia-Emily-Moraes/dados-tcc/assets/95486245/69bd3a3c-ded9-4ee2-a7c3-ab89d2bb0042)
- Isso criará uma cópia do repositório no seu próprio GitHub.
2. **Clone o repositório forked para a sua máquina local:**
```sh
git clone https://github.com/seu-usuario/dados-tcc.git
```
![Clone do repositório](https://github.com/Leticia-Emily-Moraes/dados-tcc/assets/95486245/0b438dfd-8ec1-402f-b478-83fb67e54897)
3. **Entre na branch propria para adição de novos Animais:**

```sh
cd dados-tcc

git checkout AdicaoDeAnimais
```

4. **Atualize antes de usar:**

```sh
git pull

```

5. **Entre na aplicação de novos animais:**
```sh
npm run server
npm start
```
- isso irá fazer que a aplicação abra em seu navegador no link [http://localhost:3000](http://localhost:3000)

6. **Faça suas alterações e commit:**
Ápos terminar de fazer as alterações siga o seguinte fluxo
```sh
git add data-animais.json
```
```sh
git commit -m 'Novos dados adicionados, último animal: <nome-do-ultimo animal-adicionado>'
```
5. **Envie as suas alterações para a branch:**

```sh
git push origin AdicaoDeAnimais
```

6. **Abra um Pull Request:**

- Vá para a página do seu repositório forked no GitHub.
![PullRequest1](https://github.com/Leticia-Emily-Moraes/dados-tcc/assets/95486245/eb3c58f9-c1a9-4ae9-9f2f-d26249bd935c)
- Clique no botão "Compare & pull request".
![Button Pull Request](https://github.com/Leticia-Emily-Moraes/dados-tcc/assets/95486245/3a3db437-9b85-48b1-8a0c-78d5496f3374)
- Preencha os detalhes do pull request e envie.
![pullResquestEdição](https://github.com/Leticia-Emily-Moraes/dados-tcc/assets/95486245/03b0d394-0adc-4fd2-bf1e-f3df38ac6e80)

Todas as vezes que for fazer adição dos animais tem que seguir os passos do 3 ao 6
