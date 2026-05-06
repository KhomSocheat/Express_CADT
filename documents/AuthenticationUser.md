## Authentication Flow

1. User login/register → backend (Express)
2. Backend returns JWT token
3. Vue stores token
4. If token valid → go dashboard
5. Each page fetch API with token
6. Logout → remove token

---

## Improved & Correct Flow (Professional Way)

🔐 Backend (Express + JWT)

1. User sends login/register request
2. Backend verifies user
3. Backend generates JWT token
4. Backend sends token to frontend

🖥️ Frontend (Vue.js)

1. Receive token
2. Store token (IMPORTANT: where?)

✅ Better: httpOnly cookie (secure)  
⚠️ Acceptable: localStorage (less secure)

3. After login:
   1. Save token
   2. Redirect to dashboard

### Diagram User Authentication Flow Backend with Frontend

```text
[ User ]
   |
   | Login/Register
   v
[ Vue Frontend ]
   |
   | POST /login
   v
[ Express Backend ]
   |
   | Validate User
   | Generate JWT
   v
[ Send Token ]
   |
   v
[ Vue Stores Token ]
   |
   | Redirect → Dashboard
   v
[ Dashboard Page ]
```

--- API FLOW ---

```text
[ Vue ]
   |
   | GET /api/data
   | Authorization: Bearer Token
   v
[ Express Middleware ]
   |
   | Verify Token
   v
[ Controller ]
   |
   v
[ Return Data ]
```

--- LOGOUT ---

```text
[ Vue ]
   |
   | Remove Token
   v
[ Redirect → Login ]
```