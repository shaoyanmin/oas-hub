# Folder Structure

Sample:

```
src/
├── atoms/              # Jotai atoms
│   ├── userAtom.ts
│   ├── themeAtom.ts
│   └── index.ts       # Export all atoms
│
├── components/         # Reusable components
│   ├── common/        # Shared components
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Layout/
│   └── features/      # Feature-specific components
│       ├── Auth/
│       └── Dashboard/
│
├── pages/             # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Login.tsx
│   └── Dashboard.tsx
│
├── routes/            # Router configuration
│   ├── PrivateRoute.tsx
│   └── index.tsx
│
├── hooks/             # Custom hooks
│   ├── useAuth.ts
│   └── useTheme.ts
│
├── services/          # API services
│   ├── api.ts
│   └── auth.ts
│
├── utils/             # Utility functions
│   ├── constants.ts
│   └── helpers.ts
│
├── styles/            # Global styles
│   ├── global.css
│   └── variables.css
│
├── types/             # TypeScript types/interfaces
│   └── index.ts
│
├── App.tsx
└── main.tsx
```


Key points about this structure:

1. `atoms/`: Contains all Jotai atoms for state management
2. `components/`: Split into common (reusable) and feature-specific components
3. `pages/`: Contains main page components
4. `routes/`: Router configuration and route-related components
5. `hooks/`: Custom React hooks
6. `services/`: API and external service integrations
7. `utils/`: Helper functions and constants
8. `styles/`: Global styles and CSS variables
9. `types/`: TypeScript type definitions

Some folders don't exist yet, but they will be created as needed.
