

var saveButton = $('.saveBtn');
var currentdayEL = $('#currentDay');
var textArea = $('textarea');
var allHOURS = $('#hour-00, #hour-01, #hour-02, #hour-03,#hour-04, #hour-05, #hour-06, #hour-07, #hour-08, #hour-09,#hour-10, #hour-11, #hour-12, #hour-13, #hour-14, #hour-15, #hour-16, #hour-17, #hour-18, #hour-19, #hour-20, #hour-21, #hour-22, #hour-23');


/////THIS SHOWS THE CURRENT DAY AT THE TOP OF THE SCREEN/////
currentdayEL.text(dayjs().format('MMM DD, YYYY'));
 
 
/////THIS FUNCTION IS CALLED CONTINUOUSLY THROUGH A SETINTERVAL FUNCTION. THIS FUNCTION THEN PERMANTELY LOOPS TEH ALLHOURS VARIABLE THROUGH AN EACH FUNCTION. CONTSTANTLY COMPARING EACH HOUR ID THE CURRENT HOUR, THEN ADDING OR REMOVING CLASSES TO IT DEPENDING ON THE LOGIC.
function backgroundColor() {
  var rightNow = dayjs().format('HH');

  allHOURS.each(function(){   
    var eventHourElement = $(this).attr('id').slice(5,7); 

    if (eventHourElement < rightNow) {
      $(this).removeClass('present');   
      $(this).addClass('past');
    } else if (eventHourElement === rightNow) { 
      $(this).removeClass('future'); 
      $(this).addClass('present');
    } else {
      $(this).removeClass('past');  
      $(this).addClass('future');
    }    
  })  
}
setInterval(backgroundColor, 1000);



////THIS FUNCTION GRABS THE DIV ID OF THE PARENTS FUNCTION OF THE saveBtn THAT WAS ACTIVITED, USES IT AS A KEY, THEN GRABS THE SIBLINGS TEXTBOX THROUGH GRABBING DESCRPTION, SAVES THEM BOTH TO STORAGE
saveButton.on("click", function( ){  
  var storageKey = $(this).parent().attr('id');
  var textBoxinfo = $(this).siblings('.description').val(); 
  localStorage.setItem(storageKey, JSON.stringify(textBoxinfo))
 
})

//////THIS FUNCTION WHEN THE PAGE LOADS/// IT LOOPS AND GRABS ALL CUURRENT STORED ITEMS AND ASSIGNS IT TO ITS CORRESPONDING TEXTBOX. 
function displayStoredItems () { 
    allHOURS.each(function(index,item){   
      var storageKey = $(this).attr('id'); ///hour ID
      var textBox = $(this).children('.description'); ///grabbing textbox
      
      var displayHourContents = JSON.parse(localStorage.getItem(storageKey)) || [];  ////THE STORAGE ITEM IS ALREADY A STRING, NOT AN OBJECT, BUT PARSING THIS REMOVES THE QUOTATION MARKS

      textBox.val(displayHourContents) 
    })
  }
    
  
displayStoredItems();
 
 

     
     
 
 
  