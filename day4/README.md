## Problem

Vi får 8 st K:V par, där ena paret, cid är optional för true.
Varje passport separeras med Blank Lines

### Tänkbar Lösning

1. Läs in filen och splitta vid varje blank line så varje pasport blir ett eget index
2. Replace alla newlines till spaces för att behandla alla element på samma sätt.
3. Splitta sedan varje elem vid space för att få en array med alla K:V par.
4. Checka varje index, om arrayens längd === 8 || (arrayens längd == 7 && cid saknas) returnera true
