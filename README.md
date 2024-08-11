# Calculadora JS

Este projeto é uma calculadora web interativa desenvolvida com HTML, CSS e JavaScript. Ela oferece uma ampla gama de funcionalidades, incluindo operações matemáticas básicas, cálculos estatísticos, potenciação, raízes e conversão de unidades. O design da calculadora permite que você alterne entre temas claro e escuro, e também acompanhe seu histórico de cálculos realizados. A calculadora foi desenvolvida a partir de um projeto feito por mim, com melhorias adicionadas por Luan Vitoriano, Riyuiti Mizuno, Alisson Almeida e por mim.

## Funcionalidades

- **Cálculos Básicos**: Realize adição, subtração, multiplicação, divisão e cálculos com parênteses.
- **Cálculos Estatísticos**:
  - **Média**: Calcula a média dos números inseridos.
  - **Mediana**: Calcula a mediana dos números inseridos.
  - **Moda**: Calcula a moda dos números inseridos.
- **Potência e Raiz**:
  - **Potência**: Calcula a potência de um número com base em um expoente.
  - **Raiz**: Calcula a raiz de um número com base em um expoente.
- **Conversão de Unidades**:
  - **Comprimento**: Converte entre centímetros e metros.
  - **Volume**: Converte entre litros e mililitros.
- **Histórico de Cálculos**: Armazena e exibe o histórico das operações realizadas.
- **Alternância de Tema**: Mude entre o tema claro e escuro para uma experiência visual personalizada.
- **Tratamento de Erros**: Exibe uma mensagem de "Erro" em vez de resultados inválidos, como divisões por zero.

## Instruções de Uso

### 1. Abrir a Calculadora

- Baixe ou clone o repositório para o seu computador.
- Abra o arquivo `index.html` em um navegador web moderno.

#### Usar no Smartphone como PWA

- **Iniciar o Servidor**:

  - Inicialize o `index.html` usando o Live Server no seu editor de código, como o VSCode.

- **Conectar o Smartphone**:

  - No smartphone, abra o navegador e insira na URL o IP do seu computador seguido da porta do Live Server, por exemplo: `http://192.168.0.100:5500`.
  - Para encontrar o IP do seu computador, use o comando `ipconfig` no Prompt de Comando (CMD) e procure o endereço IPv4 da sua conexão de rede.

- **Adicionar à Tela Inicial**:

  - No navegador do smartphone, toque nos três pontinhos no canto superior direito.
  - Selecione "Adicionar à Tela Inicial" para criar um atalho para a calculadora.

- **Usar o PWA**:
  - Agora, você pode acessar a calculadora diretamente da tela inicial do seu smartphone, como um aplicativo independente.

### 2. Inserir Dados e Realizar Cálculos

- **Selecionar o Tipo de Cálculo**:

  - Utilize o menu ao lado do botão de copiar para escolher o tipo de cálculo desejado: Básico, Média, Mediana, Moda, Potência, Raiz, Conversão de Comprimento ou Volume.

- **Inserir Números**:

  - **Cálculos Básicos**: Clique no campo de entrada (campo de texto) e insira sua expressão matemática. Use os botões numéricos e de operação para facilitar a inserção.
  - **Média, Mediana e Moda**: Selecione a opção desejada no menu. Clique no campo de entrada (campo de texto) e insira os números separados por vírgulas.
  - **Potência e Raiz**: Escolha "Potência" ou "Raiz" no menu. Clique nos campos de base (campo de texto) e expoente (campo de texto) para inserir os valores.
  - **Conversão de Unidades**: Selecione "Comprimento" ou "Volume" no menu. Clique no campo de valor (campo de texto) e insira o número a ser convertido.

- **Importante**:
  - Para evitar erros, certifique-se de clicar no campo de entrada apropriado antes de digitar os valores. A calculadora registra o campo que você clicou como o ativo, e todos os valores inseridos serão direcionados para ele.

### 3. Executar o Cálculo

- Pressione o botão `=` para calcular o resultado e exibi-lo no campo de resultado.

### 4. Alternar Tema

- Clique no botão `Trocar Tema Escuro/Claro` para alternar entre o tema claro e escuro, ajustando a aparência conforme sua preferência.

### 5. Exibir/Ocultar Histórico

- Clique no botão `Mostrar/Ocultar Histórico` para visualizar ou esconder o histórico das operações realizadas. O histórico pode ser útil para acompanhar cálculos anteriores.

### 6. Copiar Resultado

- Após obter um resultado, clique no botão `Copiar` para copiar o resultado para a área de transferência e colá-lo em outro lugar, se necessário.

### 7. Limpar Campos

- Utilize o botão `C` para limpar todos os campos de entrada e o campo de resultado, permitindo iniciar um novo cálculo sem interferências dos valores anteriores.

## Requisitos

- Navegador web moderno com suporte a HTML5, CSS3 e JavaScript.

## Estrutura do Projeto

- **HTML**: Estruturação do conteúdo, incluindo campos de entrada, botões e menus.
- **CSS**: Estilização e layout, com suporte a temas claro e escuro.
- **JavaScript**: Lógica para cálculo, manipulação do DOM e tratamento de eventos.
- **Math.js**: Biblioteca utilizada para avaliação de expressões matemáticas complexas.
