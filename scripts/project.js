$(init);

//Функция выполняющаяся после загрузки страницы
function init() {
	// setEqualHeight($(".sidebar, .content"));
	initDialogSignUpInForm();
	initAlbomPage();
}

//Установка колонкам однинаковой высоты
function setEqualHeight(columns){
    var tallestcolumn = 0;
    columns.each(function(){
        currentHeight = $(this).height();
        console.log('tallestcolumn = ' +currentHeight);
        if(currentHeight > tallestcolumn){
            tallestcolumn = currentHeight;
        }
    });
    console.log('tallestcolumn = ' + tallestcolumn);
    columns.height(tallestcolumn);
}
//Инициализировать диалог для формы регистрации и авторизации
function initDialogSignUpInForm(){
	$('#wrapperSignUpForm').dialog({
	height: 410,
	width: 660,
	autoOpen: false,
	resizable: false,
	open: function(){
		$('#signUpButton').button();
		$('#signUpCancelButton').button().click(function(){
			$('#wrapperSignUpForm').dialog('close');
		});
		$('#signUpForm').validate({
			rules: {
				userName: {
					required: true,
					rangelength: [2, 14]
				},
				email: {
					required: true,
					email: true
				},
				userPassword: {
					required: true,
					minlength: 6
				},
				userRetryPassword: {
					equalTo: '#userPassword'
				}

			},
			messages: {
				userName: {
					required: 'Поле "Ваше имя" обязательно для заполнения',
					rangelength: 'Поле "Ваше имя" должно содержать от 2 до 14 символов'
				},
				email: {
					required: 'Введите адрес электронной почты',
					email: 'Поле "Почта" должно содержать адрес электронной почты'
				},
				userPassword: {
					required: 'Введите пароль',
					minlength: 'Пароль должен содержать не менее 6 символов'
				},
				userRetryPassword: {
					equalTo: 'Подтверждение пароля не совпадает с введеным паролем'
				}
			},
			errorPlacement: errorMsgValidFormOutput
		});
	}
	});
	$('#wrapperSignInForm').dialog({
	height: 320,
	width: 420,
	autoOpen: false,
	resizable: false,
	open: function(){
		$('#signInButton').button();
		$('#signInCancelButton').button().click(function(){
			$('#wrapperSignInForm').dialog('close');
		});
		$('#signInForm').validate({
			rules: {
				userName: {
					required: true,
					rangelength: [2, 14]
				},
				userPassword: {
					required: true,
					minlength: 6
				}				
			},
			messages: {
				userName: {
					required: 'Введите имя',
					rangelength: 'Имя должно содержать от 2 до 14 символов'
				},
				userPassword: {
					required: 'Введите пароль',
					minlength: 'Пароль должен содержать не менее 6 символов'
				},
			},
			errorPlacement: errorMsgValidFormOutput

		});
	}
	});	
	$('#sign-up').click(
		function() {
			$('#wrapperSignUpForm').dialog('open');
	});
	$('#sign-in').click(
		function() {
			$('#wrapperSignInForm').dialog('open');
	});	
}
// Метод выводящий сообщения об ошибках валидации форм
function errorMsgValidFormOutput(error, element) {
	var serchSelector = 'em[data-for="' + element.attr('name') + '"]'
	var scopeSerch = element.parent().parent();
	var errorPlace = scopeSerch.find(serchSelector);
	errorPlace.empty();
	var errorText = error.text();
	errorPlace.append(errorText);
}
// Инициализация страницы альбома
function initAlbomPage() {
	$(document).delegate('.sendCommentBtn', 'click', handelSubmitForm);
	$(document).delegate('.commentFile', 'change', handelChangeFile);
	$(document).delegate('.addFileBtn', 'click', handelClickFileBtn);
	// Обработка вывода формы добавления ответа к комментарию
	$('.answerCommentBtn').click(function(event) {
		$('#addCommentFormAnswer').remove();
		var htmlFormAnswerComment;
		var parentCommentId = $(event.currentTarget).attr('data-comment-id');
		var htmlFormAnswerComment = '' +
		'<form id="addCommentFormAnswer" class="addCommentForm" action="" method="post" enctype="multipart/form-data">' +
			'<textarea name="comment" class="addingText commonText" placeholder="Введите комментарий" rows="4"></textarea><br/>' +
			'<div class="sendCommentBtn commonText itemLineBtnCommentForm">Добавить комментарий</div>' +
			'<div id="cancelAnswer" class="commonText itemLineBtnCommentForm">Отмена</div>' +
			'<label for="commentFileAnswer" id="addFileBtn" class="addFileBtn itemLineBtnCommentForm" title="Добавить файл"></label>' +
			'<input id="commentFileAnswer" class="commentFile" type="file" name="commentFile" />' +
			'<input type="hidden" name="parentCommentId" value="' + parentCommentId + '"/>' +
		'</form>';
		$(event.currentTarget).parent().parent().append(htmlFormAnswerComment);
		$('#cancelAnswer').click(function(event) {
			$(event.currentTarget).parent().remove();
		});
	});
	// Обработка загрузки файлов изображений
	$('#imgFiles').change(function(event) {
		$(event.currentTarget).parent().submit();
	});
}
var valueCommentFile = '';
// Обработка отправки комментария
function handelSubmitForm(event){
	var target = $(event.currentTarget);
	var commentText = target.parent().find('textarea').val();
	if(commentText.length > 0 && !commentText.match(/^\s*$/)){
		target.parent().submit();
	}
}
// Добавлениеп файла
function handelChangeFile(event) {
	var target = $(event.currentTarget);
	if(valueCommentFile.length == 0){
		$('<img src="img/attachment.png" class="imgCommentFile itemLineBtnCommentForm" title="Добавленный файл"/>').insertBefore(target);
		$('imgCommentFile').click(handelClickFileBtn);
		target.parent().find('img').click(function() {
			$('#confirmDeleteFile').dialog({
				height: 160,
				width: 300,
				autoOpen: false,
				resizable: false,
				buttons: [ {
								text: 'Удалить',
								click: function() {
									target.parent().find('img').remove();
									target.val('');
									$('#confirmDeleteFile').dialog('close');
							}
							}, {
								text: 'Отмена',
								click: function() {
									$('#confirmDeleteFile').dialog('close');
								}
							}
						]
			});
			$('#confirmDeleteFile').dialog('open');
			$('#confirmDeleteFile').css('display', 'block');
		});
	}
}
// Щелчок по кнопке "Добавить файл", нужно для того чтобы запомнить добавленное значение для файла
// в глобальной переменной
function handelClickFileBtn(event){
	var target = $(event.currentTarget);
	var valueFile = target.parent().find('input').val();
	valueCommentFile = valueFile;
}