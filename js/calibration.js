var PointCalibrate = 0;
var CalibrationPoints={};

/**
* This function listens for button clicks on the html page
* checks that all buttons have been clicked 5 times each, and then goes on to measuring the precision
*/
$(document).ready(function() {
    $(".Calibration").click(function(){

      var id = $(this).attr('id');
      console.log(id);
      if (!CalibrationPoints[id]){
        CalibrationPoints[id]=0;
      }

      CalibrationPoints[id]++;
      console.log(CalibrationPoints[id]);
      if (CalibrationPoints[id]>=5){ //only turnns red after 5 clicks
        $(this).css('background-color','red');
        $(this).prop('disabled', true); //disables the button
        PointCalibrate++;

          if (PointCalibrate == 9){ // last point is calibrated
            for(count = 1; count < 10; count++){ // loops through all buttons & hides them
              if (count != 5){
                var name = 'Pt' + count;
                document.getElementById(name).style.visibility = 'hidden';
              }
            }
            // clears the canvas
            var canvas = document.getElementById("plotting_canvas");
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            // notification for the measurement process
            swal({
              title: "Calculating measurement",
              text: "Please stare at the middle dot for the next 5 seconds as we calculate the precision",
              allowEscapeKey: false,
              allowOutsideClick: false,
              closeOnConfirm: true,
              timer: 4000
            }, function(isConfirm){
              if (isConfirm){
                // makes the variables true for 5 seconds & plots the points
                $(document).ready(function(){
                  draw_points_variable(); //  starts drawing prediction points on the canvas
                  sleep(5000).then(() => {
                      stop_drawing_points_variable(); //  stops drawing prediction points on the canvas

                      swal({
                        title: "Your accuracy measure is 55%",
                        showCancelButton: true,
                        allowOutsideClick: false,
                        showConfirmButton: true,
                        cancelButtonText: "recalibrate"
                      }, function(isConfirm){
                        if (isConfirm){
                          //idk what we do if they confirm this
                        } else {
                          ClearCalibration();
                        }
                      });
                  });
                });
              }
            });
          }
      }
    });
    swal({
      title: "Calibration",
      text: "Please click on the each of the 9 points on the screen. You must click each point 5 times till it goes red. This will calibrate your eye movements."
    });
});
function ClearCalibration(){
  $(".Calibration").css('background-color','yellow');
  $(".Calibration").prop('disabled',false);

  CalibrationPoints = {};

  PointCalibrate = 0;
  var canvas = document.getElementById("plotting_canvas");
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}
// sleep function because java doesn't have one, sourced from http://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
