/*
Alappélda class-ra 

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

Creating an instance of the Person class

let person1 = new Person("John", 30);
console.log(person1.name); // Output: John
console.log(person1.age);  // Output: 30

1. We define a class called Person.

2. Inside the constructor, we specify parameters name and age, and then assign them to the respective properties this.name and this.age.

3. We create an instance of the Person class using the new keyword and pass values for name and age.

4. Finally, we can access the properties name and age of the created object (person1) and log them to the console.

Ennek van egy másik változata is, amikor nem a constructor-ben határozzuk meg a paraméterek, de itt viszont értéket kell nekik adni!!!
-> 
class Person {
  name = "";
  age = 0;

  constructor() {
    ->  You can initialize them here if needed
    -> this.name = "DefaultName";
    -> this.age = 0;
  }
}
*************************************************************************************************************************************
A fetch-es dolog 

fetch('https://api.example.com/data')
  .then(response => {
    if (response.ok) {
      // Response was successful
      return response.json(); // assuming response is JSON
    } else {
      // Handle unsuccessful response
      throw new Error('Network response was not ok.');
    }
  })
  .then(data => {
    // Use the data from the response
    console.log(data);
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });
********************************************************************************************************************************************
Location objektumnál mi a különbség a host és a hostname között () -> window.location

hostname:

This property of the location object (or URL object) contains only the hostname part of the URL.
It does not include the port number, if one is specified.
For example, if the URL is https://www.example.com:8080/path/to/page, the hostname would be "www.example.com".

host:

This property contains the full host name and port number of the URL.
If the port number is specified in the URL, it will be included in this property.
For example, for the URL https://www.example.com:8080/path/to/page, the host would be "www.example.com:8080".

Tehát a host-ban benne van a port, hostname-ben viszont nincsen!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Szintén ennek az objektumnak van két metódusa 
replace()
reload()
Mire jók ezek 
->
reload() is used to reload the current page, optionally bypassing the cache.
replace() is used to replace the current URL with a new one, without adding to the browser's history.

1. reload

The reload() method is used to reload the current URL.
If you call reload() without any arguments, it will reload the current page from the server.
If you pass true as an argument to reload(), it will force the browser to reload the page from the server, ignoring the cache.

// Reload the current page
window.location.reload();
// Reload the current page, ignoring the cache
window.location.reload(true);

2. replace

The replace() method is used to replace the current URL with a new one, without adding a new entry to the browser's history.
It's useful for redirecting users to a new page without allowing them to navigate back 
to the previous page using the browser's back button.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Replace the current URL with a new one
window.location.replace("https://www.example.com/new-page");
******************************************************************************************************************************************
Mi az a cache


In computing, a cache is a hardware or software component that stores data temporarily to reduce access time, 
latency, and bandwidth consumption. 

Caches are used in various computing systems, including CPUs, web browsers, and databases, 
to improve performance by serving frequently accessed data quickly.!!!!!!!!!!!!!!!!!!!!!!!!!!

Web Browser Cache:

Web browsers maintain a cache to store web pages, images, scripts, and other resources locally on the user's device. 
When a user revisits a website, the browser can load cached resources instead of fetching them again from the server, 
which improves page loading times and reduces network traffic.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Caches work on the principle of locality, exploiting the tendency of programs and users to access the same data repeatedly 
or to access nearby data in a short period. By storing frequently accessed data closer to the consumer, 
caches can significantly improve system performance and responsiveness.
********************************************************************************************************************************************
browser history és a replace 
Ha azt akarjuk pl. egy form kitöltésénél, amikor már be lett küldve, hogy a user ne oda menjen, vissza hanem a főoldalra 

When you use the replace() method to replace the current URL with a new one, 
it does not add a new entry to the browser's history stack. 
Instead, it replaces the current history entry with the new URL. 
This means that when the user navigates back using the browser's back button after a call to replace(), 
they won't go back to the previous URL. Instead, they will skip over the replaced URL and go to the URL before it.

// Replace the current URL with a new one
window.location.replace("https://www.example.com/new-page");

In this case, if the user were to navigate back using the browser's back button 
after being redirected to "https://www.example.com/new-page", they would not return to the previous page; 
instead, they would go back to the page that was visited before the original page. 

This behavior is useful for certain types of redirects, 
such as when you don't want users to navigate back to a form submission page or a redirect page.!!!!!!!!!!!!!!!!!!!!!!!!!!!
*****************************************************************************************************************************************
Fontos!!!!!!!!!!!!!!!!!!!!!!
Hogyan lehet összeállítani egy url-t, location object
->
location.protocol: This property returns the scheme part of the URL (e.g., http: or https:).
location.hostname: This property returns the hostname part of the URL (e.g., www.example.com).
location.port: This property returns the port number of the URL (e.g., 80, 443, etc.).
location.pathname: This property returns the path part of the URL (e.g., /path/to/resource).
location.search: This property returns the query parameters part of the URL (e.g., ?key1=value1&key2=value2).
location.hash: This property returns the fragment identifier part of the URL (e.g., #section1).

const url = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "")
+ location.pathname + location.search + location.hash;
console.log(url);
**************************************************************************************************************************************
Location searchből csinálunk egy objektumot
-> 
// Get the query string from the URL
const queryString = window.location.search;

// Function to parse the query string and create an object
function parseQueryString(queryString) {
  // Removing the '?' character at the beginning
  queryString = queryString.substring(1);

  // Splitting the query string into an array of key-value pairs
  const queryParams = queryString.split('&');

  // Initializing an empty object to store the parsed parameters
  const params = {};

  // Iterating through each key-value pair
  queryParams.forEach(param => {
    // Splitting the key-value pair into key and value
    const parts = param.split('=');
    // Decoding URI component to handle special characters correctly
    const key = decodeURIComponent(parts[0]);
    const value = decodeURIComponent(parts[1]);

    // Assigning the key-value pair to the object
    params[key] = value;
  });

  // Returning the object containing parsed parameters
  return params;
}

// Using the function to parse the query string
const parsedParams = parseQueryString(queryString);

// Accessing the id parameter from the parsed object
const id = parsedParams['id'];

// Logging the id
console.log({id}); // Output: {id: "1"}
*****************************************************************************************************************************************
case "user.html":
    const id = urlObj.query.id;
    users.getUsers(id);
    break;

const id = urlObj.query.id;: 
In this line, the value of id is being extracted from the urlObj.query.id. 
This suggests that urlObj is an object that contains a property called query, 
which is expected to be an object containing URL query parameters. 
Assuming urlObj is correctly defined and populated, urlObj.query.id represents the value of the id query parameter in the URL.

users.getUsers(id);: After extracting the id, 
it's passed as an argument to the getUsers() function of the users object. T
his suggests that getUsers() function expects an id parameter, presumably to retrieve user data associated with that id.

In summary, when the path of the URL is "user.html", this code block extracts the id from the URL's query parameters 
and passes it to the getUsers() function to retrieve user data associated with that id.





*/