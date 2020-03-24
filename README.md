# User-verification-example
Simpel POC van hoe een user zijn account kan verifiëren

## Hoe werkt dit?
1: Open de .env_example file, en vul daar je gmail account gegevens in.  
   Hernoem hierna deze file naar .env    
2: Google vereist dat je een bepaalde setting in je account aan zet. Dit komt waarschijnlijk omdat deze app niet als vertrouwd geregistreerd staat bij Google.  
   Ga naar: https://myaccount.google.com/lesssecureapps  
   Je ziet dat je daar één optie kan aanvinken, doe dat. (Je kan deze setting later weer uit zetten)    
3: Run het project met: npm start    
4: Open postman en stuur de volgende POST request naar: localhost:3000/users/register  
   Met als body:  
   {  
	   "name": "Frans",  
	   "email": "<jouw_avans_naam>@avans.nl"  
   }  
   Mocht het zo zijn dat het authenticatie process gedenied wordt, dan kan dat zijn omdat je two-factor authentication heb aanstaan.  
   Als het mogelijk is moet je dat even uitzetten, en probeer het dan nog eens.    
5: Als het goed is krijg je nu een email naar het opgegeven emailadres van de aangemaakte user.    
6: Klik op de link in de email, en als het goed is wordt je dan doorverwezen naar een pagina die zegt dat de gebruiker geverifieerd is.    
