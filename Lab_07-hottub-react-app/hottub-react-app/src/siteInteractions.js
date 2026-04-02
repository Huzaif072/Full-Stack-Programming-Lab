import $ from 'jquery';

function bindMobileMenu() {
  $(document).off('click.hottub', '#hamburgerBtn');
  $(document).off('click.hottub', '#mobileMenuClose');
  $(document).off('click.hottub', '#mobileMenu a');

  $(document).on('click.hottub', '#hamburgerBtn', function () {
    $('#mobileMenu').addClass('open');
    $('body').css('overflow', 'hidden');
  });

  $(document).on('click.hottub', '#mobileMenuClose', function () {
    $('#mobileMenu').removeClass('open');
    $('body').css('overflow', '');
  });

  $(document).on('click.hottub', '#mobileMenu a', function () {
    $('#mobileMenu').removeClass('open');
    $('body').css('overflow', '');
  });
}

function bindTabs() {
  $(document).off('click.hottub', '.tab-btn');
  $(document).on('click.hottub', '.tab-btn', function () {
    const target = $(this).data('tab');
    $(this).siblings('.tab-btn').removeClass('active');
    $(this).addClass('active');
    $(this).closest('.tabs-container').find('.tab-content').removeClass('active');
    $(this).closest('.tabs-container').find(`#${target}`).addClass('active');
  });
}

function bindSearch() {
  $(document).off('submit.hottub', '#searchForm');
  $(document).on('submit.hottub', '#searchForm', function (e) {
    e.preventDefault();
    const query = $('#searchInput').val()?.trim() || '';
    if (query.length > 0) {
      window.alert(`Search for: "${query}" - This is a static demo.`);
    }
  });
}

function bindCart() {
  const updateCartTotal = () => {
    let total = 0;
    $('.cart-item').each(function () {
      const price = parseFloat($(this).find('.item-price').data('price')) || 0;
      const qty = parseInt($(this).find('.qty-input').val(), 10) || 1;
      const lineTotal = price * qty;
      $(this).find('.line-total, .item-subtotal').text(`$${lineTotal.toFixed(2)}`);
      total += lineTotal;
    });

    $('#cartSubtotal').text(`$${total.toFixed(2)}`);
    $('#cartTotal').text(`$${(total + 30).toFixed(2)}`);
  };

  $(document).off('click.hottub', '.qty-plus, .qty-increase');
  $(document).off('click.hottub', '.qty-minus, .qty-decrease');
  $(document).off('click.hottub', '.remove-item');

  $(document).on('click.hottub', '.qty-plus, .qty-increase', function () {
    const input = $(this).siblings('.qty-input');
    const val = parseInt(input.val(), 10) || 1;
    input.val(val + 1);
    updateCartTotal();
  });

  $(document).on('click.hottub', '.qty-minus, .qty-decrease', function () {
    const input = $(this).siblings('.qty-input');
    const val = parseInt(input.val(), 10) || 1;
    if (val > 1) {
      input.val(val - 1);
      updateCartTotal();
    }
  });

  $(document).on('click.hottub', '.remove-item', function (e) {
    e.preventDefault();
    $(this).closest('.cart-item').fadeOut(200, function () {
      $(this).remove();
      updateCartTotal();
    });
  });
}

function bindNewsletter() {
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

  $(document).off('submit.hottub', '#newsletterForm');
  $(document).on('submit.hottub', '#newsletterForm', function (e) {
    e.preventDefault();
    const email = $('#newsletterEmail').val()?.trim() || '';
    if (emailRegex.test(email)) {
      window.alert('Thank you for subscribing!');
      $('#newsletterEmail').val('');
    } else {
      window.alert('Please enter a valid email address.');
    }
  });
}

function bindForms() {
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[\d\s\-+()]{7,15}$/;

  const showError = (field, message) => {
    field.addClass('error');
    field.siblings('.error-message').text(message).addClass('show');
  };

  const clearError = (field) => {
    field.removeClass('error');
    field.siblings('.error-message').removeClass('show');
  };

  const clearAllErrors = (form) => {
    form.find('.form-input, .form-select').removeClass('error');
    form.find('.error-message').removeClass('show');
  };

  $(document).off('blur.hottub', '.form-input[required], .form-select[required]');
  $(document).off('focus.hottub', '.form-input, .form-select');

  $(document).on('blur.hottub', '.form-input[required], .form-select[required]', function () {
    const field = $(this);
    const value = String(field.val() || '').trim();
    const type = field.attr('type');

    clearError(field);

    if (value === '') {
      showError(field, 'This field is required.');
      return;
    }

    if (type === 'email' && !emailRegex.test(value)) {
      showError(field, 'Please enter a valid email address.');
      return;
    }

    if ((field.attr('name') || '').toLowerCase().includes('phone') && !phoneRegex.test(value)) {
      showError(field, 'Please enter a valid phone number.');
    }
  });

  $(document).on('focus.hottub', '.form-input, .form-select', function () {
    clearError($(this));
  });

  $(document).off('submit.hottub', '#loginForm');
  $(document).on('submit.hottub', '#loginForm', function (e) {
    e.preventDefault();
    const form = $(this);
    clearAllErrors(form);

    const email = form.find('[name="email"]');
    const password = form.find('[name="password"]');
    let valid = true;

    if (!emailRegex.test(String(email.val() || '').trim())) {
      showError(email, 'Please enter a valid email address.');
      valid = false;
    }

    if (String(password.val() || '').trim() === '') {
      showError(password, 'Password is required.');
      valid = false;
    }

    if (valid) {
      window.alert('Login successful! (Demo)');
    }
  });

  $(document).off('submit.hottub', '#registerForm');
  $(document).on('submit.hottub', '#registerForm', function (e) {
    e.preventDefault();
    const form = $(this);
    clearAllErrors(form);

    const email = form.find('[name="email"]');
    const password = form.find('[name="password"]');
    const confirm = form.find('[name="confirmPassword"], [name="re_password"]');
    const firstName = form.find('[name="firstName"], [name="first_name"]');
    const lastName = form.find('[name="lastName"], [name="last_name"]');
    let valid = true;

    if (!emailRegex.test(String(email.val() || '').trim())) {
      showError(email, 'Please enter a valid email address.');
      valid = false;
    }

    if (String(password.val() || '').length < 6) {
      showError(password, 'Password must be at least 6 characters.');
      valid = false;
    }

    if (String(confirm.val() || '') !== String(password.val() || '')) {
      showError(confirm, 'Passwords do not match.');
      valid = false;
    }

    if (String(firstName.val() || '').trim() === '') {
      showError(firstName, 'First name is required.');
      valid = false;
    }

    if (String(lastName.val() || '').trim() === '') {
      showError(lastName, 'Last name is required.');
      valid = false;
    }

    if (valid) {
      window.alert('Account created successfully! (Demo)');
    }
  });

  $(document).off('submit.hottub', '#forgotPasswordForm');
  $(document).on('submit.hottub', '#forgotPasswordForm', function (e) {
    e.preventDefault();
    const form = $(this);
    clearAllErrors(form);

    const email = form.find('[name="email"]');
    if (!emailRegex.test(String(email.val() || '').trim())) {
      showError(email, 'Please enter a valid email address.');
      return;
    }

    window.alert('Password reset link sent to your email! (Demo)');
  });

  $(document).off('submit.hottub', '#contactForm, #editBillingForm, #editShippingForm, #editAccountForm, #paymentForm');
  $(document).on('submit.hottub', '#contactForm, #editBillingForm, #editShippingForm, #editAccountForm, #paymentForm', function (e) {
    e.preventDefault();
    const form = $(this);
    clearAllErrors(form);

    let valid = true;
    form.find('[required]').each(function () {
      const field = $(this);
      const value = String(field.val() || '').trim();
      if (value === '') {
        showError(field, 'This field is required.');
        valid = false;
      }

      if (field.attr('type') === 'email' && value !== '' && !emailRegex.test(value)) {
        showError(field, 'Please enter a valid email address.');
        valid = false;
      }

      if ((field.attr('name') || '').toLowerCase().includes('phone') && value !== '' && !phoneRegex.test(value)) {
        showError(field, 'Please enter a valid phone number.');
        valid = false;
      }
    });

    const cardNumber = form.find('[name="cardNumber"], [name="card_number"]');
    if (cardNumber.length) {
      const cardValue = String(cardNumber.val() || '').replace(/\s+/g, '');
      if (cardValue && !/^\d{13,19}$/.test(cardValue)) {
        showError(cardNumber, 'Please enter a valid card number.');
        valid = false;
      }
    }

    const terms = form.find('[name="terms"]');
    if (terms.length && !terms.is(':checked')) {
      window.alert('Please accept the Terms and Conditions.');
      valid = false;
    }

    if (valid) {
      window.alert('Form submitted successfully! (Demo)');
    }
  });
}

function bindBackToTop() {
  const backToTop = $('#backToTop');
  if (!backToTop.length) return;

  $(window).off('scroll.hottub.backToTop');
  $(window).on('scroll.hottub.backToTop', function () {
    if ($(this).scrollTop() > 300) {
      backToTop.fadeIn(200);
    } else {
      backToTop.fadeOut(200);
    }
  });

  backToTop.off('click.hottub');
  backToTop.on('click.hottub', function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
  });
}

function bindGalleryAndCalculator() {
  $(document).off('click.hottub', '.thumbnail-img');
  $(document).off('change.hottub', '.calculator-select');

  $(document).on('click.hottub', '.thumbnail-img', function () {
    const src = $(this).attr('src');
    $(this).closest('.product-gallery').find('.main-product-img').attr('src', src);
    $(this).siblings('.thumbnail-img').removeClass('border-red-500');
    $(this).addClass('border-red-500');
  });

  $(document).on('change.hottub', '.calculator-select', function () {
    let total = 650;
    $('.calculator-select').each(function () {
      total += parseFloat($(this).find(':selected').data('price')) || 0;
    });
    $('#calculatorTotal').text(`$${total.toFixed(2)}`);
  });
}

export function initSiteInteractions() {
  bindMobileMenu();
  bindTabs();
  bindSearch();
  bindCart();
  bindNewsletter();
  bindForms();
  bindBackToTop();
  bindGalleryAndCalculator();
}
