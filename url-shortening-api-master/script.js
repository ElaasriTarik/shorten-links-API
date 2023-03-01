const menuItems = document.querySelector('.menuItems')
const menuSpace = document.querySelector('.menuSpace')
const shortenBtn = document.querySelector('.shortenBtn')

const linkText = document.querySelector('.linkText')
let copyBtn;
const prevLinks = document.querySelector('.prevLinks')
let state = true
let linkOrder = 0;
let linksObj = [];
menuSpace.addEventListener('click', () => {
  if (state) {
    menuItems.style.display = 'flex'
    state = false
  } else {
    menuItems.style.display = 'none'
   state = true
  }
})

function shorten(link){
  fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
    .then(response => response.json())
    .then(data =>{
        consoleAPI(data)
    }).catch(error => console.log('ERROR:',error))
}

function consoleAPI(data) {
  console.log(data);
  linksObj.push({
    'id': linkOrder,
    'short_link': data.result.short_link,
    'ass_btn': `b${linkOrder}`
  })

  console.log(linksObj);
  prevLinks.innerHTML += `<div class="link">
      <h3 class="linkText">${data.result.full_short_link}</h3>
      <h3 class="shortenedLink">${data.result.short_link}</h3>
      <button class="copyBtn b${linkOrder}">Copy</button>
    </div>`;
    linkOrder++;
    copyBtn = document.querySelectorAll('.copyBtn')
    copyBtn.forEach((item, i) => {
      item.addEventListener('click', () => {
        copyText(parseInt(item.classList[1][1]))
 }
)});
}
shortenBtn.addEventListener('click', () => {
    const input = document.querySelector('.input')
    shorten(input.value)
})


function copyText(targetLink) {
  if (targetLink == undefined) {
     return null;
  }
  console.log('copied');
  // Get the text field
  
   // Copy the text inside the text field
  navigator.clipboard.writeText(linksObj[targetLink].short_link);
  // Alert the copied text
  alert("Copied: " + linksObj[targetLink].short_link);
}
