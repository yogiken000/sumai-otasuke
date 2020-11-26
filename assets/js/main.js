// JavaScript Document
$(function () {
	//シュミレーション
	function isNumber(val) {
		var regex = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
		return regex.test(val);
	}
	function calc(pay, montlyPrice, interestRate) {
		var payment = pay * 10000;//借入金
		var interest = 0;
		var dt = new Date();//現在の日時
		dt.setDate(1);//日付を1日にする
		while (payment > 0) {
			var days = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);//今月の日数を取得
			var tmp = payment * (interestRate * (days.getDate() / 365));//今月の金利を計算する
			interest += tmp; //先月までの金利に今月の金利を追加する
			payment = payment + tmp - (montlyPrice * 10000);//借入金 + 金利 - 一ヶ月分の支払い額 = 総支払額
			dt.setMonth(dt.getMonth() + 1);//ひと月づつ追加していく
			if (payment > pay * 10000) return false;//総支払額 > 借入金になったらループを抜ける
		}
		return [Number(pay), Number(interest / 10000), dt];//借入金、金利、ループ最後の日付
	}
	$("#simulationBtn").click(function () {
		var pay = $("#payment").val();
		var monthlyPrice = $("#monthlyPrice").val();
		$("#monthlyPriceErr").hide();
		var nowData = calc(pay, monthlyPrice, $("#interestRate").val());
		if (nowData === false) {
			alert("借入金を返済することができません。返済金額をあげてください");
			/*gaEvent('set_checkout_option', 'repayment-simulation', 'faital_3', 0);
			analytics.send('repayment-simulation', {'payment' : pay, 'monthlyPrice' : monthlyPrice, 'interestRate' : $("#interestRate").val(), 'status' : 'faital'});*/
			return;
		}
		var newData = calc(pay, monthlyPrice, 0.0139);
		$("#paymentPrice").text(Math.round((nowData[0] + nowData[1])));//借入金 + 金利
		$("#payDay").text(nowData[2].getFullYear() + "年" + nowData[2].getMonth() + "月");//ループ最後の日付
		$("#now").text(pay);
		$("#newPaymentPrice").text(Math.round((newData[0] + newData[1])));//借入金 + 金利
		$("#newDiff").text(Math.round((nowData[1] - newData[1])));//比較
		$("#currentPay").show();
		$("#newPay").show();
		$(".lines").show();
		$("#contactBtn").show();
		// location.href = "#answerLine";
		/*gaEvent('set_checkout_option', 'repayment-simulation', 'complete', 0);
		analytics.send('repayment-simulation', {'payment' : pay, 'monthlyPrice' : monthlyPrice, 'interestRate' : $("#interestRate").val()});*/
	});



	//アンカー設定
	// #back-to-topを消す
	$('#pagetop').hide();

	// スクロールが十分されたら#back-to-topを表示、スクロールが戻ったら非表示
	$(window).scroll(function () {
		if ($(this).scrollTop() > 500) {
			$('#pagetop').fadeIn();
		} else {
			$('#pagetop').fadeOut();
		}
	});

	// アンカーリンク
	var headerHight = 120;
	$('a[href^="#"]').click(function () {
		var speed = 400;
		var href = $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top - headerHight;
		$('body,html').animate({ scrollTop: position }, speed, 'swing');
		return false;
	});

	/*初期表示*/
	// $('.ChangeElem_Panel').hide();
	/*クリックイベント*/
	$('.ChangeElem_Btn').each(function () {
		$(this).on('click', function () {
			var $radio_count = $(".radio_button_wrapper").length;
			var $checked_radio_count = $(".radio_button_wrapper").find('input[type="radio"]:checked').length;
			if ($checked_radio_count != $radio_count) {
				alert("上の項目を全てチェックしてください");
				$('.ChangeElem_Btn').removeClass('is-active');
				$('.ChangeElem_Panel').hide();
				return false;
			}
			var index = $('.ChangeElem_Btn').index(this);
			$('.ChangeElem_Btn').removeClass('is-active');
			$(this).addClass('is-active');
			$('.ChangeElem_Panel').hide();
			$('.ChangeElem_Panel').eq(index).show();
		});
	});
	//お気に入り
	$('#bookmarkme').click(function () {
		if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)) {
			alert('ご使用ブラウザのお気に入り、またはブックマーク機能をご使用下さい');
		} else {
			if (window.sidebar && window.sidebar.addPanel) { // Mozilla Firefox Bookmark
				window.sidebar.addPanel(document.title, window.location.href, '');
			} else if (window.external && ('AddFavorite' in window.external)) { // IE Favorite
				window.external.AddFavorite(location.href, document.title);
			} else if (window.opera && window.print) { // Opera Hotlist
				this.title = document.title;
				return true;
			} else { // webkit - safari/chrome
				alert('ブラウザ付属のブックマーク機能をご利用ください。' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? '【 Command 】' : '【 Ctrl 】') + ' + 【 D 】ボタンを押すとブックマークできます。');
			}
		}
	});
	$(function () {
		var $header = $('#header');
		// Nav Toggle Button
		$('#nav-toggle').on('click', function () {
			$header.toggleClass('open');
			$('.sp_nav').slideToggle();
		});

	});
});
