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
	var value = g();
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
		return recur();
	    }
	}

	return value;
    };
}

function gensymfactory(prefix) {

    var number = 0;

    return function() {
	number += 1;
	return prefix + number;
    };

}

function gensymfactoryfactory(unary_incrementor, seed) {
    return function() {
	var number = seed;
	return function() {
	    number = unary_incrementor(number);
	    return prefix + number;
	};
    };
}

function fibof2(a, b) {

    return concat(
	element([a, b]),
	function () {
	    var next = a + b;
	    a = b;
	    b = next;
	    return next;
	});
}
    
function fibof(a, b) {
    var counter = 0;

    return function () {
	var next;

	switch (counter) {
	case 0:
	    counter = 1;
	    return a;
	case 1:
	    counter = 2;
	    return b;
	default:
	    next = a + b;
	    a = b;
	    b = next;
	    return next;
	}
    };
}

function counter(seed) {
    return {
	up: function () {
	    seed++;
	    return seed;
	},
	down: function () {
	    seed--;
	    return seed;
	}
    };
    
  
}

var obj = counter(10);
debug(obj);
up = obj.up;
down = obj.down;
debug(up());
debug(down());
debug(down());
debug(up());
/*

var fib = fibof2(0,1);
debug(fib());
debug(fib());
debug(fib());
debug(fib());
debug(fib());
debug(fib());
debug(fib());
debug(fib());


/*
var conc = concat_all(fromTo(0,3), fromTo(0,2));
debug(conc());
debug(conc());
debug(conc());
debug(conc());
debug(conc());

debug(conc());

/*

var fil = filter(fromTo(0,5), (a) => (a%3) === 0);
debug(fil());
debug(fil());
debug(fil());
/*
var index = from(0);
debug(index());
debug(index());
debug(index());
debug(index());

var index_limited = to(from(1), 3);
debug(index_limited());
debug(index_limited());
debug(index_limited());
debug(index_limited());

var index_ranged = fromTo(0, 3);
debug(index_ranged());
debug(index_ranged());
debug(index_ranged());
debug(index_ranged());

var limited_add = limited(add, 1);
debug("********");
debug(limited_add(1,2));
debug(limited_add(1,2));
debug("********");

var bus = reverse(sub);
debug(bus(3,2));
var doubl = twice(add);
var square = twice(mul);
var d = square(11);
debug("hello: " + d);
var add3 = curry(add, 3);
var three = identityf(3);
var ff = liftf(add)(3);
var mulf = liftf(mul);

var c = composeu(doubl, square)(5);
debug("-----");
debug(c);

//3 different ways of writing inc function

//first way
var inc = curry(add, 1);

//second way
var inc2 = liftf(add)(1);

//third way
var inc3 = addf(1);

debug(inc3(5));
debug(inc3(inc(5)));



debug(mulf(5)(5));
debug(ff(4));
debug(add3(5));
*/
