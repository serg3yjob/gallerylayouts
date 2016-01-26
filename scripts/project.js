$(init);

//Функция выполняющаяся после загрузки страницы
function init() {
	// setEqualHeight($(".sidebar, .content"));
	initBtnSignUpForm();
	initDialogSignUpInForm();
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
	height: 250,
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
//Инициализировать кнопки jQuery для формы регистрации
function initBtnSignUpForm(){

}