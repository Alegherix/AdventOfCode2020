## Problem

Vi har en lista av lösenord
Corporate policy när lösenordet sattes

Varje line ger policyn, sedan lösenordet.
Dvs

restriktion: Inclusive

Occurance : sträng
(n - bokstav) : lösenord

Solution:

1. Läs in hela texten, och skapa en array av varje given rad.
2. Splitta upp arrayen till, MinAllowed, MaxAllowed, KeyNumber, SearchString
3. Loop
