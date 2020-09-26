var checked = false;
function doCheckIfLogged() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            location.href = "/dashboard";
        }
        checked = true;
        document.querySelector('#btnLogin').disabled = false;
    });

}

function doLogin() {
    document.querySelector('#btnLogin').disabled = true;

    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().useDeviceLanguage();

        provider.setCustomParameters({
            'login_hint': 'name.surname@volteuropa.org'
        });

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('token', JSON.stringify(token));
            console.log(sessionStorage.getItem('user'));
            console.log(sessionStorage.getItem('token'));
        }).catch(function(error) {
            // Handle Errors here.
            console.error(error);
            doShowError(error);
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });

    } finally {
        document.querySelector('#btnLogin').disabled = false;
    }

}

function doShowError(error) {
    document.querySelector('#modalError').classList.add('is-active');
    document.querySelector('#modalError [data-name="content"]').innerHTML = `
    There was an error during the login: <br/>
    <div class="panel">
    <div class="panel-block">
    <code>${JSON.stringify(error)}</code>
</div>
</div>
    `;
}

doCheckIfLogged();