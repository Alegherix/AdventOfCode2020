## Problem

Vi ska hjälpa fixa upp startsekvensen på ett gameboy som är fast i en infinite loop.
Boot koden representeras som en text fil med en instruktion per rad.
Varje instruktion består av en operation och ett argument.

acc - ökar en global variabel, accumuluator med argumentet som anges. Efter en acc instruktion så hoppar man vidare till direkt nästkommande.
jmp - Hoppar till en ny instruktion relativt ifrån sig själv, operation att hoppa till beror på argumentet, där 1+ är direkt nästkommand, +2 motsvarar att man hoppar över 1 nästkommande etc, -20 betyder att instruktionen 20 rader ovanför exekveras.
nop -> No OPeration, instruktionen direkt under kommer exekveras istället.

### Lösning

1. Spara varje rad som ett eget element i en array
2. Spara varje besökt index i en array, om vi har besökt detta index innan, avbryt loop och printa acc
