# ⚙️ Backend API REST Laravel — Portfolio Milinda Mendy

API REST Backend construite sous **Laravel** alimentant le portfolio professionnel et le Dashboard Admin.

---

## 🛠️ Modèles Eloquent & Tables SQL (`SQLite`)

- `Profile` : Informations personnelles, photo de profil, avatar, lien du document CV (PDF), bio, réseaux sociaux.
- `Project` : Projets vitrine, descriptions, technologies, schémas d'architecture, liens démo & GitHub, statut.
- `Article` : Articles du blog, extraits, contenu markdown, images et métriques (vues, likes).
- `Service` : Prestations offertes, icônes, tags et styles.
- `Skill` : Catégories et liste des compétences techniques.
- `Timeline` : Parcours professionnel et certifications académiques.
- `ImpactMetric` & `Testimonial` : Indicateurs chiffrés d'impact et avis clients.
- `Message` : Messages soumis via le formulaire de contact.
- `SiteSetting` : Configuration globale et gestion de la visibilité des sections.

---

## 🔗 Endpoints API Principal

### 🌐 Routes Publiques
- `GET /api/profile` : Informations du profil public.
- `GET /api/projects` & `GET /api/projects/{slug}` : Liste et détails des projets.
- `GET /api/articles` & `GET /api/articles/{slug}` : Liste et détails des articles du blog.
- `GET /api/services` : Liste des services.
- `GET /api/skills` : Liste des compétences.
- `GET /api/timeline` : Frise chronologique du parcours.
- `GET /api/impact` : Métriques et témoignages.
- `GET /api/settings` : Réglages de visibilité des sections.
- `POST /api/contact` : Soumission de message par un visiteur.
- `POST /api/login` : Connexion administrateur.

### 🔒 Routes Protégées (`auth:sanctum`)
- `POST /api/logout` : Déconnexion administrateur.
- `POST /api/upload` : Téléversement de médias (Photo de profil, Avatar, Document CV PDF, Images).
- `POST/PUT /api/admin/profile` : Mise à jour des informations de profil.
- `POST/PUT /api/admin/settings` : Mise à jour de la visibilité des sections.
- `POST/PUT/DELETE /api/projects` : CRUD des projets.
- `POST/PUT/DELETE /api/articles` : CRUD des articles.
- `POST /api/admin/services/sync` : Synchronisation des services.
- `POST /api/admin/skills/sync` : Synchronisation des compétences.
- `POST /api/admin/timeline/sync` : Synchronisation du parcours.
- `POST /api/admin/impact/sync` : Synchronisation de l'impact & avis.
- `GET/PATCH/DELETE /api/admin/messages` : Consultation, filtrage et suppression de la boîte de réception.

---

## 🚀 Commande Utiles

```bash
# Lancer les migrations et recharger les données de test
php artisan migrate:fresh --seed

# Générer le lien de stockage des fichiers média
php artisan storage:link

# Démarrer le serveur API
php artisan serve --port=8000
```
