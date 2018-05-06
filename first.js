'use strict';
function square(x) {
    return x * x;
}

function add(x, y) {
    return x + y;
}

function sub(first, second) {
    return first - second;
}

function mul(first, second) {
    return first * second;
}

function liftf(fun) {
    return function (first) {
	return function (second) {
	    return fun (first, second);
	}
    }
}
function identityf(x) {
    return function () {
	return x;
    };
}

function curry_with_liftf(binary, first) {
    return liftf(binary)(first);
}

function curry_normal(binary, first) {
    return function (second) {
	return binary(first, second);
    }
}

//the dotdotdot accepts a variable number of arguments and binds it to the variable after it.
//ES6
function curry(fun, ...first) {
    return function(...second) {
	return fun(...first, ...second);
    }
}
    
function addf(first) {
    return function (second) {
	return first + second;
    }
}

function twice(binary) {
    return function (param) {
	return binary(param, param);
    }
}

function reverse(func) {
    return function (...args) {
	return func(...args.reverse());
    }
}

function composeu(first_unary, second_unary) {
    return function(param) {
	return second_unary(first_unary(param));
    }
}



var bus = reverse(sub);
console.log(bus(3,2));
var doubl = twice(mul);
var d = doubl(11);
console.log("hello: " + d);
var add3 = curry(add, 3);
var three = identityf(3);
var ff = liftf(add)(3);
var mulf = liftf(mul);

var c = composeu(doubl, square)(5);
console.log("-----");
console.log(c);

//3 different ways of writing inc function

//first way
var inc = curry(add, 1);

//second way
var inc2 = liftf(add)(1);

//third way
var inc3 = addf(1);

console.log(inc3(5));
console.log(inc3(inc(5)));



console.log(mulf(5)(5));
console.log(ff(4));
console.log(add3(5));
