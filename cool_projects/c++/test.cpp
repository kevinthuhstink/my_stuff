#include <iostream>
#include <string>
using namespace std;

struct song {
	int calls;
	string name;
};

song* _init( string name ) {
	song* _new = new song;
	_new->calls = 0;
	_new->name = name;
	return _new;
}

void print_song( song* s ) {
	cout << s->name;
	s->calls++; //s is pass by value
}

int main() {
	song* nhelv = _init( "\'Nhelv\'\n" );
	string test = "Hello World!";
	do {
		//cout << test << nhelv.name;
		//cout << test + nhelv.name;
		cout << test;
		print_song( nhelv );
		cout << ( test + nhelv->name ).length() << '\n';
	} while ( nhelv->name != "\'Nhelv\'\n" ); //this is different from java
	cout << "do-while broken at " + to_string( nhelv->calls ) + "\n";
	return 0;
}
