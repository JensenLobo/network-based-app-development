
const { DateTime } = require('luxon'); 
const {v4: uuidv4} = require('uuid');
const events = [
    {
        id: '1',
        title: 'Banana Bread',
        details: 'Come out and learn one of the American Clasics, the Banana Bread. This is a very easy recipe that is basically made for beginners.',
        startTime: DateTime.local(2023, 12, 2, 17, 30).toLocaleString(DateTime.DATETIME_SHORT),
        endTime: DateTime.local(2023, 12, 2, 19, 0).toLocaleString(DateTime.DATETIME_SHORT),
        hostName: 'Summtin Yummy',
        location: 'Summtin Yummy Headquaters',
        category: 'American Recipes',
        image: "/images/bananaBread.jpg"

    },
    {
        id: '2',
        title: 'New York Cheesecake',
        details: 'Feeling like expanding your recipe book? Come here to learn how to make a New York Cheesecake.',
        startTime: DateTime.local(2023, 10, 19, 18, 30).toLocaleString(DateTime.DATETIME_SHORT),
        endTime: DateTime.local(2023, 10, 19, 20, 30).toLocaleString(DateTime.DATETIME_SHORT),
        hostName: 'Summtin Yummy',
        location: 'UREC Center',
        category: 'American Recipes',
        image: "/images/newYorkCheesecake.jpg"
    },
    {
        id: '3',
        title: 'Chicken Pot Pie',
        details: 'One of the best dinners that you would be able to make! Come to this class to learn about this awesome classic!',
        startTime: DateTime.local(2023, 11, 23, 18, 30).toLocaleString(DateTime.DATETIME_SHORT),
        endTime: DateTime.local(2023, 11, 23, 20, 30).toLocaleString(DateTime.DATETIME_SHORT),
        hostName: 'Charlotte Cooks',
        location: 'Bond Park Community Center',
        category: 'American Recipes',
        image: "/images/chickenPotPie.jpg"
    },
    {
        id: '4',
        title: 'Tim Tam Cheesecake',
        details: 'This is an Australian twist on the cheesecke. Using one of the Australian biscuts called a Tim Tam, we can create a tasteful cheesecake.',
        startTime: DateTime.local(2023, 10, 19, 18, 30).toLocaleString(DateTime.DATETIME_SHORT),
        endTime: DateTime.local(2023, 10, 19, 20, 30).toLocaleString(DateTime.DATETIME_SHORT),
        hostName: 'Bakers Delight',
        location: 'Apex Community Center',
        category: 'Foriegn Recipes',
        image: "/images/timTamCheesecake.jpeg"
    },
    {
        id: '5',
        title: 'Sushi',
        details: 'Come out and endulge in the some Japanese Cusine. Sushi is usually a popular dish that everyone loves to eat.',
        startTime: DateTime.local(2023, 10, 19, 18, 30).toLocaleString(DateTime.DATETIME_SHORT),
        endTime: DateTime.local(2023, 10, 19, 20, 30).toLocaleString(DateTime.DATETIME_SHORT),
        hostName: 'Craving Foods',
        location: 'All Purpose Hall',
        category: 'Foriegn Recipes',
        image: "/images/sushi.jpg"
    },
    {
        id: '6',
        title: 'Paella',
        details: 'When you combine seafood and Spanish Cooking you get a Palla. Come to this event to learn how to make the perfect Paella.',
        startTime: DateTime.local(2023, 10, 19, 18, 30).toLocaleString(DateTime.DATETIME_SHORT),
        endTime: DateTime.local(2023, 10, 19, 20, 30).toLocaleString(DateTime.DATETIME_SHORT),
        hostName: 'Food Freaks',
        location: 'Food Freaks Headquaters',
        category: 'Foriegn Recipes',
        image: "/images/paella.jpg"
    }

];

exports.find = () => events;

exports.findById = id => events.find(event => event.id === id);

exports.save = function(event) {
    event.id = uuidv4();
    events.push(event);
};

exports.updateById = function(id, newEvent){
    let event = events.findIndex(event => event.id === id);
    if(newEvent.title){
        events[event].title = newEvent.title;
    }
    if (newEvent.details){
        events[event].details = newEvent.details;
    }
    if (newEvent.location){
        events[event].location = newEvent.location;
    }
    if (newEvent.startTime){
        events[event].startTime = newEvent.startTime;
    }
    if (newEvent.endTime){
        events[event].endTime = newEvent.endTime;
    }
    if (newEvent.image){
        events[event].image = newEvent.image;
    }
    if(event === -1){
        return false;
    } 
    return true;
    
};

exports.deleteById = function(id){
    let index = events.findIndex(event => event.id === id);
    if(index !==-1) {
        events.splice(index, 1);
        return true;
    } else{
        return false;
    }
};

exports.getEvents = () => events;

exports.getDistinctCategories = function(){
    const categories = [...new Set(events.map(event => event.category))];
    return categories;
};
