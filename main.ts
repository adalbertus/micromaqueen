    function driveStop() {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 0)
    }

    function driveForward(speed : number = 200, time : number = 0){
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, speed)
        if(time > 0) {
            basic.pause(time)
            driveStop()
        }
    }

    function driveBackward(speed : number = 200, time : number = 0){
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, speed)
        if(time > 0) {
            basic.pause(time)
            driveStop()
        }
    }

    function turn(direction : Direction, speed : number = 200, time : number = 200) {
        if(direction == Direction.Right) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speed)
        } else {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speed)
        }
        if(time > 0) {
            basic.pause(time)
            driveStop()
        }
    }

    function turn45(direction : Direction) {
        turn(direction, 200, 200)
    }

let roboMode = "STOP"

basic.showIcon(IconNames.Heart)
basic.clearScreen()

input.onButtonPressed(Button.A, function () {
  basic.pause(200)
  roboMode = "LINE"
  //driveForward(200, 500)
  turn45(Direction.Right)
})

input.onButtonPressed(Button.B, function () {
    roboMode = "STOP"
    turn45(Direction.Left)
})

function followTheLine () {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 200)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
    }
}

basic.forever(function () {
    if(roboMode == "LINE") {
        //followTheLine()
    }

})
