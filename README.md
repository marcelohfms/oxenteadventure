# 🚌 Oxente Adventure - Plataforma de Reservas de Viagens

![Oxente Adventure Logo](./public/logo.png) <!-- Opcional: Ajuste o caminho se o logo estiver em outro lugar ou remova se não quiser -->

Bem-vindo ao repositório da plataforma de reservas da Oxente Adventure! Este projeto foi desenvolvido com Next.js, TypeScript e Tailwind CSS para permitir que os clientes visualizem viagens de aventura, selecionem assentos, forneçam informações de passageiros e realizem pagamentos de forma integrada.

**🎯 Objetivo:** Facilitar a reserva online para passeios de aventura (trilhas, rapel, cachoeiras, etc.) oferecidos pela Oxente Adventure, com foco no público de João Pessoa-PB e região.

**🔗 Link do Deploy (Exemplo):** [Insira o link da sua aplicação na Vercel aqui]

## ✨ Funcionalidades Principais

*   **Listagem de Viagens:** Apresentação dos próximos passeios com imagens, datas e resumos.
*   **Detalhes da Viagem:** Página dedicada para cada viagem com informações completas (roteiro, inclusos, o que levar, etc.).
*   **Seleção Visual de Assentos:** Interface gráfica de ônibus para seleção de assentos, mostrando lugares ocupados (buscados via API).
*   **Formulário de Inscrição:** Coleta de dados dos passageiros por assento selecionado.
*   **Cálculo de Preço Dinâmico:** Ajuste de preço baseado na quantidade de assentos e códigos promocionais ("Sou Oxente").
*   **Integração de Pagamento:** Checkout utilizando a API do Mercado Pago.
*   **Páginas Estáticas:** "Sobre Nós" e "Termo de Responsabilidade".
*   **Backend (API Routes):**
    *   Endpoint para criar preferências de pagamento no Mercado Pago.
    *   (Planejado/Implementado) Endpoint para salvar reservas confirmadas em uma Planilha Google.
*   **Consulta de Ocupação:** Busca de assentos ocupados através de uma API externa (Google Apps Script).

## 🛠️ Tecnologias Utilizadas

*   **Framework:** [Next.js](https://nextjs.org/) (com App Router)
*   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
*   **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
*   **Pagamentos:** [SDK do Mercado Pago](https://www.mercadopago.com.br/developers/pt)
*   **Gerenciamento de Dados (Reservas):** [Google Apps Script](https://developers.google.com/apps-script) + [Planilhas Google](https://www.google.com/sheets/about/)
*   **Ícones (Opcional):** [Lucide React](https://lucide.dev/)
*   **Linting/Formatting:** ESLint, Prettier (configurações padrão do Next.js)

## 🚀 Começando (Desenvolvimento Local)

### Pré-requisitos

*   [Node.js](https://nodejs.org/) (Versão LTS recomendada)
*   [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    cd site-aventura
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```
3.  **Configure as Variáveis de Ambiente:**
    *   Crie um arquivo chamado `.env.local` na raiz do projeto.
    *   Adicione as seguintes variáveis (substitua pelos seus valores reais):
        ```env
        # .env.local

        # Credencial de Acesso do Mercado Pago (NÃO use a de produção em dev!)
        MP_ACCESS_TOKEN=SEU_ACCESS_TOKEN_DE_TESTE_AQUI

        # URL do seu Google Apps Script publicado como App da Web
        GOOGLE_SCRIPT_URL=SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI

        # URL base da sua aplicação (para desenvolvimento)
        NEXT_PUBLIC_BASE_URL=http://localhost:3000
        ```
    *   **IMPORTANTE:** Adicione `.env.local` ao seu arquivo `.gitignore` para não enviar suas chaves para o repositório!

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```
5.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## ⚙️ Variáveis de Ambiente

As seguintes variáveis são necessárias para o funcionamento correto da aplicação:

*   `MP_ACCESS_TOKEN`: Sua chave de acesso privada do Mercado Pago (Access Token). Usada no backend para criar preferências de pagamento. **Mantenha em segredo!**
*   `GOOGLE_SCRIPT_URL`: A URL de implantação do seu Google Apps Script (publicado como App da Web) que interage com a Planilha Google. Usada no backend.
*   `NEXT_PUBLIC_BASE_URL`: A URL base da sua aplicação. Usada para construir as URLs de retorno (`back_urls`) para o Mercado Pago. O prefixo `NEXT_PUBLIC_` a torna acessível também no frontend, se necessário.

**Em produção (Vercel):** Configure estas mesmas variáveis diretamente no painel do seu projeto na Vercel, na seção "Environment Variables", utilizando seus tokens e URLs de produção.

## 🔗 Endpoints da API (Backend)

*   `POST /api/pagamento`: Recebe os dados da inscrição (assentos, passageiros, etc.), (opcionalmente salva um registro inicial na planilha) e cria uma preferência de pagamento no Mercado Pago, retornando o `init_point`.
*   `POST /api/salvar-reserva-confirmada`: (Se implementado seguindo nossa conversa) Recebe os dados da reserva após o pagamento bem-sucedido (enviados pela página de sucesso) e salva definitivamente na Planilha Google.

## 🚀 Deploy

O deploy deste projeto é feito através da [Vercel](https://vercel.com/). Certifique-se de configurar corretamente as **Variáveis de Ambiente** no painel do seu projeto na Vercel antes de fazer o deploy.

## 🔧 Possíveis Melhorias e TODOs

*   [ ] **Resolver problema do `tailwind.config.js`:** Investigar por que o arquivo de configuração não está sendo criado/lido corretamente para habilitar cores e fontes personalizadas.
*   [ ] **Implementar Webhooks do Mercado Pago:** Criar um endpoint (`/api/webhooks/mercadopago`) para receber notificações de status de pagamento e atualizar a Planilha Google de forma mais confiável (em vez de depender do redirecionamento da página de sucesso).
*   [ ] **Melhorar Tratamento de Erros:** Adicionar feedback mais específico para o usuário em caso de falhas na API ou no pagamento.
*   [ ] **Otimização de Imagens:** Garantir que todas as imagens (`<img>`) foram substituídas pelo componente `<Image>` do Next.js.
*   [ ] **Testes:** Adicionar testes unitários e/ou de integração.
*   [ ] **Refinamentos de UI/UX:** Melhorar transições, adicionar mais feedback visual, etc.
*   [ ] **Validação de Formulários:** Implementar validação mais robusta nos formulários (frontend e backend).
*   [ ] **Tipagem:** Refinar os tipos TypeScript, especialmente nas respostas de API e dados externos.

---

Desenvolvido com 🌵 e ☕!
