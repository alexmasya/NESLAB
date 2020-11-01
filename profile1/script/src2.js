

  


var fileName;



function snov( )
{
	var str = "<object><embed src=\"C:\\Users\\Александр\\Desktop\\Задание.pdf\" width=\"100%\" height=\"100%\"  /></object>";  
	$('#pdfTo').prepend(str);
}
 
  $('#case').on('click',function(event){
    event.preventDefault();
});
function onot(){
    izm.innerHTML='';
	$('#izm').prepend(strCase);
	jock();
}
var formTO = '<form id="upload-container" method="POST" action="send.php">'+
'<img id="upload-image" src="upload.svg">'+
'<div>'+
'<input id="file-input" type="file" name="file" multiple>'+
'<label for="file-input">Выберите файл</label>'+
'<span>или перетащите его сюда</span>'+
'</div>'+
'</form>';


var strCase = '<div class="container-fluid">'+
'<div id="pdfTo">'+
formTO+
'</div>'+
'</div>';




function jock(){
	var dropZone = $('#upload-container');

	$('#file-input').focus(function() {
		$('label').addClass('focus');
	})
	.focusout(function() {
		$('label').removeClass('focus');
	});


	dropZone.on('drag dragstart dragend dragover dragenter dragleave drop', function(){
		return false;
	});

	dropZone.on('dragover dragenter', function() {
		dropZone.addClass('dragover');
	});

	dropZone.on('dragleave', function(e) {
		let dx = e.pageX - dropZone.offset().left;
		let dy = e.pageY - dropZone.offset().top;
		if ((dx < 0) || (dx > dropZone.width()) || (dy < 0) || (dy > dropZone.height())) {
			dropZone.removeClass('dragover');
		}
	});

	dropZone.on('drop', function(e) {
		dropZone.removeClass('dragover');
		let files = e.originalEvent.dataTransfer.files;
		
		pdfTo.innerHTML='';
		
		sendFiles(files);
		snov();
	});

	$('#file-input').change(function() {
		let files = this.files;
		
		pdfTo.innerHTML='';
		
		sendFiles(files);
		snov();
	});


	function sendFiles(files) {
		let maxFileSize = 5242880;
		let Data = new FormData();
		fileName = files.name;
		$(files).each(function(index, file) {
				
		});
		
	}
}