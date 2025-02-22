proc __variables__ {
    x = 0;
    y = 0;
    is_collected = 0;
}
costumes "ring/ring.png", "ring/ring2.png";

on "render" {
    goto x - camera_DOT_x, y - camera_DOT_y;
    if touching("ball") and is_collected == 0 {
        is_collected = 1;
        next_costume;
    }
}

on "setup" {
    is_collected = 0;
    switch_costume "ring";
    x = 16;
    y = 16;
    clone;
    x = -215;
    y = -140;
}

