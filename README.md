# Northbound cinematic travel site

## Core behaviour
- Existing watercolor layered reference style is retained.
- Hawa Mahal is not used.
- Green Valley -> Rishikesh is a normal pinned coupled section: backgrounds change vertically.
- Bike section uses Green Valley as one fixed background stage. Only the bike and story cards move with scroll.
- Ladakh -> Chandratal is another normal coupled section.
- SUV section uses Ladakh mountain as one fixed background stage. Only the SUV and story cards move with scroll.
- Clouds and birds animate independently of scroll.
- Leaves fall continuously in green scenes.
- Small snow particles appear in high-altitude scenes.
- Mobile uses the supplied phone artwork variants.
- Hero/contact imagery can be replaced from settings later.

## Run locally
Open `index.html` directly, or serve this folder with any simple static server.

## Settings
Open `settings.html`.
The demo persists content to browser localStorage and supports JSON export/import.
For production, move these fields into Laravel/Filament and render the values server-side.
