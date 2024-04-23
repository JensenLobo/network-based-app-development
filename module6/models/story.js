const {v4: uuidv4} = require('uuid');
const { DateTime } = require("luxon");
const stories = [
    {
        id: '1',
        title: 'My life at Charlotte',
        content: 'It is currently the fall semester of my senior year at Charlotte. I am having a blast with all of my classes and activites outside of school.',
        author: 'Jensen Lobo',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '2',
        title: 'Learning NBAD',
        content: 'In this module we are learning about how to use controllers, models and views in an application. Using partial headers and footers allow for changes to be made on the header or footer a lot easier. Editing a footer or header for a page is now a lot more convenient because now you no longer have to manually edit each individual html file.',
        author: 'Jensen Lobo',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '3',
        title: 'My Spring Break',
        content: 'Ahh the last spring break of my college experience will happen this academic year. My spring break will most likey contain me running a half-marathon, to see if I can beat the 2-hour mark. I have ran half-marathons before however, those were unoffical and this race will be an offical race.',
        author: 'Jensen Lobo',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    }
];

exports.find = () => stories;

exports.findById = id => stories.find(story => story.id === id);

exports.save = function(story) {
    story.id = uuidv4();
    story.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    stories.push(story);
};

exports.updateById = function(id, newStory){
    let story = stories.find(story => story.id === id);
    if(story){
        story.title = newStory.title;
        story.content = newStory.content;
        return true;
    } else{
        return false;
    }
};

exports.deleteById = function(id){
    let index = stories.findIndex(story => story.id === id);
    if(index !== 1){
        stories.splice(index, 1);
        return true;
    } else {
        return false;
    }
};
