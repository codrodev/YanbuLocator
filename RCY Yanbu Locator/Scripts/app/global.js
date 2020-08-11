jQuery(function ($) {
    
    $.i18n().load({
        'en': '/Content/scripts/i18n/en.json',
        'ar': '/Content/scripts/i18n/ar.json'
    }).done(function () {
        $('html').i18n();

        $('.locale-switcher').on('click', 'a', function (e) {
            e.preventDefault();
            $.i18n().locale = $(this).data('locale');
            console.log($(this).data('locale'));
            $('html').i18n();
        });
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

function toggleLayer(e, layer) {
   
}

function closePopup(){
    resetPanels();
}