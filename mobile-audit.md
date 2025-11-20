# Mobile layout audit (<768px)

- Hero header text scales to ~61px at 768px because of `clamp(3rem, 8vw, 6rem)`, leaving headings oversized for mobile users. [styles.css lines 203-211]
- Section titles stay at a minimum of 2.5rem between 481px and 768px, making headings disproportionately large on small screens. [styles.css lines 257-265]
- Game cards keep 2rem padding and 1.8rem titles without mobile overrides, which crowds limited viewport space. [styles.css lines 411-449]
- Event cards keep 2rem padding with 2.5rem day numerals and 1.5rem titles, leading to oversized text and spacing on phones. [styles.css lines 539-590]
- Generic section padding remains 6rem vertically on mobile, producing large gaps between blocks. [styles.css lines 253-255]
- `.container` side padding (2rem) plus the game grid minimum width of 280px can exceed sub-360px viewports, risking horizontal overflow. [styles.css lines 36-44 and 404-407]
