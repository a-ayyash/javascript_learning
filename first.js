'use strict';

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

function composeb(first_binary, second_binary) {
    return function(a,b,c) {
	return second_binary(first_binary(a,b), c);
    }
}

function limited(fun, calls) {
    return function(a, b) {
	if (calls > 0) {
	    calls = calls - 1;
	    return fun(a, b);
	}

	return undefined;
    };
}

function from(a) {
    var i = 0;
    return function() {
	return a++;
    };
}

function to(generator, limit) {
    return function() {
	var value = generator();
	if (value < limit) {
	    return value;
	}
    };
}

function fromTo(start, end) {
    return function () {
	if (start < end) {
	    var ret = start;
	    start += 1;
	    return ret;
	}
    };
}

function element(arr, gen) {
    var i = 0;

    var g = gen;

    if (gen === undefined) {
	g = fromTo(0, arr.length);
    }

    return function () {
	var value = gen();

	if (value !== undefined) {
	    return arr[value];
	}
    };
}

function collect(gen, array) {
    return function () {
	var value = gen();
	if (value !== undefined) {
	    arr.push(value);
	}
	return value;
    }
}

function filter(gen, predicate) {
    return function recur() {
	var value = gen();

	if (value === undefined || predicate(value) === true) {
	    return value;
	} else {
	    return recur();
	}
    };
}

function concat(gen1, gen2) {
    return function () {
	var val1 = gen1();

	if (val1 !== undefined) {
	    return val1;
	} else {
	    var val2 = gen2();

	    return val2;
	}
    };
}

function concat_all(...gens) {
    var next_gen = element(gens);
    var gen = next_gen();

    return function recur() {
	var value = gen();

	if (value !== undefined) {
	    return value;
	} else {
	    gen = next_gen();

	    if (gen !== undefined) {
		recur();
	    }
	}

	return value;
    };
}

var conc = concat_all(fromTo(0,3), fromTo(0,2));
console.log(conc());
console.log(conc());
console.log(conc());
console.log(conc());
console.log(conc());

console.log(conc());

/*

var fil = filter(fromTo(0,5), (a) => (a%3) === 0);
console.log(fil());
console.log(fil());
console.log(fil());
/*
var index = from(0);
console.log(index());
console.log(index());
console.log(index());
console.log(index());

var index_limited = to(from(1), 3);
console.log(index_limited());
console.log(index_limited());
console.log(index_limited());
console.log(index_limited());

var index_ranged = fromTo(0, 3);
console.log(index_ranged());
console.log(index_ranged());
console.log(index_ranged());
console.log(index_ranged());

var limited_add = limited(add, 1);
console.log("********");
console.log(limited_add(1,2));
console.log(limited_add(1,2));
console.log("********");

var bus = reverse(sub);
console.log(bus(3,2));
var doubl = twice(add);
var square = twice(mul);
var d = square(11);
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
*/
