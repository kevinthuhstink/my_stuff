const _undefined = "cannot be undefined"; //const must be initialized with values
const _null = null; //const can be initialized with null
const int = 3; //js vars are untyped
const str = "Hello world!"
const boolean = true;

var arr = [ {}, str, int, _undefined, _null ] //python-like dynamic list
console.log( arr );
var stackop = arr.pop(); //arrays as stacks
console.log( arr.push() ); //returns len
console.log( "stackOP: " + stackop );
console.log( arr ); //would you look at that

var queueop = arr.shift();
console.log( "queueOP: " + queueop ); //arrays as queues
console.log( arr ); //would you look at that
console.log( arr.unshift( "front" ) ); //unshift returns len
console.log( arr ); //bring it back now

console.log( "\nsplicing: " + arr.splice( 1,5 )); //python-like array out of bounds
console.log( "arr is now: " + arr ); //python-like array out of bounds

/*
Math.abs()
Math.exp() = e^x
Math.pow() = x^y
Math.floor/ceil
Math.random()
also remember switch statements
*/

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
*/

function _default() {
    console.log( "creating blood red");
    return {
        carriage : "bloody",
        color : "red"
    };
}
var jslambda = function( _list ) {
    console.log( "\nthis is kind of embarassing" );
    console.log( "js lambda is crazy" );
    for (var thing in _list)
    if (_list.hasOwnProperty(thing))
        console.log( "jstruct has: " + thing + ' ' + _list[thing] );
}
/*
jslambda( _default() ); 
//setTimeout is unlike wait() because it keeps other lines running,
//it just tells this one to wait a bit before running its own function
setTimeout( jslambda, 1000 );//in js terms jslambda is a callback (jslambda() is a value)
setTimeout( _default, 1000 ); //apparently this works too???
//so function() == lambda
*/

/* popup boxes
confirm( "t/f" ); returns whatever the user chooses (true/false)
prompt( "this" ); returns "this"
alert( "!!" ); returns (?null) ?
*/

//lmaooo we even have lambda OPERATOR
const args = arg => "color: " + arg;
const margs = (arg, arg2) => { return "color: " + arg + arg2.splice( 0, 2 ) };
console.log( "\n" + args("bleeding blue"));
console.log( margs("bleeding blue", ["to", "hell", "with", "this"] ) );

var numbers = [ 3,4,4,5,6,7 ];
//var is the default scoping variable instantializer
//let is basically stupid
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
} */
const double = n => n * 2;
let newnums = numbers.map( double ); //like python but with more syntax
console.log( newnums );

//functions that require waiting in js are asynch
/*
function status() {
    const result = fetch( "/server/status" );
    //wont work because console logs result before result is actually fetched from server
    console.log( result.ok );
} */
//the concept of returning an unknown value is called a "promise"
//fetch returns a promise that it will return the proper value later