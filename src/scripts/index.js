import '../styles/styles.scss';
import html2canvas from 'html2canvas';

"strict mode"

const index = (() => {

    async function download() {
        const { titulo } = document.forms.createForm;
        const preview = document.querySelector('.direito');
        const canvas = await html2canvas(preview);
        const dataImg = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');

        downloadLink.download = titulo.value;
        downloadLink.href = dataImg;
        downloadLink.click();
    }

    function handleOpenDialog() {
        const dialog = document.createElement('input');
        
        dialog.type = 'file';
        dialog.accept = 'image/*';
        dialog.click();
        
        dialog.onchange = () => {
            const { imageName } = document.forms.createForm;
            const img = dialog.files[0];
            const divImage = document.querySelector('#newImage');
            
            imageName.value = img.name;
            divImage.style.backgroundImage = `url(${URL.createObjectURL(img)})`;
        }
    }

    if (screen.availWidth < 1200 ) {
        const textarea = document.querySelector('textarea');
        textarea.maxLength = '240';

        if (textarea.length > 240) {
            textarea.value = textarea.value.slice(0,240);
        }
    }

    // function addMenu() {
    //     document.querySelector('.main').insertAdjacentHTML('beforeend', /* html */ `
    //         <div class="creator">
    //             <h3 draggable="true">Criado por Kauã Muniz</h3>
                
    //             <a href="https://www.linkedin.com/in/kauamunizz/">
    //                 <img src="./public/assets/linkedin-icon.svg" alt="icon linkedin">
    //             </a>

    //             <a href="https://github.com/kauamunizz">
    //                 <img src="./public/assets/github-icon.svg" alt="icon Github">
    //             </a>
    //         </div>
    //     `);
    // }

    function events() {

        document.querySelector('.menu-icon').addEventListener('click', () => {
            document.querySelector('.main').style.display = 'none';
            document.querySelector('.menu-info').style.display = 'flex';
        });

        document.querySelector('.submit').addEventListener('click', event => {
            event.preventDefault();
            download();
        })
        
        document.querySelector('.input-group').addEventListener('click', handleOpenDialog)

        document.forms.createForm.addEventListener('input', () => {
            const { titulo, autor, descricao } = document.forms.createForm;

            document.querySelector(".titulo").innerHTML =  titulo.value;
            document.querySelector(".tituloMaior").innerHTML =  titulo.value;
            document.querySelector(".autor").innerHTML = '@' + autor.value;
            document.querySelector(".descricao").innerHTML =  descricao.value;
        });
    }


    function init() {
        
        events();
    }


    return {
        init
    }
})();

document.addEventListener('DOMContentLoaded', index.init);