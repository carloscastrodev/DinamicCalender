console.log('Aparece mensagem')

/* Mudar a cor do modal */

window.addEventListener('load', function() {
    var GetColor = document.querySelector('#getColor');

    var Change = document.querySelector('#changeColor');
    var ChangeBtn = document.querySelector('#changeColorBtn');
    var ChangeBackground = document.querySelector('#changeColorBackground');
    var ChangeBoxShadow = document.getElementById('changeColorBoxShadow');

    Change.style.backgroundColor = GetColor.value;
    ChangeBtn.style.backgroundColor = GetColor.value;
    ChangeBackground.style.backgroundColor = GetColor.value;
    ChangeBoxShadow.style.boxShadow = `0px 0px 0px 10px ${GetColor.value}`;

    GetColor.addEventListener('input', function(e) {
        Change.style.backgroundColor = e.target.value;
        ChangeBtn.style.backgroundColor = e.target.value;
        ChangeBackground.style.backgroundColor = e.target.value;
        ChangeBoxShadow.style.boxShadow = `0px 0px 0px 10px ${GetColor.value}`;
    }, false);

});

/* Fim mudar cor */

/* JS modal */

function iniciaModal(modalID){
    const modal = document.getElementById(modalID);
    if (modal) {
        modal.classList.add('open');
        modal.addEventListener('click', (e) => {
            if(e.target.id == modalID || e.target.className == 'close'){
                modal.classList.remove('open');
            }
        });
    }
}

function abreModal () {
    iniciaModal('addEvent');
}

/* Fim JS modal */