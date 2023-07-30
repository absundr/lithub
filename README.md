# Motivation
LitHub is a GitHub client built using Vite, React, Typescript and Chakra UI. As of now, it only supports basic Github functionality and makes use of the public API. 

The project is deployed on vercel and can be accessed [here](https://lithub-git-main-abhijithsundr.vercel.app/).

# Getting started

1. Clone the repository
2. Install dependencies `yarn install`
3. Add a .env file to the root of the project. This is where you will store your Github API key to access the public API.
4. Follow the instructions over at the GitHub [docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic) to create a PAT for yourself.
Make sure you save the token, you will only see it once and will require it in the next step.
5. In the `.env` file you created, add the following line:
```
VITE_GITHUB_API_KEY={REPLACE_WITH_YOUR_GITHUB_API_KEY}
```
6. Start the app `yarn start`
7. Your app should be served on `http://localhost:5173/`

# Final thoughts
Thanks to Github for their public APIs that made this possible. I had a lot of fun working on this project over a few weeks. I might continue adding more features in the future when I've got the time. 
