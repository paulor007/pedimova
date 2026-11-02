<p align="center">
  <img src="frontend/public/favicon.svg" alt="" width="72" />
</p>

<h1 align="center">Pedimova</h1>

<p align="center">Gestão de pedidos, estoque e pagamentos em uma só plataforma.</p>

> **Em desenvolvimento.** A página de apresentação está na etapa final de implementação (etapa 3 de 14). O painel de operação e o backend vêm nas próximas etapas.

## O que é

A Pedimova é uma plataforma de gestão que acompanha cada pedido da criação à entrega.

Pedidos, estoque, pagamentos, notificações e cadastros trabalham de forma integrada. Um pedido criado reserva os itens disponíveis, um pagamento aprovado libera a separação e o cliente recebe avisos nas etapas importantes.

O objetivo é centralizar a operação de uma distribuidora de pequeno ou médio porte, permitindo que cada equipe acompanhe suas responsabilidades com clareza.

### Escopo da versão 1

| Área         | Funcionalidades previstas                                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Pedidos      | Criação com cliente, itens e forma de pagamento; situação e histórico; separação, envio, entrega e cancelamento com motivo |
| Estoque      | Saldo físico, reservado e disponível; reserva e baixa automáticas; ajustes e alertas de estoque mínimo                     |
| Pagamentos   | PIX com prazo de validade, cartão, confirmação, expiração e estorno                                                        |
| Notificações | E-mails ao cliente nas etapas de pagamento, envio, entrega e cancelamento                                                  |
| Cadastros    | Gestão de clientes e produtos                                                                                              |
| Painel       | Indicadores de pedidos, faturamento, ticket médio, situações e pendências que exigem atenção                               |

A plataforma terá quatro perfis de acesso: **Administrador, Atendente, Estoquista e Financeiro**, cada um com permissões específicas.

Na primeira versão, a integração com o provedor de pagamentos será simulada. O backend, os eventos e os mecanismos de processamento serão desenvolvidos nas etapas posteriores.

---

## Para recrutadores e desenvolvedores

A Pedimova é um projeto de portfólio que desenvolvo de ponta a ponta, desde o levantamento dos requisitos e a experiência do usuário até a implementação da arquitetura e do código.

O objetivo técnico é demonstrar boas práticas de desenvolvimento de software, organização de código, testes, segurança, mensageria e arquitetura distribuída.

### Situação do desenvolvimento

| Etapa                                                 | Situação     |
| ----------------------------------------------------- | ------------ |
| 1. Ambiente e estrutura do projeto                    | Concluída    |
| 2. Identidade visual e design system                  | Concluída    |
| 3. Página de apresentação                             | Em andamento |
| 4. Navegação, rotas e layout do painel                | Planejada    |
| 5. Componentes reutilizáveis                          | Planejada    |
| 6. Tipos, dados de demonstração e serviços            | Planejada    |
| 7. Gestão de pedidos                                  | Planejada    |
| 8. Clientes e produtos                                | Planejada    |
| 9. Controle de estoque                                | Planejada    |
| 10. Pagamentos                                        | Planejada    |
| 11. Painel de indicadores                             | Planejada    |
| 12. Eventos e mensageria                              | Planejada    |
| 13. Monitoramento e observabilidade                   | Planejada    |
| 14. Testes, acessibilidade, documentação e publicação | Planejada    |

O desenvolvimento começou pelo frontend, com dados de demonstração.

Posteriormente, o backend será construído em Java e integrado progressivamente, substituindo os dados simulados pelas APIs reais.

### Arquitetura planejada

**Serviços de negócio**

A arquitetura prevê cinco serviços:

- Pedidos
- Estoque
- Pagamentos
- Notificações
- Cadastros

Cada serviço terá suas próprias responsabilidades e seu próprio banco de dados.

**Comunicação entre serviços**

A comunicação será baseada principalmente em eventos distribuídos pelo RabbitMQ.

Chamadas HTTP serão utilizadas quando uma resposta imediata for necessária, como nas validações de clientes e produtos.

**Entrada e segurança**

A plataforma prevê:

- API Gateway como ponto de entrada.
- Autenticação e autorização com Keycloak.
- Controle de acesso baseado nos quatro perfis de usuário.

**Padrões e mecanismos planejados**

- Saga coreografada com ações de compensação.
- Transactional Outbox.
- Consumidores idempotentes.
- Chaves de idempotência.
- Controle de versão otimista.
- Circuit Breaker, timeout e novas tentativas.
- Dead Letter Queue (DLQ).
- Processamento agendado.
- Rastreamento distribuído.

> Para uma empresa deste porte, um monólito modular poderia atender aos requisitos. A escolha por microsserviços é deliberada para aprofundar o estudo de sistemas distribuídos e demonstrar os desafios de integração, consistência e resiliência.

A versão 1 não prevê Kafka, Kubernetes, Eureka ou Config Server, pois essas ferramentas não são necessárias ao escopo inicial.

### Escopo técnico da versão 1

| Item                  | Quantidade |
| --------------------- | ---------: |
| Requisitos funcionais |         32 |
| Regras de negócio     |         31 |
| Telas planejadas      |         16 |
| Perfis de acesso      |          4 |
| Serviços de negócio   |          5 |

Esses indicadores representam o escopo planejado e não funcionalidades já concluídas.

### Tecnologias

| Camada                      | Tecnologias                                                            | Situação  |
| --------------------------- | ---------------------------------------------------------------------- | --------- |
| Frontend                    | React 19, TypeScript, Vite 8, Tailwind CSS 4, React Router e Lucide    | Em uso    |
| Qualidade de código         | ESLint, Prettier                                                       | Em uso    |
| Testes do frontend          | Vitest                                                                 | Planejado |
| Backend                     | Java, Spring Boot, Spring Data JPA, Spring Cloud Gateway, Resilience4j | Planejado |
| Banco de dados e mensageria | PostgreSQL, RabbitMQ                                                   | Planejado |
| Segurança                   | Keycloak                                                               | Planejado |
| Observabilidade             | OpenTelemetry, Jaeger, Prometheus, Grafana                             | Planejado |
| Execução                    | Docker Compose                                                         | Planejado |

### Decisões técnicas do frontend

**Identidade visual e design tokens**

O projeto utiliza tokens para cores, tipografia, espaçamentos, bordas e outros elementos visuais, mantendo consistência entre os componentes.

**Acessibilidade**

A implementação considera navegação por teclado, foco visível, contraste, descrições acessíveis e preferência por movimento reduzido.

As verificações de acessibilidade e desempenho acompanham o desenvolvimento.

**Responsividade**

A apresentação pública é desenvolvida para computador, tablet e celular, com adaptações específicas para conteúdos visuais complexos.

**Organização do domínio**

As situações de pedidos e pagamentos são centralizadas em `src/domain`, permitindo reutilização e consistência na aplicação.

**Organização do desenvolvimento**

As alterações são implementadas progressivamente, verificadas com TypeScript, ESLint, Prettier e build de produção, e registradas em commits com responsabilidades definidas.

### Estrutura do frontend

```text
frontend/src/
├── components/
│   ├── brand/    # Identidade da plataforma
│   ├── site/     # Seções da apresentação pública
│   └── ui/       # Componentes visuais reutilizáveis
├── config/       # Configurações da marca
├── domain/       # Conceitos e situações do negócio
├── layouts/      # Estruturas compartilhadas de páginas
├── lib/          # Utilitários e hooks
└── pages/        # Páginas da aplicação
```

### Como executar

Pré-requisitos:

- Node.js 24 LTS
- Git

Clone o repositório:

```bash
git clone https://github.com/paulor007/pedimova.git
cd pedimova/frontend
```

Instale as dependências:

```bash
npm ci
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação poderá ser acessada em:

`http://localhost:5173`

### Scripts disponíveis

| Comando                | Finalidade                                      |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Inicia o servidor de desenvolvimento            |
| `npm run build`        | Verifica os tipos e gera a versão de produção   |
| `npm run preview`      | Executa a prévia da versão de produção          |
| `npm run lint`         | Analisa o código com ESLint                     |
| `npm run format`       | Formata o projeto com Prettier                  |
| `npm run format:check` | Verifica a formatação sem modificar os arquivos |

### Sobre o nome

**Pedimova** é o nome comercial escolhido para a plataforma.

O projeto utilizou inicialmente o nome técnico provisório **OrderFlow**, que ainda aparece em documentos de planejamento e no histórico de desenvolvimento.

---

## Autor

Paulo Roberto Lavarini de Oliveira

GitHub: [github.com/paulor007](https://github.com/paulor007)
