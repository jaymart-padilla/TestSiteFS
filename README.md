# TestSiteFS

## Setup ⚙️
### Start up both servers:

#### Frontend:
```bash
cd frontend && npm run dev
```
#### Backend (on the other terminal):
- Start up Apache & MySQL server
- Create a new db instance with the name ```test_site_fs```
```bash
cd backend && composer install && php yii serve
```
