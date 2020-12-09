## Problem

XMAS skickar ut en inledning på 25 number, och direkt efter det så kommer varje nummer att vara summan av någon av de 25stycken föregående nummrena. t.ex, så kan vi ha 1-25. 26-49 är då valid som efterkommande nummer, eftersom 24 + 25 = 49.
Man får heller inte använda 2 av samma nummer.
Man ska alltså sedan kolla vilket nummer som INTE är ett resultat av någon av de 25 förekommande nummrena.
då skippar man även index [0] om man har de som en array, när man stoppar in det nya så den aldrig överstiger en längd av 25.

### Lösning

1. Läs in varje nummer som en int i en array
2. Loopa igenom arrayen,med en inre och en yttre loop, och addera ihop värdena, jämför med en referens(det nya värdet)
3. Om vi får referensen så bryt ut ur loopen och fortsätt till nästa värde i arrayen.
4. Om vi inte får referensen så har vi hittat svaret.

#### Del 2

Här ska vi istället hitta uppsättningen av random set av nummer fortfarande efterkommande, som bildar Fråga 1's svar,
därefter lägg ihop högsta och minsta värdet i denna uppsättning, för att få svaret.
