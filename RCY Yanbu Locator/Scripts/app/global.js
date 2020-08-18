

jQuery(function ($) {
    
    $.i18n().load({
        'en': '/Content/scripts/i18n/en.json',
        'ar': '/Content/scripts/i18n/ar.json'
    }).done(function () {
        $('html').i18n();      

        $('.locale-switcher').on('click', function (e) {            
            e.preventDefault();
            console.log(localStorage.getItem('locale'));
            var locale = localStorage.getItem('locale') == null ? 'en' : localStorage.getItem('locale');
            locale = locale == 'en' ? 'ar' : 'en';
            localStorage.setItem('locale', locale);
            $.i18n().locale = locale;
            console.log(locale);
            $('html').i18n();

            setTooltips();
        });        

        setTooltips();
    });

    $(".popup .content").niceScroll();    

   
});

var menuVisible = false;
var cityPnlVisible = false;
var bankPnlVisible = false;
var hotelPnlVisible = false;
var fuelPnlVisible = false;
var hospitalPnlVisible = false;
var salahPnlVisible = false;
var busroutePnlVisible = false;
var currencyPnlVisible = false;
var weatherPnlVisible = false;
var taxiPnlVisible = false;
var rulesPnlVisible = false;
var historyPnlVisible = false;

function togglePanel(pnl) {
    resetPanels();

    switch (pnl) {
        case 'bank':
            bankPnlVisible = true;
            $('.bank-popup').addClass('d-block');
            break;
        case 'hotel':            
            hotelPnlVisible = true;
            $('.hotel-popup').addClass('d-block');
            onOpenhotelPopup();
            break;
        case 'fuel':
            fuelPnlVisible = true;
            $('.fuel-popup').addClass('d-block');
            break;
        case 'hospital':
            hospitalPnlVisible = true;
            $('.hospital-popup').addClass('d-block');
            break;
        case 'salah':
            salahPnlVisible = true;
            $('.salah-popup').addClass('d-block');
            break;
        case 'busroute':
            busroutePnlVisible = true;
            $('.busroute-popup').addClass('d-block');
            break;
        case 'currency':
            currencyPnlVisible = true;
            $('.currency-popup').addClass('d-block');
            break;
        case 'weather':
            weatherPnlVisible = true;
            $('.weather-popup').addClass('d-block');
            break;
        case 'taxi':
            taxiPnlVisible = true;
            $('.taxi-popup').addClass('d-block');
            break;
        case 'rules':
            rulesPnlVisible = true;
            $('.rules-popup').addClass('d-block');
            break;
        case 'history':
            historyPnlVisible = true;
            $('.history-popup').addClass('d-block');
            break;
    }
}

function resetPanels() {
    weatherPnlVisible = false;
    currencyPnlVisible = false;
    busroutePnlVisible = false;
    salahPnlVisible = false;
    cityPnlVisible = false;
    bankPnlVisible = false;
    hotelPnlVisible = false;
    fuelPnlVisible = false;
    hospitalPnlVisible = false;
    taxiPnlVisible = false;
    rulesPnlVisible = false;
    historyPnlVisible = false;
    $('.history-popup').removeClass('d-block');
    $('.bank-popup').removeClass('d-block');
    $('.hotel-popup').removeClass('d-block');
    $('.fuel-popup').removeClass('d-block');
    $('.hospital-popup').removeClass('d-block');
    $('.salah-popup').removeClass('d-block');
    $('.busroute-popup').removeClass('d-block');
    $('.currency-popup').removeClass('d-block');
    $('.weather-popup').removeClass('d-block');
    $('.taxi-popup').removeClass('d-block');
    $('.rules-popup').removeClass('d-block');
}

function toggleMenu() {
    if (menuVisible) 
        $('.menu-items').removeClass('d-block');
    else
        $('.menu-items').addClass('d-block');

    menuVisible = !menuVisible;
}

function closePopup(){
    resetPanels();
}

function setTooltips() {    
    $("#hotel").tooltip({ title: $.i18n("hotel"), placement: "top", trigger: "hover" });
    $("#hotel").attr('data-original-title', $.i18n("hotel"));
    $("#busroute").tooltip({ title: $.i18n("busroute"), placement: "top", trigger: "hover" });
    $("#busroute").attr('data-original-title', $.i18n("busroute"));
    $("#salah").tooltip({ title: $.i18n("salah"), placement: "top", trigger: "hover" });
    $("#salah").attr('data-original-title', $.i18n("salah"));
    $("#taxi").tooltip({ title: $.i18n("taxi"), placement: "top", trigger: "hover" });
    $("#taxi").attr('data-original-title', $.i18n("taxi"));
    $("#weather").tooltip({ title: $.i18n("weather"), placement: "top", trigger: "hover" });
    $("#weather").attr('data-original-title', $.i18n("weather"));
    $("#rules").tooltip({ title: $.i18n("rules"), placement: "top", trigger: "hover" });
    $("#rules").attr('data-original-title', $.i18n("rules"));
    $("#history").tooltip({ title: $.i18n("history"), placement: "top", trigger: "hover" });
    $("#history").attr('data-original-title', $.i18n("history"));
    $("#news").tooltip({ title: $.i18n("news"), placement: "top", trigger: "hover" });
    $("#news").attr('data-original-title', $.i18n("news"));
    $("#currency").tooltip({ title: $.i18n("currency"), placement: "top", trigger: "hover" });
    $("#currency").attr('data-original-title', $.i18n("currency"));
}