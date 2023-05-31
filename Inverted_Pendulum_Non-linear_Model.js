const { abs, cos, sin, sign } = require("mathjs");

var x = 0;
var xdot = 0;
var xddot = 0;
var theta = 0;
var thetadot = 0;
var thetaddot = 0;
var N = 0;
var P = 0;
var b = 13.4;
var l = 0.154;
var m = 0.15;
var d = 0.002;
var M = 1.1571;
var Kt = 0.00185121;
var g = 9.81;

function non_linear_model (force, Tsampling)
{   
    var N = 0;
    var P = 0;
    var thetaddot = 0;
    var xddot = 0;
    N = m*((acceleration(xdot, xddot, Kt)*1/M) - l*thetadot*thetadot*sin(theta) + l*thetaddot*cos(theta));
    P = m*(-l*thetadot*thetadot*cos(theta) - l*thetaddot*sin(theta) + g);
    xddot = force - N - (b*xdot);
    thetaddot = (((3/m)/l)/l)*(-N*l*cos(theta)) + P*l*sin(theta) - d*thetadot;
    N = m*((acceleration(xdot, xddot, Kt)*1/M) - l*thetadot*thetadot*sin(theta) + l*thetaddot*cos(theta));
    P = m*(-l*thetadot*thetadot*cos(theta) - l*thetaddot*sin(theta) + g);
    xdot += (acceleration(xdot, xddot, Kt)*1/M)*Tsampling;
    x += xdot*Tsampling;
    thetadot += thetaddot*Tsampling;
    theta += thetadot*Tsampling;
    return [x, xdot, theta, thetadot];

}

function acceleration(xdot, xddot, Kt)
{
    var friction = 0;
    var y = 0;
    if(xdot != 0)
    {
        friction = -1*3662.9*Kt*sign(xdot);
        y = xddot + friction;
    }
    else
    {
        if(abs(xddot) < (3662.9*Kt))
        {
            y = 0;
        }
        else
        {
            if(xddot == 0)
            {
                y = 0;
            }
            else
            {
                y = xddot + sign(xddot)*-1*3662.9*Kt;
            }
        }
    }
    return y;
}

for(var i = 0; i <= 15; i = i+0.005)
{
    var [position, velocity, angle, angularVelocity] = non_linear_model(10,0.005);
    console.log(position);
}