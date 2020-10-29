var the_bg_colour = [0, 0, 0];
var the_fill_colour = [0, 0, 0];

function bang() {
    var [r, g, b] = the_bg_colour;

    with (sketch) {
        glclearcolor(r, g, b);
        glclear();
    }

    [r, g, b] = the_fill_colour;

    with (sketch) {
        moveto(0, 0);
        glcolor(r, g, b);
        circle(0.8);
    }

    refresh();
}

function bg_colour(r, g, b) {
    the_bg_colour = [r, g, b];
    bang();
}

function fill_colour(r, g, b) {
    the_fill_colour = [r, g, b];
    bang();
}

sketch.default2d();
bang();

post(Date());
post();
