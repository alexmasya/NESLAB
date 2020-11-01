
var code;
var strResh = '<div class="container-up">'+
'</div><div class="container-fluid"><div id="code">'+
  '<textarea id="arr"></textarea>'+
  '</div>'+
  '<div id="testion">'+
  '<textarea placeholder="Ввод данных" id="testadd"></textarea>'+
 '</div>'+ 
  '<div id="testi">'+
    '<textarea readonly="readonly" placeholder="Вывод данных" class="ryn" id="testadd"></textarea>'+
    '</div>'+
    '<div id="kno">'+
      '<button class="knopka" onclick="run()" id="func" >Выполнить</button>'+
    '<button class="knopka">Отправить</button>'+
    '</div>'+
  '</div>';


$('#resh').on('click',function(event){
    event.preventDefault();
});


function init(){
    izm.innerHTML='';
    $('#izm').prepend(strResh);
    aceE();
}


function aceE(){

    code = ace.edit('arr');
    code.setTheme("ace/theme/twiling");
    code.getSession().setMode("ace/mode/c_cpp");
    code.setShowPrintMargin(false);               // опционально: убираем вертикальную границу в 80 сиволов
    
        code.setOptions({
            autoScrollEditorIntoView: true,
            copyWithEmptySelection: true,
            minLines:100,
            maxLines: Infinity,                       // опционально: масштабировать редактор вертикально по размеру кода
            fontSize: "12pt",                         // опционально: размер шрифта ставим побольше
        });
        code.session.setTabSize(4);
        code.setShowPrintMargin(true);
        code.session.setUseWrapMode(true);
    code.$blockScrolling = Infinity;
}

ace.edit('arr').on('change',function(evnt){
    alert('Текст был изменен:'+e.getValue());
  });
ace.edit('arr').on('focus',function(evnt){
    alert('Начало редактирования');
  });


  function run() {
    // Команда для компиляции на удаленном сервере
    var cmd = "g++ -Wall main.cpp -o main_prog && echo 'Compilation: SUCCESS."
        + " Program output is:\n' && ./main_prog && echo \"\nExit code: $?\"";

    var output = $(".ryn");
    output.text('');
    var to_compile = {
        "src": code.getValue(),
        "cmd": cmd,
    };

    output.text("Executing... Please wait.");

    $.ajax({
        url: "http://coliru.stacked-crooked.com/compile",
        type: "POST",
        data: JSON.stringify(to_compile),
        contentType:"text/plain; charset=utf-8",
        dataType: "text"
    }).done(function(data) {
        output.text(data);
    }).fail(function(data) {
        output.text("Server error: " + data);
    });
};