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
            const image = dialog.files[0];
            const img = new Image();
            img.src = URL.createObjectURL(image);
            
            document.querySelector('.newImage').prepend(img);
        }
    }

    if (screen.availWidth < 1200 ) {
        const textarea = document.querySelector('textarea');
        textarea.maxLength = '240';

        if (textarea.length > 240) {
            textarea.value = textarea.value.slice(0,240);
        }
    }

    function events() {

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