## Problemställning:

Vi får en input map antagligen i form av en sträng.
Vi rör oss 3 till höger och sedan 1 nedåt,
Om det givna elementet vid indexen motsvarar "#" har vi stött på ett träd, annars "." räkna antalet träd.

### Lösning

Läs in textfilen som en array och varje element motsvarar en sträng bestående av raden.

Iterera arrayen, och för varje iteration, plocka ut character vid iteration \*3 +1

### Part Two

step, down
1, 1 -> 77
3, 1 -> 218
5, 1 -> 65
7, 1 -> 82
1, 2 -> 43
