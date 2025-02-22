proc __variables__ {
    x = 0;
    y = 0;
}
costumes "level/0,0.png", "level/1,0.png";

on "render" {
    switch_costume floor((camera_DOT_x + x) / 480) & "," & floor((camera_DOT_y + y) / 352);
    goto 240 + (x - camera_DOT_x), 176 + (y - camera_DOT_y);
}

on "setup" {
    x = 480;
    y = 0;
    clone;
    x = 0;
    y = 352;
    clone;
    x = 480;
    y = 352;
    clone;
    x = 0;
    y = 0;
}

