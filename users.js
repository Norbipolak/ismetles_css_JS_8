/*
Csináltunk ezt htlm-ben 
    <div class="container">
        <div class="grid-4" id="users-holder">
            
        </div>
    </div>
Majd lementjük a users-holder-t ide

css-ben megadtuk a szokásos dolgokat 

megoldjuk, úgyhogy egy class-t létrehozunk és ott csinálunk mindent, ezt a class-t majd export default-oljuk!!!!

class Users {
    usersHolder;

    constructor() {
        this.usersHolder = document.querySelector("#users-holder");
    }

}

export default Users;

Fontos, hogy a class-okban ugye mezők vannak
-> 
usersHolder;

és a class-nak kell csinálni egy constructor-t is!!!!
amiben majd a this-vel, hivatkozva jelen esetben lementjük a dolgokat, tehát értéket adunk neki 

Létrehozunk egy getUsers async függvényt a class-ban, hogy lehívjuk a user-eket!!!
1. megszólítjuk az endpoint-ot egy fetch metódussal, visszakapunk egy response objektumot 
2. mivel ez json formátumban van, ezért kell majd parse-olni, response.json();
fontos, hogy beletegyük ezt egy try-catch blokkba!!!!

és ha a response.ok az true, akkor log-oljuk ki amit kaptunk, tehát a json-t
response objektum, amit visszakaptunk, annak van egy ok property-je, ami egy boolean, tehát ha sikeresen lejöttek az adatok, akkor true
és csak, akkor log-oljuk ki a json-t, ha ez true, tehát sikeresen megkaptuk az adatokat  

async getUsers() {
    try {
        const response = await fetch("https://dummyjson.com/users");
        const json = response.json();

        if(reponse.ok) {
            console.log(json);
        }
    } catch(err){

    }

}

Fontos, csinálunk egy index.js-t és mindegyik oldalnál erre fogunk hívatkozni!!!!!!
Tehát az index.html-nek nem ezt a users.js-t adjuk meg script-nek hanem az index.js-t 
azért csináktuk az export default-ot is erre a class-ra, amit itt csináltunk!!!!!!!!!!!!!

mit kapunk a console.log(json)-ra
->
{users: Array(30), total: 100, skip:0, limit: 30}
    limit: 30
    skip: 0
    total: 100
    users: Array(30)
    0: {id: 1, firstName: 'Terry', lastName: 'Medhurst', maidenName:'rfg' stb.....}
    és akkor ebből van összesen 100 ezekből az ebjektekből, amik egy tömbben vannak 

És akkor ezeket a user-eket kell elrendezni egy bizonyos szerkezetben, hogy átláthatóak legyenek!!! (html szerkezet)

    <div class="container">
        <div class="grid-4" id="users-holder">
            <div class="user">
                <h3>Kis János Márton</h3>
                <div>
                    <img src="">
                </div>

                <div class="grid-2">
                    <div>
                        <a href="user.html">
                            <button>Open</button>
                        </a>
                    </div>
                    <div>
                        <button>Delete user</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

Ez lesz html szerkezet eddig 
1. container -> szokásos beállítások 
2. <div class="grid-4" id="users-holder"> -> az szeretnénk, hogy egy sorban négy darab user legyen 
3. <div class="user"> -> ez olyan lesz, mint egy box tehát lesz egy border-je 
4. ebben lesz egy név, amit most csak beírtunk így kézzel és egy kép 
5. <div class="grid-2" két részre osztjuk a képernyőt 
    az egyikben lesz egy link, ami átvisz minket valahova benne egy button-vel 
    másikban pedig csak egy törlés gomb 

css-ben 
-> 
.grid-4 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr; -> repeat(auto-fill, minmax(200px, 1fr)); hogy responsive legyen!!!!!!!
    grid-gap: 15px;
}

.user {
    background-color: #b0edb8;
    border: 1px solid #90c396;
    padding: 15px;
    text-align: center;
}

.grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.user-img {
    width: 100%; azért 100% a width, hogy felvegye, amiben benne van a 100%-át, responsiveness!!
}

.user-img img {
   width: 100%;
   height: 250px;
   object-fit: cover; 


grid-ben ugye a szokásos dolgok, user-kell egy border meg egy background-color, text-align:center; hogy középen legyen a szöveg, ami 
benne van, ha nem szöveg, akkor kell a justify-content: center meg a align-items: center;

user-img fontos a width: 100%, hogy felvegye a szűlőeleme 100%-t 
user-img img-nél is fontos ugyanez és még a object-fit: cover, hogy a kép teljesen betöltse a felülelet 
itt meg kell határotni egy height-ot, mert azt másféleképpen nem lehet megoldani, mert ugye a height nincsen semelyik szűlőelemnél 
meghatározva ezért kell ezt így megadni, hogyha azt szeretnénk, hogy a user-ben az összes kép ugyanolyan magas legyen 

Most ha a response.ok volt, ott nem kiírjuk, hogy mik jöttek le, hanem egy for-val végigmegyünk a users-en és 
itt megcsináljuk neki a html szerkezetet, annak a mintájára, amit mi most itt megcsináltunk a html-ben és megformáztuk a css-ben 
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

if(repsonse.ok){
    for(const user of json.users){
        const userDiv = document.createElement("div");
        userDiv.classList.add("user");

        const nameH3 = document.createElement("h3");
        nameH3.innerText = `${user.firstName} ${user.lastName}` (ha több adat van, akkor ilyen formában tudjuk őket kiírni!!!! `${}`)

        const userImgDiv = document.createElement("div");
        const userImg = document.createElement("img");
        userImg.classList.add("user-img");
        userImg.src = user.image;
        userImgDiv.appednChild(userImg);

        const grid2Div = document.createElement("div");
        grid2Div.classList.add("grid-2");

        const openDiv = document.createElement("div");
        openDiv.innerHTML = <a href="user.html?id=${users.id}">Megnyítás</a> (itt ebbe mégsem rakunk bele egy gombot)
        const deleteDiv = document.createElement("div");
        deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Törlés";
        deleteDiv.appendChild(deleteBtn);

        grid2Div.appendChild(openDiv);
        grid2Div.appendChild(openDiv);

        userDiv.appendChild(nameh3);
        userDiv.appendChild(userImgDiv);
        userDiv.appendChild(grid2Div);

        this.userHolder.appendChild(userDiv);
    }
}

Mit csináltunk itt 
1. le volt mentve userHolder a constructor-ban ilyen formában 
2. megcsináltuk a szerkezetet, amit előtte HTML-ben 
    - createElement-vel létrehoztuk az elemeket
    - .classList.add - aminek megadtunk egy class-t és formáztuk css-ben 
    - innerText - hogy mi legyen benne 
        button-nak csak az, hogy törlés, de viszont a nameH3-nál a user.firstName és user.lastName-t szeretnénk megjeleníteni!!!!!!
    ugyanugy, minthogy meg szeretnénk jeleníteni a neveket meg akarjuk jeleníteni a képeket is -> userImg.src = user.image;
        itt az img-nek az src-attributumához kell megadni a users az image property-jét 
    - InnerHTML-vel meg tudunk elemket is csinálni, ugyanugy minthogy createElement utána meg appendChild 
        <a href="users.html?id=${users.id}">Megnyítás</a>

Fontos, hogy oda kell figyelni az appendChild-olásnál, meghogy minden class hozzá legyen adva stb.

és akkor, így meg van a név, alatta egy kép, az alatt pedig egy kétosztható div-ben egy megnyitás link (a href) és egy button
Ki lehet most már törölni a html szerkezetet vagy különben bent fog maradni az az egy, amit itt csináltunk 


    <div class="container">
        <div class="grid-4" id="users-holder">
            <div class="user">
                <h3>Kis János Márton</h3>
                <div>
                    <img src="">
                </div>

                <div class="grid-2">
                    <div>
                        <a href="user.html">
                            <button>Open</button>
                        </a>
                    </div>
                    <div>
                        <button>Delete user</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

-> 
    <div class="container">
        <div class="grid-4" id="users-holder"></div>
    </div>

Szépen, akkor így meg van jelenítve, minden át is írtuk, hogy a grid-4-nél a grid-template-columns az ne 1fr 1fr 1fr 1fr legyen, hanem 
repeat(auto-fill, minmax(200px, 1fr))

Jelenleg, ha rákattunktunk a megnyitás link-re -> akkor ezt látjuk majd a böngészőben 
-> 
csinálunk egy másik html-t annak az oldalnak -> user.html
<a href="user.html?id=${users.id}">Megnyítás</a>
Akkor ez a user.html-re fog minket vinni, amit most majd megszerkeztünk!!!!
url-je meg a következő lesz ha az 1-es id-júra kattintunk majd 
->
127.0.0.1:5500/user.html?id=1 

És itt a user.html-en, ami itt a lényeg, hogy ez ?id=1
ezt ugy kapjuk meg, hogy a location objektumnak van egy olyanja hogy search
ezen az oldalon a location az így fog kinézni
->
Location {......}
    ancestorOrigins: DOMStringList {length: 0}
    assign: f assign()
    hash: ""
    host: "127.0.0.1.:5050"
    hostname: "127.0.0.1"
    href: "http://127.0.0.1:5050/user/.html?id=1"
    origin: "http://127.0.0.1:5050"
    pathname: "/user.html"
    port: 5050
    protocol: "http:"
    reload: f reload()
    replace: f replace()
    search: "?id=1"
    toString: f toString()
    valueOf: f valueOf()
    [[prototype]]: Location

A user.html-en ugyanugy betöltjük, mint a index.html-en az index.js-t 
Átmegyünk az index.js-re és ott megcsináljuk ennek a html-nek a path-ját!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Ha megcsináltuk a URL path-ot a url.js-ben és ezt hozzá is adtuk a index.js-ben akkor itt tudunk csinálni 
ugye ebbe a class Users-ben egy getUser metódust, ami majd bekér egy id-t 
és akkor úgy tudjuk megjeleníteni az eggyes user-eket ha rákattintunk erre a linkre
-> 
<a href="user.html">

Fontos, hogy kell ide egy id, ami alapján lekérdezünk 

async getUser(id) {
    try {
        const response = await fetch("https://dummyjson.com/users + id");
        const json = await reponse(json);
        cnosole-log(json);
    } catch(err) {
        console.log(err);
    }
}

ez lett a végleges változat itt 
-> 
*/
class Users {
    usersHolder;
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

    async getUsers() {
        try {
            const response = await fetch("https://dummyjson.com/users");
            const json = await response.json();

            if(response.ok) {
                for(const user of json.users) {
                    const userDiv = document.createElement("div");
                    userDiv.classList.add("user");

                    const nameH3 = document.createElement("h3");
                    nameH3.innerText = `${user.firstName} ${user.lastName}`;

                    const userImgDiv = document.createElement("div");
                    userImgDiv.classList.add("user-img");
                    const userImg = document.createElement("img");
                    userImg.src = user.image;
                    userImgDiv.appendChild(userImg);

                    const grid2Div = document.createElement("div");
                    grid2Div.classList.add("grid-2");
                    const openDiv = document.createElement("div");
                    openDiv.innerHTML = `<a href="user.html?id=${user.id}">Megnyitás</a>`;
                    const deleteDiv = document.createElement("div");
                    const deleteBtn = document.createElement("button");
                    deleteBtn.innerText = "Törlés";
                    deleteDiv.appendChild(deleteBtn);

                    grid2Div.appendChild(openDiv);
                    grid2Div.appendChild(deleteDiv);

                    userDiv.appendChild(nameH3);
                    userDiv.appendChild(userImgDiv);
                    userDiv.appendChild(grid2Div);

                    this.usersHolder.appendChild(userDiv);
                }
            }
        } catch(err) {
            console.log(err);
        }
    }

    async getUser(id) {
        try {
            const response = await fetch("https://dummyjson.com/users/" + id);
            const json = await response.json();
            console.log(json);
            
            this.nameHolder.innerText = `${json.firstName} ${json.lastName}`;

            this.birthDateHolder.innerText = json.birthDate;
            this.ageHolder.innerText = json.age;
            this.emailHolder.innerText = json.email;
            this.addressHolder.innerText = `${json.address.city}, ${json.address.address}`;
            this.userImgHolder.src = json.image;
        } catch(err) {
            console.log(err);
        }
    }
}

export default Users;

