### Problem

Vi ska undersöka hur folk lämnar för att undersöka den bästa platsen att sitta på, igenom
att kolla vilka platser folk lämnar eller tar.

En layout kan ha:
. -> motsvarar ett golv
L -> Ett tomt säte
\# -> Ett upptaget säte

Dem som ska sätta sig följer alltid en uppsättning regler, där ALLA beslut alltid baseras påp
antalet upptagna säten som lligger intil ett givet säte. (DIrekt, Upp, Direkt ned, vänster, Höger eller Diagonalt från sätet)

- Om ett säte är tomt(L) och det inte finns några upptagna på vardera sida om den, så blir den upptagen
- Om ett säte är upptaget och 4 eller fler intillägande säten är upptagna så blir de tomt
- Annars så ändras ej staten
- . ändras aldrig, sätten rör sig ej, och ingen sitter på golvet.

### Tänkbar lösnings

1. Läs in varje rad som ett element
2. Ha en while loop
3. Loopa över varje rad och splitta upp arrayen till characters.
   3.5) Skapa en kopia av arrayen som uppdateras och i slutet av while loopen, uppdatera den ursprungliga med alla nya förändringar
4. Undersök (Sätet borde frigöras):
   Rad[rowIndex] [characterIndex-1], Rad[rowIndex] [characterIndex+1] -> horisontella
   Rad[index-1] [characterIndex-1], Rad[rowIndex-1] [characterIndex] , Rad[rowIndex-1] [characterIndex+1] -> Föregående Rad
   Rad[index+1] [characterIndex-1], Rad[rowIndex+1] [characterIndex] , Rad[rowIndex+1] [characterIndex+1] -> Nästkommande rad

5) Uppdatera en counter om platsen är upptagen, om >=4 så ersätt denna platsen med L
6) Upprepa sedan samma sak och om counter === 0, Dvs inga närliggande upptagna så gör platsen upptagen
7) Loopa tills vi inte får mer förändringar
