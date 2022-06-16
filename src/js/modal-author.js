import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

// const modalForm = document.querySelector('.modal-form');
const authorizationBtn = document.querySelector('.btn-author-modal-open')

authorizationBtn.addEventListener('click', onBtnModalFormClick);


function onBtnModalFormClick(event) {
    event.preventDefault();
    showForm();

}

function showForm () {
    basicLightbox.create(`
    <div class="modal-form">  	
        <input type="checkbox" id="chk" aria-hidden="true">
            <div class="signup">
                <form>
                    <label class="label-form" for="chk" aria-hidden="true">Sign up</label>
                    <input class="input-form" type="text" name="txt" placeholder="User name" required="">
                    <input class="input-form" type="email" name="email" placeholder="Email" required="">
                    <input class="input-form" type="password" name="pswd" placeholder="Password" required="">
                    <button class="button-form">Sign up</button>
                             
                </form>
            </div>

            <div class="login">
                <form>
                    <label class="label-form" for="chk" aria-hidden="true">Login</label>
                    <input class="input-form" type="email" name="email" placeholder="Email" required="">
                    <input class="input-form" type="password" name="pswd" placeholder="Password" required="">
                    <button class="button-form">Login</button>
                </form>
            </div>
     </div>       
`).show()
}

