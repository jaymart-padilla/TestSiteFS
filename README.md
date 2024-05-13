# TestSiteFS

## Setup ⚙️

### 1. Start up servers:

#### Frontend:

```bash
cd frontend && npm install && npm run dev
```

#### Backend (on the other terminal):

-   Start up Apache & MySQL server
-   Create a new db instance with the name `test_site_fs`

```bash
cd backend && composer install && php yii migrate && php yii fixture/load User && php yii fixture/load Blog && php yii serve
```

### 2. Run the frontend port in your browser

-   Default port: `http://localhost:5173/`

## Users 🧍‍♂️

Admin:

-   Username: `admin`
-   Email: `admin@example.com`
-   Password: `123123123`

User:

-   Username: `user`
-   Email: `user@example.com`
-   Password: `123123123`
