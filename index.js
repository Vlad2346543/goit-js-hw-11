import{a as m,S as d,i as p}from"./assets/vendor-CNqCr-V-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const y="19396225-c483f75d28f30d4068a3a7270",g="https://pixabay.com/api/";async function h(o){const t={key:y,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0};try{return(await m.get(g,{params:t})).data}catch(s){throw console.error("Error fetching images from Pixabay:",s),new Error("Failed to fetch images.")}}const n=document.querySelector(".gallery"),c=document.querySelector("#loader"),b=new d(".gallery a",{captionsData:"alt",captionDelay:250});function L({webformatURL:o,largeImageURL:t,tags:s,likes:a,views:e,comments:r,downloads:i}){return`
        <li class="gallery-item">
            <a href="${t}" class="gallery-link" alt="${s}">
                <img src="${o}" alt="${s}" class="gallery-image">
            </a>
            <div class="info">
                <p class="info-item"><b>Likes</b> ${a}</p>
                <p class="info-item"><b>Views</b> ${e}</p>
                <p class="info-item"><b>Comments</b> ${r}</p>
                <p class="info-item"><b>Downloads</b> ${i}</p>
            </div>
        </li>
    `}function w(o){if(!n)return;const t=o.map(L).join("");n.insertAdjacentHTML("beforeend",t),b.refresh()}function u(){n&&(n.innerHTML="")}function v(){c&&c.classList.add("is-visible")}function E(){c&&c.classList.remove("is-visible")}const f=document.querySelector(".form"),P=f.elements["search-text"];function l(o){p.error({title:"Error",message:o,position:"topRight",backgroundColor:"#ef4040",messageColor:"#fff",titleColor:"#fff"})}async function S(o){o.preventDefault();const t=P.value.trim();if(t===""){l("Please enter a search query.");return}u(),v();try{const a=(await h(t)).hits;a.length===0?(l("Sorry, there are no images matching your search query. Please try again!"),u()):w(a)}catch(s){console.error(s),l("An error occurred while fetching images. Please try again later.")}finally{E(),f.reset()}}f.addEventListener("submit",S);
//# sourceMappingURL=index.js.map
