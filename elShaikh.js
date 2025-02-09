
const imgs =[
   'url( "img/file-9QQ3zMQ1fEJiyugmqm4H9J.webp")',
   'url( "img/file-3LRTUkrK2rBbMiXK3syvUm.webp")',
   'url( "img/file-AXGsPBn4PYDnbNc3Mjsi2Q.webp")',
] ;
let current = 0;

function rand() {
    let landing = document.querySelector('.landing')
    landing.style.backgroundImage = imgs[current];
    current =(current + 1)% imgs.length
}
setInterval(rand,10000);

let pars = document.querySelector(".pars");
let ul = document.querySelector("ul");

pars.addEventListener("click" ,function(event){
    if( ul.style.display ==="block"){
        ul.style.display ="none"
    }else{
        ul.style.display ="block"
    }
    event.stopPropagation()
});
document.addEventListener("click" ,function(){
    ul.style.display ="none"
});
ul.addEventListener("click", function(event){
    event.stopPropagation()
});

const text = "we are creative market";
const time = 350 ;
let i = 0 ;

let intro = document.querySelector(".itro");

function type(){
    if(i < text.length){
        intro.textContent += text.charAt(i);
        i++;
        setTimeout(type , time);
    }
    else{
        intro.style.borderRight ="none";
    }
}

document.addEventListener("DOMContentLoaded", function(){

    type();
    rand();
});



const prodact = document.querySelectorAll("[data-prodact]");

prodact.forEach((container)=>{
    let cars = container.querySelector(".cars");
    const products = cars.querySelectorAll(".pro");
    const dots = container.querySelectorAll(".dot");
    const h2 = container.querySelector("h2");
console.log(products)
    let isdraggin = false ;
    let start = 0 ;
    let currentt =0 ;
    let prev = 0 ;
    let currentindx = 0 ;
    const prodact = document.querySelectorAll("[data-prodact]");

    prodact.forEach((container) => {
        let cars = container.querySelector(".cars");
        const products = cars.querySelectorAll(".pro");
        const dots = container.querySelectorAll(".dot");
        const h2 = container.querySelector("h2");
        console.log(products);
        let isdraggin = false;
        let start = 0;
        let currentt = 0;
        let prev = 0;
        let currentindx = 0;
    
        function update() {
            products.forEach((item, index) => {
                let offset = (index - currentindx) * 100;
                item.style.transform = `translateX(${offset}%)`;
                item.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease';
                if (index === currentindx) {
                    item.style.opacity = "1";
                    item.style.visibility = "visible";
                    item.style.position = "relative";
                } else {
                    item.style.opacity = "0";
                    item.style.visibility = "hidden";
                    item.style.position = "absolute";
                }
            });
            activeDot(currentindx);
        }
    
        function goto(index) {
            console.log(index);
            if (index < 0) {
                currentindx = products.length - 1;
            } else if (index >= products.length) {
                currentindx = 0;
            } else {
                currentindx = index;
            }
            console.log(currentindx);
            update();
        }
    
        function startDrag(e) {
            isdraggin = true;
            start = getPositionX(e);
            prev = currentt;
            cars.style.cursor = 'grabbing';
        }
    
        function drag(e) {
            if (!isdraggin) return;
            const position = getPositionX(e);
            e.preventDefault();
            currentt = prev + position - start;
        }
    
        function endDrag() {
            isdraggin = false;
            const moved = currentt - prev;
            if (moved < -50) {
                goto(currentindx + 1);
            } else if (moved > 50) {
                goto(currentindx - 1);
            } else {
                update();
            }
            prev = 0;
            cars.style.cursor = 'grab';
        }
    
        function getPositionX(e) {
            return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        }
    
        function activeDot(currentindx) {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentindx);
            });
        }
    
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goto(index);
            });
        });
    
        cars.addEventListener('touchstart', startDrag);
        cars.addEventListener('touchmove', drag);
        cars.addEventListener('touchend', endDrag);
    
        cars.addEventListener('mousedown', startDrag);
        cars.addEventListener('mousemove', drag);
        cars.addEventListener('mouseup', endDrag);
        cars.addEventListener('mouseleave', endDrag);
    
        update();
    });
});
