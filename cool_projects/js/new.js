import { preorder } from "./export.mjs";
//const exp = require( './export.mjs' );
"use strict";
//this (keyword) is undefined in strict mode
// js vars (no explicit type) {{{
const _undefined = "cannot be undefined"; //const must be initialized with values
const _null = null; //const can be initialized with null
const int = 3; //js vars are untyped
const str = "Hello world!"
const boolean = true;
const bignum = 29859028450982058225n; //js is only capable of storing up to 10^15 (64-bit)
//const bignum = BigInt( 29859028450982058225 ); //can also be used on hex, octal, and binary
const bighex = 0x29835923275937295732895n;
const bigoct = 0o4000000000000000000000000000000n;
const bigbin = 0b1000000000000000000000000000000000000000000001n;
let x = 9007199254740992 === 9007199254740993;
//console.log( "int precision failure past 10^15:", x );

let strf = `formatting strs using variables instead of %s%d: ${str} ${int}`;
let rstrf = strf.replace( /s\w+(%|:| of)/, strf.length ); //so they can do regex and this. too
//console.log( rstrf );
// vars end }}}

// js arrays/stacks/queues/(deque?) {{{
var arr = [ {}, str, int, _undefined, _null ] //python-like dynamic list
//console.log( arr );
var stackop = arr.pop(); //arrays as stacks
//console.log( arr.push() ); //returns len
//console.log( "stackOP: " + stackop );
//console.log( arr ); //would you look at that

var queueop = arr.shift();
//console.log( "queueOP: " + queueop ); //arrays as queues
//console.log( arr ); //would you look at that
//console.log( arr.unshift( "front" ) ); //unshift returns len
//console.log( arr ); //bring it back now

//console.log( "\nsplicing: " + arr.splice( 1,5 )); //python-like array out of bounds
//console.log( "arr is now: " + arr );

/*
Math.abs()
Math.exp() = e^x
Math.pow() = x^y
Math.floor/ceil
Math.random()
also remember switch statements
end js arrays }}} */

// js structs {{{
//queueop contains an object because the og arr[0] was an "object"
var jsstruct = {
	carriage : "bloody",
	color : "red"
};
jsstruct.age = 900;
jsstruct.type = 'A';

/*
for ( var thing in jsstruct )
	if ( jsstruct.hasOwnProperty( thing ) )
		//unbelieveable that we actually have to verify that the thing belongs to the struct
		console.log( "jstruct has: " + thing + ' ' + jsstruct[thing] );
//equivalent of a hashmap or python dict (untyped)
//but we have to verify that the keys actually exist in the jstruct skull emoji
end js structs }}} */

// js function/lambda {{{
function _default() {
	console.log( "running func _default()" );
	return {
		carriage : "bloody",
		color : "red"
	};
}
var jslambda = function( _list ) {
	console.log( "\nrunning lambda" );
	for ( var thing in _list )
		if ( _list.hasOwnProperty(thing) )
			console.log( "jstruct has: " + thing + ' ' + _list[thing] );
}
/*
jslambda( _default() ); //most functions are asynch:
//setTimeout is unlike wait() because it keeps other lines running,
//it just tells this one to wait a bit before running its own function
setTimeout( jslambda, 1000 );//in js terms jslambda is a callback (jslambda() is a value)
setTimeout( _default, 1000 ); //apparently this works too???
*/

/* popup boxes
confirm( "t/f" ); returns whatever the user chooses (true/false)
prompt( "this" ); returns "this"
alert( "!!" ); returns (?null) ?
*/

//we even have lambda OPERATOR
//defines arg as a color in a string
const args = arg => "color: " + arg;
//defines arg as a color in a string, along with two elements of an array
const margs = (arg, arg2) => { return "color: " + arg + " -> " + arg2.splice( 0, 2 ) };
//console.log( "\n" + args( "bleeding blue" ) );
//console.log( margs( args( "bleeding blue" ), ["to", "hell", "with", "this"] ) );

//n => n * 2 is a standalone lambda expression
const _double = n => n * 2; //assign it to "double"
var numbers = [ 3,4,4,5,6,7 ];
let newnums = numbers.map( _double ); //like python but with more syntax
//console.log( newnums );
//end js function/lambda }}}

//js variable scoping (let/var-const) {{{
//var is the default scoping variable instantializer
//let basically instantiates a new var with the same name for this scope
/*
function varScoping() {
  var x = 1;

  if (true) {
	var x = 2;
	console.log(x); // will print 2
  }
  console.log(x); // will print 2
}

function letScoping() {
  let x = 1;

  if (true) {
	let x = 2;
	console.log(x); // will print 2
  }
  console.log(x); // will print 1
} //end js var scoping }}} */

// js promises (asynch) {{{
//functions require waiting in js, so js does things asynch
//
function _statusfail() {
	const result = fetch( "/server/status" );
	//wont work because console logs result before result is actually fetched from server
	console.log( result.ok );
}
//the concept of returning an unknown value is called a "promise"
//fetch returns a promise that it will return the proper value later

function _status() {
	const result = fetch( "/server/status" );

	result.then( function( status ) { //lambda again
		console.log( "server status: ", status.ok );
	} ); //close lambda, then close result.then
}
/* i guess result has type "Promise" object
 * Promise() constructor takes one parameter, a function f
 * f has two params, resolve and reject
 * and that function defines resolve OR reject for the Promise
 * cannot have both be defined, resolve() or reject() in f is given one at a time
 * then that Promise takes the variable type of either resolve or reject
 * schrodinger's variable type skull emoji
 */
function sum_async( x, y ) {
	//define the promise with a standalone lambda expr, omitting return because we just want to define resolve
	//lambda resolve, reject: resolve = x + y //resolve acts as the return statement-kinda
	const p = new Promise( ( resolve, reject ) => {
		resolve( x + y );
	}); //no return val, {} are necessary
	//i cannot understand lambda so this is the Java equivalent
	/* Promise sum( int x, int y ) {
	 *		temp_ret = new Promise(); //Promise has vars resolve and reject
	 *		temp_ret.resolve = x + y;
	 *		return temp_ret;
	 * }
	 */
	return p;
	//returns a promise of x+y instead of x+y explicitly
}

//then is an instance method of a Promise that waits for a resolve or reject
//resolve gives whatever intended return value we want
//reject "returns" (doesn't throw) an error object
//whatever is returned first
sum_async( 2, 3 ).then( result => {
	//console.log( "2 + 3 =", result );
}); //end promises }}}

//js promises: .then, .catch {{{
/* ok so apparently promises get way more complicated than that
 * the success and error handlers in Promise.then()
 * can individually return their own successes and errors
 *
 * our example Promise.then() only has one func param, the success handler
 * .then() can actually take two func params, the success and error handler
 * .then( success_handler(), error_handler() )
 * if the Promise takes resolve(), then Promise is fed into success_handler()
 * otherwise its fed into error_handler()
 *
 * both handlers() can throw their own successes and error, so
 * if reject() is used, and the error handler properly handles the error object,
 * then its all good and code continues where we left off
 * if success() is used and we had an unaccounted Promise value,
 * it then return-throws its own error and we have to find a way to handle that
 *
 * OH MY GOD YOU CAN PASS PROMISES INTO RESOLVE/REJECT
 * life is literally over
 */

//var data = [];
const errobj = new Promise( ( resolve, reject ) => {
	reject( "This is an error on purpose" );
	resolve( "This will go unseen" );
});
//console.log( "LOGGING ERROR IN ARRAY: ", data.push( errobj ) );

//be sure to use new w/ Promise cause Promise is an obj
const testpromise = new Promise( ( resolve, reject ) => {
	if ( false ) //if ( data.length == 0 )
		reject( "Empty array" );
	resolve; //resolve( data[0] );
}); //idk man putting parens around curly braces just seems off to me
testpromise.then( result => {
	console.log( result );
});
testpromise.catch( err => {
	console.log( err );
	//not displayed bcuz timeout gets skipped when error detected
	//setTimeout( function() { console.log( "\nall good though :)" ) }, 1000 );
	console.log( "\nall good though :)" );
});

//this error goes uncaught because testpromise was created and called before
//errobj's error was caught and handled
//if errobj was caught before testpromise's creation,
//the program would auto-exit after whatever function is contained within errobj.catch
errobj.catch( result => {
	//setting a timeout causes the function to not get called
	//the error was detected in testpromise, not errobj
	//so the machine rushes to get the rest of the program out and anything that isn't instant
	//like the below timeout
	//won't have an output
	//setTimeout( function() { console.log( "dip now", result ) }, 1000 );
	//console.log( "dip now", result )
});

/* since we dont catch the error before interacting with it, error message is:
LOGGING ERROR IN ARRAY: 1 ( line 196 )
2 + 3 = 5 ( line 167 ) //JS asynch is really noticeable
dip now This is an error on purpose ( line 225 )
This is an error on purpose ( line 210 )

all good though :) ( line 211 )
Error:
node:internal/process/promises:289
			triggerUncaughtException(err, true //fromPromise );
			^

[UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "This is an error on purpose".] {
  code: 'ERR_UNHANDLED_REJECTION' */

/* so what happened is the data array had an error object contained within it
 * and we logged the error message within the console when the error promise got pushed to the stack
 * then the testpromise checks what the first index of the array is
 *
 */

//end .then, .catch }}}

// js async, await {{{
//coroutines are functions that can pause execution and return to the main loop until something occurs
//in contrast with callbacks, functions that run within other functions
//await is used to tell js to stop this coroutine's exec until a promise resolves
//async is a keyword that defines a function as a coroutine

function sleep( time ) {
	let retp = new Promise( resolve => setTimeout( () => resolve( time ), time ) );
	//retp is a new Promise
	//the resolve case will be "please wait" after a timeout of some time (param)
	//and then the Promise will have resolve after resolve is ran
	//
	//let retp = new Promise( resolve => setTimeout( resolve, time ) );
	//the version above has no function callback in setTimeout, but still waits for some reason
	//
	//let retp = new Promise( resolve( "no wait" ) => setTimeout( resolve, time ) );
	//has no wait because resolve takes "no wait" immediately ( i think )
	console.log( "waiting..." );
	return retp;
}
//console.log( sleep( 2 ) ); //prints Promise { <pending> }
//sleep( 90 ).then( result => console.log( result ) ); //prints undefined, still calls setTimeout properly tho
//no reject means no error ( unless setTimeout decides to throw one and break everything )
//because resolve() has no execution/value, undefined is passed in as the value of Promise

//kinda simple to understand whats going on here tbh
async function asyncsum( x, y ) {
	let _p = sleep( 50 ); //coroutine asyncsum waits for sleep to end before finishing
	await _p; //wait for _p to have a value before proceeding
	console.log( _p );
	return new Promise( ( resolve, reject ) => {
		let n = x + y;
		if ( n < 0 )
			reject();
		resolve( n );
	} );
}
//for some reason async funcs return Promises but at this point i dont really care anymore
//below is a gigantic line that adds two integers and says "no negatives" if the sum is negative
//using promises and catches and async and i want to end it all
//asyncsum( 2, -3 ).then( result => console.log( "sum =", result ) ).catch( error => console.log( "no negatives" ) );
//end async, await }}}

//js structs part 2 {{{
//actually js struct/objects arent objects, theyre functions too
function node( value ) {
	this.val = value;
	this.next = null;
	this.str = () => {
		//console.log( this.val )
		if ( this.next == null )
			return "[" + this.val + "]->null";
		else
			return "[" + this.val + "]->" + this.next.str();
	}
}
var _thisnode = new node( 9 );
_thisnode.next = new node( "ONE BILLION" )
//console.log( _thisnode.str ); //prints [Function (anonymous)] cause str is a func
//console.log( _thisnode.str() ); //prints [9]->[ONE BILLION]->null

//binding methods to structs
//the bind() method of Function instances creates a new function that,
//when called, calls this function with "this" set to whatever provided to bind
function printll() { //can only be called with a binding
	console.log( this.str() );
}
function _printll( head ) {
	console.log( head.str() );
}
var _fbind = printll.bind( _thisnode.next ); //used for individual vars
//_fbind();//prints [ONE BILLION]->null
//var sbind = _printll.bind( node ); //kind of like an instance method
//sbind( new node(9) ); //prints [9]->null
//also absolutely useless, just call _printll

setTimeout( _thisnode.str, 100 ); //prints absolutely nothing?
//setTimeout( _fbind, 100 ) ); //ahhhh
//in the first setTimeout call, "this" is undefined because
//our scope is within a function, setTimeout
//even though _thisnode.str is a callback, it calls back to node.str
//so we have no "this" reference and the code does strange things

//var _fcall = printll.call( _thisnode.next ); //both run printll so they print stuff
//var _fapply = printll.apply( _thisnode.next );
//console.log( _fcall, _fapply ); //two undefineds
//because _fcall and _fapply are both undefined
//since printll has no return value
//call and apply store the return value of printll( _thisnode.next )

//holy shit a linked list }}}

// es6 addons {{{ 
//destructuring:
function treenode( value ) {
	this.value = value;
	this.left = null;
	this.right = null;
	this.str = function() {
		let ret = "";
		if ( this.left != null )
			ret += this.left.str();
		ret += ' ' + value + ' ';
		if ( this.right != null )
			ret += this.right.str();
		return ret;
	}
}
var root = new treenode( 1 );
root.left = new treenode( 2 );
root.right = new treenode( 3 );
console.log( root.str() );

function treemachine( { value, left, right } ) {
	//not all variables in a struct need to be called in the parameters
	let ret = "";
	if ( left != null )
		ret += left.str();
	ret += ' ' + value + ' ';
	if ( right != null )
		ret += right.str();
	return ret;
}

//identical to treenode.str()
console.log( treemachine( root ) );

//...op, Array.from
const tree = [ root.left, root, root.right ];
//const whatever = [ 56, new node( 100 ), new treenode( 17 ) ];
const whatever = Array.from( root.str() ); //gives an array of each char in the iterable
const fatlist = [...tree, ...whatever ];
//console.log( fatlist );
const fakekeys = fatlist.keys();

let keyslist = "";
for ( let k of fakekeys )
	keyslist += k.toString();
console.log( keyslist );
//for some reason js treats an array like a map with 0,1,...n as keys

//import/export
//import statement at top of file
console.log( preorder( root ) );
//doesnt work but i got something to return so good enough

// end es6 addons }}}

//ive come quite a far way havent i
