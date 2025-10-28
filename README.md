# 📚 Meu App Simulado

Um aplicativo React Native desenvolvido com Expo para simulação de provas e exames, com sistema de autenticação, temas personalizáveis e armazenamento de resultados.

## ✨ Funcionalidades

- 🔐 **Autenticação Firebase** - Login e registro de usuários
- 📝 **Simulados Completos** - Sistema completo de questões com timer
- 📊 **Dashboard Interativo** - Estatísticas e acompanhamento de progresso
- 🎨 **Temas Claro/Escuro** - Interface adaptável com persistência de preferências
- 💾 **Armazenamento Cloud** - Resultados salvos no Firebase Firestore
- 📱 **Design Responsivo** - Interface otimizada para diferentes tamanhos de tela
- ⏱️ **Timer Inteligente** - Controle de tempo durante os simulados
- 📈 **Histórico Completo** - Visualização de todos os simulados realizados

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo Router** - Navegação baseada em arquivos
- **Firebase Authentication** - Sistema de autenticação
- **Firebase Firestore** - Banco de dados NoSQL
- **Zustand** - Gerenciamento de estado
- **AsyncStorage** - Armazenamento local
- **NativeWind** - Estilização com Tailwind CSS
- **TypeScript** - Tipagem estática

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Conta no Firebase

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/meu-app-simulado.git
   cd meu-app-simulado
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o Firebase**
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - Ative Authentication (Email/Password)
   - Ative Firestore Database
   - Copie as credenciais do projeto

4. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```
   
   Edite o arquivo `.env` com suas credenciais do Firebase:
   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=sua_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.firebasestorage.app
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=seu_app_id
   ```

5. **Execute o projeto**
   ```bash
   npx expo start
   ```

## 📱 Como Usar

### Login Temporário (Para Testes)
- **Email**: admin123@test.com
- **Senha**: 123

### Funcionalidades Principais

1. **Dashboard** - Visualize suas estatísticas e últimos simulados
2. **Simulados** - Escolha entre diferentes tipos de simulados
3. **Resultados** - Acompanhe seu histórico completo
4. **Configurações** - Personalize tema e configurações da conta

## 🏗️ Estrutura do Projeto

```
meu-app-simulado/
├── app/                    # Rotas da aplicação (Expo Router)
│   ├── (dashboard)/        # Área autenticada
│   │   ├── index.tsx       # Dashboard principal
│   │   ├── simulados/      # Sistema de simulados
│   │   ├── resultados.tsx  # Histórico de resultados
│   │   └── configuracoes.tsx # Configurações
│   ├── login.tsx           # Tela de login
│   └── register.tsx        # Tela de registro
├── components/             # Componentes reutilizáveis
├── contexts/              # Contextos React (Auth, Theme)
├── services/              # Serviços (Firebase, Firestore)
├── data/                  # Dados dos simulados
├── types/                 # Definições TypeScript
└── store/                 # Gerenciamento de estado (Zustand)
```

## 🎯 Funcionalidades Detalhadas

### Sistema de Simulados
- Navegação entre questões
- Marcação de respostas
- Timer com contagem regressiva
- Cálculo automático de pontuação
- Salvamento de resultados

### Dashboard Inteligente
- Estatísticas gerais (média, aprovações, melhor nota)
- Últimos simulados realizados
- Estatísticas por módulo
- Interface responsiva

### Sistema de Temas
- Tema claro e escuro
- Persistência de preferências
- Cores adaptáveis em toda a aplicação

## 🔒 Segurança

- Autenticação segura via Firebase
- Validação de dados no frontend
- Proteção de rotas autenticadas
- Variáveis de ambiente protegidas

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📞 Contato

Seu Nome - [seu-email@exemplo.com](mailto:seu-email@exemplo.com)

Link do Projeto: [https://github.com/seu-usuario/meu-app-simulado](https://github.com/seu-usuario/meu-app-simulado)

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!