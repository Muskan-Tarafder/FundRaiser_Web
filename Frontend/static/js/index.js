
async function Login() {
    let name=document.getElementById('name').value;
    let pwd=document.getElementById('pwd').value;
    let errorMessage = document.getElementById("error-message");
    console.log(name,pwd)
    if (!name || !pwd) {
        errorMessage.textContent = "Please enter any email and password for dummy test.";
        return;
    }
    try {
        // console.log("added")
        // const response = await fetch("/Enter", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ name, pwd })
        // });

        // const data = await response.json();
        
        if (name && pwd) {
            document.getElementById('name').value='';
            document.getElementById('pwd').value='';
            window.location.href = "/Dashboard";
        } else {
            errorMessage.textContent = data.message || "Invalid Credentials!!";
        }
    } catch (error) {
        errorMessage.textContent = "Server error. Please try again later.";
    }
    
}
async function register(){
    console.log("entered");
    let name = document.getElementById('newname').value;
    let email = document.getElementById('email').value;
    let pwd = document.getElementById('pass').value;
    let errorMessage = document.getElementById("error-message-signup");  // ADD THIS
    let confirmPassword = document.getElementById("confirm-password").value;
    if (!name || !email || !pwd){
        alert("Enter all values");
        return;
    }

    if (pwd.length >= 8){  // FIXED THIS
        const lcase = /[a-z]/.test(pwd);
        const ucase = /[A-Z]/.test(pwd);
        const num = /[0-9]/.test(pwd);
        const sym = /[!@#$%^&*()_\-+={},.;]/.test(pwd);

        if (!(lcase && ucase && num && sym)){
            errorMessage.textContent = "Password criteria not matched!! Choose a strong password.";
            return;
        }
    } else {
        errorMessage.textContent = "Password must be at least 8 characters long.";
        return;
    }
    console.log(confirmPassword)
    console.log(pwd!==confirmPassword)
    if (pwd !== confirmPassword) {
        errorMessage.textContent="Password Doesn't match";
        errorMessage.style.display = "block";
        return;
    } else {
        errorMessage.style.display = "none";
    }

    let userData = {
        name: name,
        email: email,
        password: pwd,
        amt: 0.00,
        rewards: []
    };

    console.log(userData);
    alert("Dummy Input Taken.");

    try {
        let response = await fetch("/newUser", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        let result = await response.json();

        if (response.ok) {
            alert(result.message); 
            document.getElementById('newname').value='';
            document.getElementById('email').value='';
            document.getElementById('pass').value='';
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again later.");
    }
}
