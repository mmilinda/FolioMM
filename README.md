# 🚀 Milinda Mendy — Portfolio & Dashboard Admin Full Stack

Bienvenue sur le dépôt du portfolio professionnel et de la console d'administration de **Milinda Mendy** (Développeuse Full Stack & DevOps).

Ce projet est une application web moderne, hautement réactive et dynamique, interconnectée en temps réel avec une API REST Laravel et une base de données SQLite.

---

## 🌟 Sommaire & Architecture

```
devops-portfolio/
├── src/                    # Frontend React 19 + Vite + Tailwind CSS
│   ├── admin/              # Console Administrateur (Dashboard, Projets, Médias, Settings)
│   ├── components/         # Composants UI réutilisables (Hero, Navbar, Impact, About...)
│   ├── context/            # SiteDataContext & AuthContext (Synchronisation API & State)
│   ├── pages/              # Pages publiques (Home, Projects, Blog, Contact...)
│   └── services/           # Configuration Axios API REST & Auth
├── backend/                # Backend Laravel (API REST & Sanctum Auth)
│   ├── app/                # Modèles Eloquent & Contrôleurs (Profile, Project, Upload...)
│   ├── database/           # Migrations & Seeders SQLite
│   ├── routes/             # Routes API publiques & administratives
│   └── storage/            # Stockage physique des médias (Photos, Avatars, CV PDF)
└── public/                 # Assets statiques & PWA Manifest
```

---

## ✨ Fonctionnalités Clés

### 💻 Site Public
- **Section Hero Dynamique** : Présentation interactive, machine à écrire des rôles, photo de profil et bouton de téléchargement du CV (PDF).
- **Projets Vitrine & Filtres** : Exploration des projets avec détails complets, schémas d'architecture et redirections vers les démos live & dépôts GitHub.
- **Impact Tangible** : Présentation interactive des projets par domaine (Agriculture, Sécurité, Identité, Mobilité, Entreprises) avec liens directs vers chaque projet.
- **Blog & Articles** : Publication et lecture d'articles techniques avec mots-clés et temps de lecture.
- **Messagerie de Contact & PWA** : Formulaire de contact enregistrant les messages directement en BDD avec notifications PWA.
- **Internationalisation (FR/EN)** & **Mode Sombre / Clair**.

### ⚙️ Console Administrateur (Dashboard)
- **Sécurité & Auth Sanctum** : Protection des routes frontend (`ProtectedRoute`) et authentification par jetons API Sanctum.
- **Gestion des Médias (Photo, Avatar, CV)** : Téléversement direct depuis `/admin/settings` vers le stockage backend.
- **Gestion des Projets & Articles** : Formulaires d'ajout, d'édition et de suppression avec téléversement d'images et schémas.
- **Gestion des Services, Compétences & Timeline** : Contrôle et réordonnancement des cartes de prestations et frise chronologique.
- **Boîte de Réception Messages** : Lecture, filtrage, marquage comme lu et réponse directe aux messages des visiteurs.
- **Visibilité des Sections** : Activation ou masquage en 1 clic de chaque section sur la page d'accueil.

---

## 🛠️ Stack Technique

### Frontend
- **React 19** & **Vite v8**
- **Tailwind CSS v4**
- **Framer Motion** (Animations fluides)
- **Axios** (Intercepteur de jeton Bearer & FormData)
- **i18next** (Multilingue FR/EN)

### Backend
- **Laravel (PHP 8.2+)**
- **Laravel Sanctum** (Authentification API REST)
- **SQLite Database**
- **Storage Link** (Gestion unifiée des uploads)

---

## 🚀 Installation & Démarrage Local

### 1. Cloner le projet
```bash
git clone https://github.com/mmilinda/FolioMM.git
cd devops-portfolio
```

### 2. Démarrer le Backend Laravel
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate

# Exécuter les migrations et charger les données initiales
php artisan migrate:fresh --seed

# Créer le lien de stockage pour les médias (Photos, CV)
php artisan storage:link

# Lancer le serveur API Laravel (port 8000)
php artisan serve --port=8000
```

### 3. Démarrer le Frontend React
```bash
# Dans la racine du projet
npm install
npm run dev
```

Accédez ensuite à :
- **Site Public** : `http://localhost:5173`
- **Dashboard Admin** : `http://localhost:5173/admin/login`

---

## 📄 Licence & Droits

© 2026 **Milinda Mendy**. Tous droits réservés.
