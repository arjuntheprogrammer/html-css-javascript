var world = {};

var personWidth = 42;
var personHeight = 64;
$(document).ready(function() {
    $(document).click(function(event) {
        // alert("you clicked me!" + event.pageX + " " + event.pageY);
        $("#hero_div").css("top", event.pageY + "px");
        $("#hero_div").css("left", event.pageX + "px");

    });
    world.people = [];
    world.collectable = []
    world.people.push({ el: $("#extra1"), top: 0, left: 0, directionX: 1, directionY: 1 });
    world.people.push({ el: $("#extra2"), top: 0, left: 500, directionX: 1, directionY: 1 });
    world.people.push({ el: $("#extra3"), top: 100, left: 0, directionX: 1, directionY: 1 });
    world.people.push({ el: $("#extra4"), top: 100, left: 500, directionX: 1, directionY: 1 });
    createCollectables(5);
    movePeople();

});

function createCollectables(num) {
    for (var i = 0; i <= num; i++) {
        $("body").append("<div id ='collectable" + i + "' class = 'collectable'></div>");

        var top = Math.random() * 340;
        var left = Math.random() * 540;
        $("#collectable" + i).css("left", left + "px");
        $("#collectable" + i).css("top", top + "px");

        world.collectable.push({ el: $("collectable" + i), top: top, left: left });

    }
}

function movePeople() {
    for (num in world.people) {
        //console.log("here, num = ", num);
        var person = world.people[num];

        var original_top = person.top;
        var original_left = person.left;

        person.top = person.top + (parseInt(Math.random() * 10) * person.directionY);
        person.left = person.left + (parseInt(Math.random() * 10) * person.directionX);

        if (checkCollision(person, num)) {

            person.top = original_top;
            person.left = original_left;

        }

        //console.log(person.top, person.left);
        if (Math.random() > .95) {
            person.directionY = -person.directionY;
        }
        if (Math.random() > .95) {
            person.directionX = -person.directionX;
        }
        if (person.left < 5) {
            person.left = 5;
        }
        if (person.left > 840) {
            person.left = 840;
        }
        if (person.top < 5) {
            person.top = 5;
        }
        if (person.top > 640) {
            person.top = 640;
        }
        // if (checkCollision(person, num)) {

        //     console.log("here");
        //     //world.people[other].top -= 20;
        //     person.top += personHeight;
        //     //world.people[other].left -= 20;
        //     person.left += personWidth;
        // }

        //console.log(person.top, person.left, "\n\n");
        person.el.css("top", person.top + "px");
        person.el.css("left", person.left + "px");

        //console.log(world);

    }
    setTimeout(movePeople, 10);


}

function checkCollision(person, num) {
    for (other in world.people) {
        if (other == num) continue;
        if (world.people[other].top <= personHeight + person.top &&
            world.people[other].top + personHeight >= person.top &&
            world.people[other].left + personWidth >= person.left &&
            world.people[other].left <= personWidth + person.left) {
            return true;
        }
        return false;
    }
}