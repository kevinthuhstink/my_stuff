class Employee( object ):
    def __init__( self, first_name, last_name, title, hours_per_week, hourly_rate ):
        self.__first_name = first_name
        self.__last_name = last_name
        self.__title = title
        self.__hours_per_week = hours_per_week
        self.__hourly_rate = hourly_rate 

    def get_hourly_rate( self ):
        return self.__hourly_rate
    def set_hourly_rate( self, new_rate ):
        self.__hourly_rate = new_rate
    def get_total_compensation( self ):
        return 50 * self.__hours_per_week * self.__hourly_rate

""" test = Employee( "Kevin", "Cheng", "Intern", 40, 50 )
print( test.get_hourly_rate() ) """

class Manager( Employee ):
    def __init__( self, first_name, last_name, hours_per_week, hourly_rate, bonus_percent ):
        if bonus_percent < 0:
            raise AttributeError( "Manager bonus must be non-negative" )
        #Employee.__init__( self, first_name, last_name, title, hours_per_week, hourly_rate )
        #super() provides an instance referernce to Manager as an Employee 
        super().__init__( first_name, last_name, "Manager", hours_per_week, hourly_rate )
        #super( Manager, self ).__init__( first_name, last_name, "Manager", hours_per_week, hourly_rate )
        self.__bonus_percent = bonus_percent

    def get_total_compensation( self ):
        #return Employee.get_total_compensation( self ) * ( 1 + self.__bonus_percent / 100 )
        return super().get_total_compensation() * ( 1 + self.__bonus_percent / 100 )

brick = Manager( "Brick", "Brick", 90, 100, 5 )
print( brick.get_hourly_rate() )
print( Manager.get_hourly_rate( brick ) ) #holy shit class methods are both instance and static methods
print( brick.get_total_compensation() ) #uses Manager.get_total.compensation()
print( super( Manager, brick ).get_total_compensation() ) #uses Employee.get_total_compensation()
""" 
print( brick.super().get_total_compensation() ) 
    throws AttributeError: 'Manager' object has no attribute 'super'
test = Manager( "Kevin", "Cheng", "Intern", 40, 50, -10 )
    throws AttributeError: Manager bonus must be non-negative """
