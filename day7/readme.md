## Problem

Vi har regler som säger att viss baggage måste innehålla viss annan baggage.

### Lösningsförslag

Tankar: Kanske något rekursivt?

1. Skapa en array av alla påsar
2. Ta reda på alla påsar som innehåller en shiny gold direkt, för varje påse som gör de, ta reda på vilken annan bag som innehåller denna, lägg till detta index till en ny array, Tänk recursion ned i ett träd till ett base case. Slutligen när ingen innehåller denna, så hoppar vi vidare till nästa itteration.

## Alt

1. skapa en array av alla påsar
2. Spara namnet på alla påsar som kan innehålla shiny gold,
3.
