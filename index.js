import Users from "./users.js";
import urlObj from "./url.js";

/*
Erre hivatkozutnk a html-ben!!!!!!!!
és akkor ide beimportáljuk a dolgokat, amikre szükségünk van 
pl. a Users class-t, amit csináltunk a users.js-ben -> import Users from "/users.js";

Amit itt founk csinálni ahhoz kell a location nevű objektum!!!!!!
Location nevű objektumunk mondja meg, hogy milyen domain-en (hostname), host meg aloldalon (pathname) tartozkodunk!!!!

Location{ancestorOrigins: DOMStringList, .....}
    ancestorOrigins: DOMStringList
    assign: f assign()
    hash: ""
    host: "dummyjson.com"
    hostname: "dummyjson.com"
    href: "https://dummyjson.com/docs/users"
    origin: "https://dummyjson.com"
    pathname: "/docs/users"
    port:""
    protocol: "https:"
    reload: f reload()
    replace: f replace()
    search: ""
    toString: f toString()
    valueOf: f valueOf()
    [[Prototype]]: Location


Erre csinálunk egy url.js-t, ahol meghatározzuk, hogy mik lesznek az url-jei az adott oldalaknak, aloldalaknak!!!!

Nagyon fontos!!!!!!!!!!!!!!!!!!!
Ha több oldalon szeretnénk valamit megcsinálni és csak egy html-ünk és van akkor mindig import-exportálunk a js oldalakon, de
viszont csak egy js-t tudunk hozzáadni script-vel ugye a html-hez és ha van import meg export, több .js
->
<script type="module" src="index.js"></script>
Használni kell a type="module"-t, amikor behívjuk 

Most a import Users from "./users.js" mellett beimportáljuk a urlObj-et is 
-> 
import urlObj from "./url.js"

Tehát eddig ez a kettő van itt importálva 

!!!!!!!!!!!
Csinálunk egy switch-et a urlObj.path-jére, ami ugye a location.pathname -> pathname: "/docs/users" / + amit ez után beírunk 
Tehát a path-et fogjuk változtatni, aszeritnt, hogy melyik oldalon vagyunk 

console.log(urlObj.path) -> / 
de ha utánaírunk valamit, akkor meg az lesz a path pl. /asfdf (csak most a jelen esetben a főoldalon voltunk, azért csak /)
Fontos, tehát ha a főoldalon vagyunk akkor a pathname az / de ha van egy olyan aloldal, hogy users akkor meg /users lesz a pathname

Tehát ez a switch azért jó, mert így lehet beállítani, hogy mi legyen az adott oldalakon

const users = new Users();

switch(urlObj.path) {
    case: "/":
        users.getUsers();
    break,
}

Csináltunk egy instance a Users class-ból és az első oldalon azt szeretnénk, hogy csak simán megjelenítse ezeket a user-eket 
a Users class-ban csináltunk arra egy getUsers függvényt, ami pontosan ezt csinálja, ezért itt csak azt mondjuk, hogyha a 
case "/" (tehát a főoldalon vagyunk) -> users.getUsers() (akkor csak jelenítse meg a user-eket)
nagyon fontos!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


Mi történt itt 
url.js-ben készítettünk egy urlObj-et, ami visszaadja nekünk a host-ot, port-ot, pathname!!!(hogy melyik aloldalon vagyunk)
És most azt próbáljuk megvalósítani, hogy van egy index.js és ha itt pl. a főoldalon vagyunk, akkor meghívjuk a users-ből a getUser-t
nevű metódust 

Csináltunk egy user.html-t és ha ezen az oldalon vagyunk, akkor a switch-be megcsináljuk hozzá az url-t
->
switch(urlObj.path) {
    case: "/":
        users.getUsers();
    break;
    case: "/user.html":

    break;
}

console.log(urlObj);
ha most a user.html-n vagyunk akkor az UrlObj az így fog kinézni ->
    getBaseUrl: f getBaseUrl()
    host: "127.0.0.1"
    path: "/user.html"
    port: "5500"
    protocol: "http:"
    [[Prototype]]: Object

Tehát, amit itt megadtunk a switch-ben case-ként erre az teljesen jó -> case: "user.html":

    switch(urlObj.path) {
    case: "/":
        users.getUsers();
    break;
    case: "/user.html":
        const id = urlObj.query.id;
    break;


    Ha ez, így kész van, akkor át tudunk menni a users.js-be, ahol csinálunk egy getUser metódust, ami majd 
    bekér egy id-t!!!!
    miután a users.js-ben lehívtuk a az eggyes user-eket -> getUser(id) metódus segítségével 
    itt meghívjuk azt a metódust a a case "user.html" ágban
    -> 
        switch(urlObj.path) {
    case: "/":
        users.getUsers();
    break;
    case: "/user.html":
        const id = urlObj.query.id;
        users.getUsers(id);
    break;

    elmagyarazas.js
    kiszedtük az id-t az urlObj.query.id-ből 
    megadtuk ezt az id-t a getUsers függvényünknek, hogy eggyesével le tudjuk szedni a user-eket 

Megjöttek az adatok és ezeket az adatokat kell majd megjeleníteni
->
{....}
    address: {address: '1745 T street Southeast' city: 'Budapest'}
    age: 50
    birthDate: "1977-12-23"
    email: "atuny@hdd.com"
    gender: "male"
    és még nagyon sok adat ilyen formában

Ezért átmegyünk a user.html-re és ott megjelenítjük őket 
így néz ki 
->
<a href="/">Index</a>
    <div class="container">
        <div class="grid-2">
            <div class="box">
                <img id="user-image">
            </div>
            <div class="box">
                <h3 id="name"></h3>
    
                <div class="grid-2">
                    <div class="data-box">
                        <h4>Birth  date</h4>
                        <div id="birth-date"></div>
                    </div>
                    
                        <div class="data-box">
                            <h4>Age</h4>
                            <div id="age"></div>
                        </div>
                    </div>
                </div>

                <div class="grid-2">
                    <div class="data-box">
                        <h4>Email</h4>
                        <div id="email"></div>
                    </div>

                        <div class="data-box">
                            <h4>Address</h4>
                            <div id="email"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    css-ben meg csak a box-ot (ugyaz lesz, mint a user)csináltuk meg és data-box-ot (a többi class-t már formáztuk az index.html-ben)
    
    .data-box {
    background-color: white;
    margin: 5px;
    border-radius: 4px;
    padding: 4px;
}
    .user, .box {
    background-color: #b0edb8;
    border: 1px solid #90c396;
    padding: 15px;
    text-align: center;
}

és akkor itt nem megcsinákjuk a szerkezetet a createElement-vel, hanem csinálunk mezőket a class Users-nek és 
lementjük a constructor-ébe a dolgokat, (fontos ott, hogy this-vel kell hívatkozni a mezőkre!!!)
és akkor a getUser-ben, mert értéket adunk majd nekik!!!!!!!
pl.this.nameHolder.innerText = `${json.firstName} ${json.lastName}`

class Users {
    usersHolder; (már előbb csináltuk az index.html-hez)
    nameHolder;
    birthDateHolder;
    ageHolder;
    emailHolder;
    addressHolder;
    userImgHolder;

    constructor() {
        this.usersHolder = document.querySelector("#users-holder");
        this.nameHolder = document.querySelector("#name");
        this.birthDateHolder = document.querySelector("#birth-date");
        this.ageHolder = document.querySelector("#age");
        this.emailHolder = document.querySelector("#email");
        this.addressHolder = document.querySelector("#address");
        this.userImgHolder = document.querySelector("#user-image");
    }

    async getUser() {
        try {
            const response = await fetch("https://dummyjson.com/users/ + id");
            const json = await response.json();

            this.nameHolder.innerText = `${json.firstName} ${json.lastName}`
            this.birthDateHolder.innerText = json.birthDate;
            this.ageHolder.innerText = json.age;
            this.emailHolder.innerText = json.email;
            this.addressHolder.innerText = `${json.adress.address} ${json.address.city}`
            this.userImgHolder.src = json.image;
        } catch(err) {
            console.log(err);
        }
    }
}

és ha vissza akarunk menni a főoldalra ("/") az nem egyenlő az index.html-vel de ugyanazt jelöli 
ezért a container felé csinálunk egy a href-es dolgot, hogy visszavigyen minket a főoldalra 
-> 
<a href="/">Index</a>

végső változat 
->
*/

const users = new Users();

switch(urlObj.path) {
    case "/":
        users.getUsers();
        break;
    case "/user.html":
        const id = urlObj.query.id;
        users.getUser(id);
        break;
}