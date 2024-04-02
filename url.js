/*
Csinálunk egy urlObj, amit majd export default-olunk is, mert itt csak megcsináljuk az adott oldalak url-jeit és majd 
importáljuk ezt a index.js-en!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

meghatározzuk ebben az objektumban, hogy mik szükségesek, ahhoz, hogy összeállítsunk egy url-t
és akkor a getBaseUrl függvényben ezt össze is rakjuk!!!!


const urlObj = {
    host: location.hostname,
    port: location.port,
    path: location.pathname,
    protocol: location.protocol,
    queryString: location.search,
    getBaseUrl() {
        return `${this.protocol}//${this.host}`;
    }

}

hozzáírtuk még a queryString-et is, ami majd kelleni fog az aloldalakon!!!!!!!
és csinálunk ide a const urlObj felé egy parseQueryString-et 
-> 
const parseQueryString = (queryString)=> {

};
ami bekéri a queryString-et -> pl. ?id=55&userName=sanyi99
egy ilyet bekér és látjuk, hogy az egyes paraméterek az & mentén vannak elválasztva!!!!!!!!!!!
1. meg a kérdőjelet az elejéről le kell majd szedni -> replace
2. csinálunk egy keyValuePairs-t, ahol a queryString-et split-elni fogjuk -> const keyValuePairs = queryString.split("&");
3. végigmegyünk egy for-val for(const pair of keyValuePairs)
4. csinálunk egy üres objektumot -> queryObject = {};
5. keyValue-nál pedig = mentén választjuk el a kulcsot az értéktől, mert ugye itt is úgy van -> id=55&userName=sanyi99
6. amit csináltunk üres objektumnak megadjuk kulcsként a keyValue[0]-át, értékként pedig a keyValue[1]-et
queryObj-nek a keyValue nulladik eleme lesz a kulcs (itt az elsőnél az lesz, hogy id) az egyenlő lesz a keyValue eggyel, ami jelen esetben 55 
(?id=55&userName=sanyi99)
7. return queryObj
->
const parseQueryString = (queryString)=> {
    queryString = queryString.replace("?", "");
    const keyValuePairs = queryString.split("&");
    const queryObject = {};

    for(const pair of keyValuePairs) {
        const keyValue = pair.split("=");
        queryObj[keyValue[0]] = keyValue[1];
    }

    return queryObj;

};
Ez nagyon fontos!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

queryString: location.search 
helyett pedig lesz -> 
query: parseQueryString(location.search)

const urlObj = {
    host: location.hostname,
    port: location.port,
    path: location.pathname,
    protocol: location.protocol,
    query: parseQueryString(location.search), 
    getBaseUrl() {
        return `${this.protocol}//${this.host}`;
    }
}

És ez azért jó nekünk mert ha megnézzük a console.log(urlObj)
    getBaseUrl: f getBaseUrl()
    host: "127.0.0.1"
    path: "/user.html"
    port: "5500"
    protocol: "http:"
    query: {id: '1'}
        id: "1"                     !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    [[Prototype]]: Object


    de ha viszont hozzácsatolunk bármit 
    ami volt 
    -> 
    127.0.0.1:5500/user.html?id=1
    ha hozzácsatolunk 
    ->
    127.0.0.1:5500/user.html?id=1&asdf=asdf

    Akkor már a query az így fog kinézni a urlObj-ben 
    ->
    query: {id: '1', asdf: 'asdf'}
        id: "1" 
        asdf: "asdf" 
        
ha pl. itt olyan karakereket használunk, ami nincsen benne az angol abc-ben, mondjuk, hogy géza akkor így fog megjelenni 
asdf: "g%C3A9za"
->
ez így nem lesz olvasható, azért mert a space-ket meg az étkezetes karakterek át fogja váltani url-encoded-ra!!!!!4
ennek karakterkódolási megfontolásai vannak, mert a space az nem minden karakterkódolásban space pl. a ! az %21 lesz 
de mi ezt vissza tudjuk kódolni  
decodeURI
->
A teljes URL-t fogja nekünk visszakódolni, tehát ezt az egészet
127.0.0.1.:5500/user.html?id=1@&asdf=géza%20kék%20az%20ég (csak a space-nek van ilyen kódja, mert ezt így írtuk be asdf: "géza kék az ég")
!!!!!
decodeURIComponent()
az csak mágat a komponens fogja visszakódolni 
->
decodeURIComponent("géza%20kék%20az%20ég"); -> 'géza kék az ég'
és akkor visszakptuk, hogy géza kék az ég 

Megcsinálhatjuk, hogy nem csak ezt adjuk meg, hanem ezt decodeURIComeponent-eljük is, amiatt amit leírtam
-> 
queryObj[keyValue[0]] = keyValue[1] -> queryObj[keyValue[0]] = decodeURIComeponent(keyValue[1])
az egész 
->
const parseQueryString = (queryString)=> {
    queryString = queryString.replace("?", "");
    const keyValuePairs = queryString.split("&");
    const queryObject = {};

    for(const pair of keyValuePairs) {
        const keyValue = pair.split("=");
        queryObj[keyValue[0]] = decodeURIComeponent(keyValue[1]);
    }

és, így már úgy fogjuk visszakapni, hogy géza kék az ég, nem úgy, hogy géza%20kék%20az%20ég, még akkor is ha az URL-ből jött 
-> 
    getBaseUrl: f getBaseUrl()
    host: "127.0.0.1"
    path: "/user.html"
    port: "5500"
    protocol: "http:"
    query: {id: '1', asdf: 'géza kék az ég'}
        asdf: "géza kék az ég"
        id: "1"                     
    [[Prototype]]: Object

    és az index.js-ben a switch-ben, megadjuk a case "user.html"-t 
    ->
    switch(urlObj.path) {
    case: "/":
        users.getUsers();
    break;
    case: "/user.html":
        const id = urlObj.query.id;
    break;
}

a végső változat
->
*/

//?id=55&userName=sanyi99
const parseQueryString = (queryString)=> {
    queryString = queryString.replace("?", "");
    const keyValuePairs = queryString.split("&");
    const queryObj = {};

    for(const pair of keyValuePairs) {
        const keyValue = pair.split("=");
        queryObj[keyValue[0]] = decodeURIComponent(keyValue[1]);
    }

    return queryObj;
};

const urlObj = {
    host:location.hostname,
    port:location.port,
    path:location.pathname,
    protocol:location.protocol,
    query:parseQueryString(location.search),
    getBaseUrl() {
        return `${this.protocol}//${this.host}`;
    }
}

export default urlObj;