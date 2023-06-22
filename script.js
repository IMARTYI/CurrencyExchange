
let apiCode; // Api Variable



function getExchangeRate (){ // Function to load api and get current exchange rates
   
   const url = 'https://api.exchangerate.host/symbols ';
   fetch(url)
      .then(response => response.json())
      .then(data =>{
         
         //console.log(data);
         apiCode= data.symbols; // API variable
       
         displayOptions(apiCode);

      })
      .catch(function (error){
         console.error('Something went wrong');
      }
      );
}

function displayOptions(OptionElements){ // function that will take in an arguement and populate the html select element with currency changes..

   const from_curr =  document.getElementById('from-curr'); // grabs html element the user enters
   const to_curr = document.getElementById('to-curr'); // grabs the html element the user enters 

   for (const currency in OptionElements){ // for each loop to 

      const from_options = document.createElement('option'); // creates options within the select element from the api
      const to_options =document.createElement('option');

      from_options.value = currency;
      from_options.textContent = currency;

      to_options.value= currency;
      to_options.textContent= currency;
      from_curr.appendChild(from_options);
      to_curr.appendChild(to_options);    
   }
}

function getCurrencyRate (from, to){ // NEED TO WORK ON THIS FUNCTION TO ENSURE I AM GRABBING THE CORRECT EXCHANGE RATE !

   const exhchangeURL=new URL(
      'https://api.exchangerate.host/convert'
   );

   exhchangeURL.searchParams.append('from',from); // Need to review understanding of this 
   exhchangeURL.searchParams.append('to',to);

   return fetch(exhchangeURL)

   .then(response => response.json())
   .then(data => data.result)
   .catch(function error(){
      console.error(" Event Failed !");
      return null;
   });
}

async function convert(){ 

   const fromCurrency = document.getElementById('from-curr');
   const toCurrency = document.getElementById('to-curr');
   const user_result= document.getElementById('result');

   const exchangeRate= await getCurrencyRate(fromCurrency.value,toCurrency.value);

   const amountValue = document.getElementById('client-input'); 

   const numbValue = Number(amountValue.value);   

   const temp= Number(exchangeRate).toFixed(2);

   const finalResult =  await Number(numbValue*temp).toFixed(2); // Doing tha math 

   console.log(temp);

   console.log('Coversion:  ' +  finalResult);

   user_result.value=  finalResult; // prints the result to the html element 

}









