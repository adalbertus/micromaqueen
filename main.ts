    function driveStop() {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 0)
    }

    function driveForward(speed : number = 255, time : number = 0){
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, speed)
        if(time > 0) {
            basic.pause(time)
            driveStop()
        }
    }

    function driveBackward(speed : number = 255, time : number = 0){
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, speed)
        if(time > 0) {
            basic.pause(time)
            driveStop()
        }
    }

    
    function turn(direction : Direction, speed : number = 255, time : number = 200) {
        if(direction == Direction.Right) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speed)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
        } else {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speed)
        }
        if(time > 0) {
            basic.pause(time)
            driveStop()
        }
    }

    function turn10(direction : Direction) {
        turn(direction, 150, 50)
    }

    function turn45(direction : Direction) {
        turn(direction, 200, 200)
    }

    function turn90(direction : Direction) {
        turn(direction, 255, 450)
    }

    function turn180(direction : Direction) {
        if(direction == Direction.Right) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 255)
        } else {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 255)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
        }
        
        basic.pause(550)
        driveStop()    
    }

    function isPatrolWhite(patrol : maqueen.Patrol) {
        if(patrol == maqueen.Patrol.PatrolRight) {
            return maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1
        } 
        return maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1
    }

    function isObstacle(distance : number = 5) {
        return maqueen.Ultrasonic(PingUnit.Centimeters) < distance && maqueen.Ultrasonic(PingUnit.Centimeters) != 0
    }

    function bypassIfNeededObstacle() {
        if(isObstacle()) {
            let obstacleDirection = Direction.Right
            if(Math.randomBoolean()) {
                obstacleDirection = Direction.Left
            }
            driveBackward(50, 500)
            turn45(obstacleDirection)
            if(isObstacle()) {
                driveBackward(50, 100)
                turn10(obstacleDirection)
            }
        }
    }

    function followTheLine () {    
        if (isPatrolWhite(maqueen.Patrol.PatrolRight) && isPatrolWhite(maqueen.Patrol.PatrolLeft)) {
            driveForward(50)
        } else if (isPatrolWhite(maqueen.Patrol.PatrolRight) && !isPatrolWhite(maqueen.Patrol.PatrolLeft)) {
            turn10(Direction.Left)
        } else if (!isPatrolWhite(maqueen.Patrol.PatrolRight) && isPatrolWhite(maqueen.Patrol.PatrolLeft)) {
            turn10(Direction.Right)
        }
    }

let roboMode = "STOP"

basic.showIcon(IconNames.Heart)
basic.clearScreen()

control.inBackground(function () {
    if(roboMode == "LINE") {
        if(isObstacle()) {
            driveStop()
            basic.pause(100)
        }
    }        
})

input.onButtonPressed(Button.A, function () {
  basic.pause(200)
  basic.showArrow(ArrowNames.North)
  roboMode = "LINE"  
})

input.onButtonPressed(Button.B, function () {
    roboMode = "STOP"
    driveStop()
    basic.showIcon(IconNames.Asleep)
    basic.clearScreen()
})


basic.forever(function () {
    if(roboMode == "LINE") {
        followTheLine()
    }
})
