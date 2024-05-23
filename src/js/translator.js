import i18next from 'i18next';
import Backend from "i18next-http-backend"

let language 

if(localStorage.getItem('favoriteLanguage')){
  language = localStorage.getItem('favoriteLanguage')
}else{
  language = 'es'
}



//Va al json por la traduccion
i18next.use(Backend).init({
  lng: language, // if you're using a language detector, do not define the lng option
  debug: false,
  backend:{
    loadPath: '/locales/{{lng}}/{{ns}}.json'
  },
  ns: ['translation'],
  defaultNS:'translation'
}).then(() => updateContent())

//aca recorre las traducciones
function updateContent() {
    const htmlElements = document.querySelectorAll('[data-i18n]')

    htmlElements.forEach(element  => {
        const value = element.getAttribute('data-i18n')// el elemento recorre cada etiqueta con el atributo data 
        element.innerHTML = i18next.t(value) // remplezala la etiqueta en el valor
    })

}

//llamamos a la funcion que cambia las traducciones
window.changeLanguage = function(lng){
    i18next.changeLanguage(lng).then(() => updateContent())
    localStorage.setItem('favoriteLanguage',lng)
}
