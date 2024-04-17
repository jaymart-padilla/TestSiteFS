# TestSiteFS

## Setup ⚙️

### 1. Start up both servers:

#### Frontend:

```bash
cd frontend && npm install && npm run dev
```

#### Backend (on the other terminal):

-   Start up Apache & MySQL server
-   Create a new db instance with the name `test_site_fs`

```bash
cd backend && composer install && php yii migrate && php yii fixture/load User && php yii serve
```

### 2. Run the frontend port in your browser (default port: ```http://localhost:5173/```)
