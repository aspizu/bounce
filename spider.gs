proc __variables__ {
    x = 0;
    y = 0;
    start_DOT_x = 0;
    start_DOT_y = 0;
    end_DOT_x = 0;
    end_DOT_y = 0;
}
costumes "spider/spider.png";

on "render" {
    if x == "no" {
        hide;
    }
    else {
        update;
        show;
    }
    goto x - camera_DOT_x, y - camera_DOT_y;
    if touching("ball") {
        broadcast "dead";
    }
}

on "setup" {
    spawn 0, 0, 0, 0, 0, -100;
    spawn -100, -100, 0, 0, 0, 0;
    x = "no";
}

proc spawn x, y, start_DOT_x, start_DOT_y, end_DOT_x, end_DOT_y {
    x = $x;
    y = $y;
    start_DOT_x = $start_DOT_x;
    start_DOT_y = $start_DOT_y;
    end_DOT_x = $end_DOT_x;
    end_DOT_y = $end_DOT_y;
    clone;
}

proc update {
    x = start_DOT_x + (end_DOT_x - start_DOT_x) * (abs(time % 128 - 64) / 64);
    y = start_DOT_y + (end_DOT_y - start_DOT_y) * (abs(time % 128 - 64) / 64);
}

on "dead" {
    delete_this_clone;
}

