proc __variables__ {
}
costumes "ball/ball.png";

onflag {
    broadcast_and_wait "setup";
    forever {
        broadcast "render";
        update;
        time += 1;
    }
}

proc position {
    goto ball_DOT_x - camera_DOT_x, ball_DOT_y - camera_DOT_y;
}

proc setup {
    time = 0;
    level_DOT_width = 2;
    level_DOT_height = 2;
    ball_DOT_x = 25;
    ball_DOT_y = 25;
    ball_DOT_vel_DOT_x = 0;
    ball_DOT_vel_DOT_y = 0;
    camera_DOT_x = 0;
    camera_DOT_y = 0;
}

proc update {
    if key_pressed("right arrow") {
        ball_DOT_vel_DOT_x += 2;
    }
    if key_pressed("left arrow") {
        ball_DOT_vel_DOT_x += -2;
    }
    if touching("water") {
        ball_DOT_vel_DOT_y += -0.5;
    }
    else {
        ball_DOT_vel_DOT_y += -1;
    }
    if key_pressed("space") and ball_DOT_is_on_ground == 1 {
        ball_DOT_vel_DOT_y = 12;
    }
    if touching("water") {
        ball_DOT_vel_DOT_x *= 0.95;
    }
    else {
        ball_DOT_vel_DOT_x *= 0.8;
    }
    move_x round(ball_DOT_vel_DOT_x);
    move_y round(ball_DOT_vel_DOT_y);
    camera_DOT_x = ball_DOT_x;
    camera_DOT_y = ball_DOT_y;
    position;
}

proc move_x dx {
    ball_DOT_x += $dx;
    position;
    if touching("level") {
        slope_y abs($dx);
        if ball_DOT_slope == 1 {
            ball_DOT_is_on_ground = 1;
            ball_DOT_vel_DOT_y = -1;
            stop_this_script;
        }
        ball_DOT_vel_DOT_x = round(ball_DOT_vel_DOT_x * -0.5);
        until not touching("level") {
            if 0 < $dx {
                ball_DOT_x += -1;
            }
            else {
                ball_DOT_x += 1;
            }
            position;
        }
    }
}

proc move_y dy {
    ball_DOT_y += $dy;
    position;
    if touching("level") {
        slope_x 1;
        if ball_DOT_slope == 1 {
            ball_DOT_is_on_ground = 1;
            stop_this_script;
        }
        ball_DOT_vel_DOT_y *= -0.5;
        until not touching("level") {
            if 0 < $dy {
                ball_DOT_y += -1;
            }
            else {
                ball_DOT_y += 1;
                ball_DOT_is_on_ground = 1;
            }
            position;
        }
    }
    elif 1 < abs($dy) {
        ball_DOT_is_on_ground = 0;
    }
}

proc slope_y max {
    ball_DOT_slope = 0;
    repeat $max {
        ball_DOT_y += 1;
        position;
        if not touching("level") {
            ball_DOT_slope = 1;
            stop_this_script;
        }
    }
    ball_DOT_y += -$max;
}

proc slope_x max {
    ball_DOT_slope = 0;
    repeat $max {
        ball_DOT_x += 1;
        position;
        if not touching("level") {
            ball_DOT_slope = 1;
            stop_this_script;
        }
    }
    ball_DOT_x += -$max;
    ball_DOT_slope = 0;
    repeat $max {
        ball_DOT_x += -1;
        position;
        if not touching("level") {
            ball_DOT_slope = 1;
            stop_this_script;
        }
    }
    ball_DOT_x += $max;
}

on "dead" {
    broadcast_and_wait "setup";
}

on "setup" {
    setup;
}

