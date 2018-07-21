var $oldPassword    = $id('old-password');
var $newPassword    = $id('new-password');
var $newPassword2   = $id('new-password2');

var $changePasswordModal    = $id('change-password-modal');
var $changePasswordSuccess  = $id('change-password-success');

var $errorChangePassword = $id('error-change-password');

function showChangePasswordModal() {
    $changePasswordModal.style.display = "block";
}

function changePassword() {
    checkNewPasswords();
}

function checkNewPasswords() {
    if($newPassword.value == $newPassword2.value && $newPassword.value > '') {
        $errorChangePassword.style.display = 'none';
        $loader.style.display = "block";
        isPasswordCorrect().then(function (response) {
            if(!response) {
                $loader.style.display = "none";
                $errorChangePassword.style.display = 'block';
                $errorChangePassword.innerText = "Wrong old password entered.";
            } else {
                submitNewPassword().then(function (response) {
                    $loader.style.display = "none";
                    $changePasswordSuccess.style.display = "block";
                }, function (err) {
                    fetchFailed();
                });
            }
        }, function (err) {
            fetchFailed();
        });
    } else {
        $errorChangePassword.style.display = 'block';
        $errorChangePassword.innerText = "New password does not match.";
    }
}

function isPasswordCorrect() {
    // var data = toJSONString( $form );
    var url = getHost() + "/leave-application-api-capstone/AccountAPI.php?username=" + accountUsername + "&password=" + $oldPassword.value;
    var init = {
        method: 'GET',
        headers: new Headers({
        })
    };
    return fetch(url, init).then(function(response){
        return response.json();
    });
}

function submitNewPassword() {
    var accountObj = {
        'username' : accountUsername,
        'old_password' : $oldPassword.value,
        'new_password' : $newPassword.value
    };
    var accountData = JSON.stringify( accountObj );
    var url = getHost() + "/leave-application-api-capstone/AccountAPI.php";
    var init = {
        method: 'POST',
        headers: new Headers({
        }),
        body: accountData
    };
    return fetch(url, init).then(function(response){
        return response.json();
    });
}