# Kansha

Kansha is a workplace recognition app. Employees send each other thank-you messages and badges, react and comment on them in a live feed, and see the badges they've earned on their profile.

**Try it live:** https://kansha-fe-production.up.railway.app/

This repo is the **frontend** (React, Redux, Sass). It needs the **[backend API](https://github.com/kansha-rewards/kansha-be)** running, and an Auth0 account for login.

## Run it locally

You need Node 22 and Yarn.

1. **Start the API first.** Follow the [backend README](https://github.com/kansha-rewards/kansha-be#run-it-locally). It runs on http://localhost:8000.
2. **Set up Auth0** (one time, see [below](#set-up-auth0)).
3. **Install and configure:**

   ```sh
   nvm use
   yarn install
   cp .env.example .env.local
   ```

   Then fill in `.env.local`:

   | Variable | What to put |
   |---|---|
   | `REACT_APP_BASE_URL` | The API URL, `http://localhost:8000` (no trailing slash) |
   | `REACT_APP_AUTH_DOMAIN` | Your Auth0 domain, e.g. `my-tenant.us.auth0.com` (no `https://`) |
   | `REACT_APP_CLIENT_ID` | Your Auth0 application's Client ID |
   | `REACT_APP_REDIRECT_URI_BASE` | This app's URL, `http://localhost:3000` |

4. **Start it:**

   ```sh
   yarn dev
   ```

   Open http://localhost:3000 and click **Login**. New users go through onboarding to create their organization.

## Set up Auth0

The frontend and backend share one Auth0 application.

1. In the [Auth0 dashboard](https://manage.auth0.com), go to **Applications → Create Application** and choose **Single Page Application**.
2. On its **Settings** tab, copy the **Domain** and **Client ID**.
3. Add your app's URLs to all three of these fields, separated by commas:
   - **Allowed Callback URLs**
   - **Allowed Logout URLs**
   - **Allowed Web Origins**

   For example: `http://localhost:3000, https://kansha-fe-production.up.railway.app`

4. Save.

## Deploy to Railway

1. In your Railway project, add a service from this GitHub repo. No config file is needed: Railway runs `yarn build`, then `yarn start`.
2. Add the four variables from the table above, using your deployed URLs.
3. Under **Settings → Networking**, generate a public domain.
4. Add that domain to the three Auth0 URL fields.

> The `REACT_APP_*` values are baked into the app **when it builds**. After changing one, redeploy.

## Commands

| Command | What it does |
|---|---|
| `yarn dev` | Starts the dev server on http://localhost:3000 |
| `yarn build` | Builds the production app into `build/` |
| `yarn start` | Serves `build/` (used on Railway) |
| `yarn test` | Runs the tests |

Some older tests are out of date. CI runs them but doesn't block merges on them yet.

## Troubleshooting

**A red banner says "We couldn't sign you in" after logging in.** The API rejected your login. The banner shows the API's reason. Most often the backend's Auth0 settings don't match this app's. See the [backend troubleshooting](https://github.com/kansha-rewards/kansha-be#troubleshooting).

**Auth0 shows "Callback URL mismatch".** Add this app's URL to **Allowed Callback URLs** in Auth0 (step 3 of [Set up Auth0](#set-up-auth0)).

**Changed a variable on Railway but nothing changed.** Redeploy the frontend. The values are only read at build time.

## Where things are

- `src/components/`: pages and UI pieces (`Landing`, `Onboarding`, `Profile`, `Feed`, ...)
- `src/store/`: Redux actions and reducers
- `src/utils/auth.js`: the Auth0 login code
- `src/SCSS/`: styles
- `public/badges/`, `public/images/`: badge art and the default avatar

## Contributing

Open an issue or a pull request. Use [Conventional Commits](https://www.conventionalcommits.org) for commit messages and PR titles (e.g. `fix(auth): ...`). Please follow the [code of conduct](./CODE_OF_CONDUCT.md).

## Credits

Kansha was first built at Lambda School Labs.

- **Labs 21:** Kevin Smith, Andrew Ackerman, Emily Bruner, Anna Franceschi, Aaron Gillies, Andrew Maddocks, Vickie Nelson, Joscelyn Stancek, Vanessa Tellez
- **Labs 19:** Cori Paris, Sydney Crumley, Andrew Goenner, Gustavo Isturiz, Ty Lippe, Ahmar Mansoor, Matt Masters, Gizella Ortiz, Leslie Rodriguez, Nicholas Truson

Licensed under the MIT License.
