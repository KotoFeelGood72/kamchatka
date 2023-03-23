
if (window.innerWidth < 500 || window.innerHeight < 500) {
    let width = 0;
let timer = setInterval(() => {
    if (width > 100) clearInterval(timer);
    width += 2;
    if (document.querySelector(".preloader__progress")) {
        document.querySelector(
            ".preloader__progress"
        ).style.width = `${width}%`;
    }
},100);
}
else{
    let width = 0;
    let timer = setInterval(() => {
        if (width > 100) clearInterval(timer);
        width += 2;
        if (document.querySelector(".preloader__progress")) {
            document.querySelector(
                ".preloader__progress"
            ).style.width = `${width}%`;
        }
    },35);
}



