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
});