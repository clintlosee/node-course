var accounts = [];

function createAccount(account) {
    accounts.push(account);
    return account;
}

function getAccount(username) {
    var matchedAccount;

    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].username === username) {
            matchedAccount = accounts[i];
        }
    }

    return matchedAccount;
}

function deposit(account, amount) {
    if (typeof amount === 'number') {
        account.balance += amount;
    } else {
        console.log('Deposit failed. Amount is not a number');
    }
}

function withdraw(account, amount) {
    if (typeof amount === 'number') {
        account.balance -= amount;
    } else {
        console.log('Withdraw failed. Amount is not a number');
    }
}

function getBalance(account) {
    return account.balance;
}

function createBalanceGetter(account) {
    return function() {
        return account.balance;
    }
}


var account1 = createAccount({
    username: 'John',
    balance: 0
});

deposit(account1, 150);
withdraw(account1, 25);

var account2 = getAccount(account1.username);
var getAccount1Balance = createBalanceGetter(account2);

console.log(getAccount1Balance());
