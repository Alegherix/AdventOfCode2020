## Problem

Vi har en form med 26stycken Yes/No frågor, markerade a-z.
Det vi ska göra är att identifiera frågorna för vilket någon i min grupp
svarat ja på, dock är det bara jag i gruppen.

Personen intill frågor om hjälp.
För varje person i deras grupp så skriver vi ned frågorna för vilket de svarar ja.
t.ex.

avcx
abcy
abcz

Ovan leder till svar ja på.
a, b,c,y,x,z -> 6st ja.

### Utformning

Varje grups svar separeras med en \n.
Varje persons svar ges på en enskild rad.

### Lösning

1. Läs in varje grupp för sig till en array där varje grupp är ett enskilt index
2. För varje grupp, splitta varje index till enskild character,
3. Skapa en array bestående av alla unika element i denna gruppen
4. Räkna ihop varje arrays längd.
