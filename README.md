# Trabalho ReactNative Grupo 1

> Aplicativo móvel desenvolvido com React Native — "Mãos que falam”.

##  Descrição

Este é um aplicativo mobile construído com React Native, desenvolvido em grupo como trabalho acadêmico para a matéria de Native - SERRATEC.  
O app tem como objetivo ajudar pessoas surdas a conseguirem apoio para atividades do dia a dia por ter um interprete para ajudar em consultas médicas, mercado, banco e etc. 
Um usuario voluntário faz cadastro, coloca suas informações de localização, seu nivel de libras e assim, permite o surdo ja cadastrado a ter ajuda atraves do aplicativo. 

O projeto serve tanto para aprendizado quanto para consolidar o uso de navegação, componentes, estado, e demais práticas de React Native.

###  Principais Funcionalidades
* Cadastro e Login com integração pela MockApi
* Envio de pedido pela MockApi
* Edição de Perfil: implentação de editar foto, nome, telefone e senha.
* Login com implementação de verificação de email e senha corretos.
* Cadastro com verificação para que nao se repita um email ja cadastrado. 
* Integração com viaCep, busca os dados com base no Cep informado tanto no cadastro quanto no pedido feito pelo usuário através da pagina de pedido.
* Uso da Api do Senai, para buscar dados de palavras em português e retornar a descrição do movimento que é feito para traduzir para libras.
* Uso de Api do Vlibras que faz uma busca e retorna o site do governo que tem apoio a pessoas surdas.
* Uso de Api de SMS: usuário que faz um pedido recebe um sms confirmando o aceite.
* Uso de Api de Calendário: O voluntário, ao aceitar um pedido de ajuda, consegue guardar a data no calendário do próprio celular.
* Uso de AsynStorage, para que o usuario continue logado.
* Possibilita que o usuario surdo, ao fazer um pedido, tenha a opção de enviar um vídeo na descrição, use localização atual, escolha atraves de opções o tipo de ajuda, o lugar via localização atual, a hora via a hora local e o nível de libras necessário.
  
* 
##  Tecnologias e Ferramentas Utilizadas
A aplicação foi construída com as seguintes ferramentas e bibliotecas:

- React Native  
- TypeScript  
- Dependências definidas no `package.json` (bibliotecas, navegação, estados, utilitários, etc.)  
- Ferramentas padrão de ambiente Node.js / npm
  
##  Como Executar (Modo de Desenvolvimento)

```bash
# Clone este repositório
git clone https://github.com/isabellammachado/trabalho-reactNative-grupo1.git

# Acesse a pasta do projeto
cd trabalho-reactNative-grupo1

# Instale as dependências
npm install   

# Inicie o app
npx expo start  

Este projeto foi desenvolvido pelo **Grupo 1** e é mantido pelos seguintes membros:

* Isabella Machado 
* Simone Frez 
* Jéssica Lima 
* Lorrane Aló
* Ireni Iachechen 
