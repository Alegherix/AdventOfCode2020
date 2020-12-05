### Problem

Vi har tappat boardingkortet och ska hitta den lediga platsen
Vi ska därför scanna boarding kort med strukturen:

FBFBBFFRLR
F -> Front
B -> Back
L -> Left
R -> Right

Dem första 7 är
F || B
vilket ger exakt en av de 128 raderna på planet, 0-127
Man delar upp delar upp varje värde i ranges, Tänk en Binary search.

"Start by considering the whole range, rows 0 through 127.
F means to take the lower half, keeping rows 0 through 63.
B means to take the upper half, keeping rows 32 through 63.
F means to take the lower half, keeping rows 32 through 47.
B means to take the upper half, keeping rows 40 through 47.
B keeps rows 44 through 47.
F keeps rows 44 through 45.
The final F keeps the lower of the two, row 44."

De 3 sista Charactersen är 0-7
L -> R, Samma metod.

### LösningsFörslag

1. Skriv något liknande en binary search baserat på F | B, där F tar sänker higher limit, B ökar lower
2. Håll en counter för highest ID, Multiplicera Row med 8, och addera Kolumn,
