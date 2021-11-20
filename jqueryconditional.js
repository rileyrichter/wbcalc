$(document).ready(function () {
  $("#production-state").change(function () {
    $("#union-wrapper").show();
  });
  $("#union").change(function () {
    $("#contract-wrapper").show();
    var val = $(this).val();
    if (val == "SAG") {
      $("#contract").html(
        "<option value='recJcUe1ingx1E9IC'>SAG Commercial Agreement</option><option value='recIZuhNI3x062FSm'>SAG Feature Principle Performer</option><option value='recEhLkttesl6nGGD'>SAG Feature Background Performer</option><option value='recP4r9xdeIRtWcGV'>SAG New Media Principle Performer</option><option value='recgc46eTpiEOIdy1'>SAG New Media Background Performer</option><option value='receoQJ0Vmjj0fG3j'>SAG Sound Recording Performer</option><option value='recI81gISPSPT6oiU'>SAG Video Game Principle Performer</option>"
      );
    } else if (val == "Iatse") {
      $("#contract").html(
        "<option value='recpX1KKlgZug7UUW'>IATSE Music Video Over 500K Budget</option><option value='recPV7ftdEyawqrGM'>IATSE Music Video Under 500K Budget</option><option value='recGVp1TlnSW3HIKL'>IATSE AICP Commercial LA</option><option value='rec6Y6SAV1FWQbNLm'>IATSE NON-AICP Commercial LA</option><option value='recl7DhdXldFAhvDg'>IATSE 161</option><option value='recyQpdx2Gsd6OY2c'>IATSE 600</option><option value='recKchZAzKlpyEeZ6'>IATSE 52</option><option value='rec4bdVpcJNwUlSBw'>IATSE 829</option><option value='rec7CUeMBWZirirlo'>IATSE 798</option>"
      );
    } else if (val == "Teamsters") {
      $("#contract").html(
        "<option value='recSEWRh5YcLuo9xm'>Teamsters AICP Commercial LA Drivers</option><option value='recp4Olh4lSZuAvOd'> Teamsters NON-AICP Commercial LA Drivers</option><option value='recxhDtZmODu7c2Ev'> Teamsters AICP Commercial LA Location Managers</option><option value='recKhcNMMnl2tQfXR'> Teamsters NON-AICP Commercial Location Managers</option><option value='rec7rTTc0siJi4OCX'> Teamsters Music Video Under 500K Budget Drivers</option><option value='rec6i5q4hjMyI34xO'> Teamsters Music Video Over 500K Budget Drivers</option><option value='recqFDjSqxRZetBbl'> Teamsters Music Video Under 500K Budget Location Managers</option><option value='recUUKUnWTMxcJ7U1'> Teamsters Music Video Over 500K Budget Location Managers</option><option value='recMr4PRZHlj4WF5a'> Teamsters Music Video Music Video Agreement</option><option value='recqCROKTBz5umzyQ'> Teamsters Music Video Commercial AICP Agreement</option>"
      );
    } else if (val == "DGA") {
      $("#contract").html(
        "<option value='recn2B0dJl28OJNwL'>DGA Commercial AICP Agreement</option>"
      );
    } else if (val == "PHBP") {
      $("#contract").html(
        "<option value='recECrrLitsvmIMPw'>PHBP Commercial Agreement </option>"
      );
    }
  });
});
