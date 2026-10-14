# Local Development

## Default address

Start the web development server with:

`npm run dev:web`

The default Vite address is:

`http://localhost:5173`

## Friendly local hostname

The project reserves this developer-friendly hostname:

`http://d20-dungeon.local:5173`

A `.local` hostname is free and does not require purchasing a public domain. It is a local development alias, not a public Internet address.

### Hosts-file mapping

To resolve the name directly on a development machine, map it to loopback:

```
127.0.0.1 d20-dungeon.local
::1 d20-dungeon.local
```

Then configure the development server to accept the hostname if the local Vite installation requires explicit host binding.

## Production / GitHub Pages

GitHub Pages does not use the local hostname. The Pages build uses the static browser backend and IndexedDB, so the deployed frontend does not require a localhost API or MySQL connection.

The local server edition remains available separately for Express + MySQL development.
