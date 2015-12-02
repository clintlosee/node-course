var accounts = [];

// account object
// balance
// username

// create account
function createAccount(account) {
    // push onto account array
    // return account
    accounts.push(account);
    return account;
}

// get account
function getAccount(username) {
    // find matching account using forEach
    // return account
    var matchedAccount;

    accounts.forEach(function(account) {
        if (account.username === username) {
            matchedAccount = account;
        }
    });

    return matchedAccount;
}


function deposit(account, amount) {
    account.balance += amount;
}

function withdraw(account, amount) {
    account.balance -= amount;
}

function getBalance(account) {
    return account.balance;
}

var account1 = createAccount({
    username: 'John',
    balance: 0
});

deposit(account1, 150);
console.log('Balance: ' + getBalance(account1));

withdraw(account1, 25);
console.log('Balance: ' + getBalance(account1));

var existingAccount = getAccount('John');
console.log('Johns Account: ' + getBalance(existingAccount));


var myAccount = createAccount({
    username: 'Jen',
    balance: 15
});

var existingJenAccount = getAccount('Jen');
console.log('Jens Account: ' + getBalance(existingJenAccount));

console.log(accounts);
