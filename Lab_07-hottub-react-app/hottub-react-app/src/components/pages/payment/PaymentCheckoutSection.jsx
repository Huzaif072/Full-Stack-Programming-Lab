function PaymentCheckoutSection() {
  return (
    <>
      <div className="flex items-center justify-center gap-0 mb-8">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">1</div>
          <span className="ml-2 text-sm font-semibold text-red-600 hidden sm:inline">Billing Address</span>
        </div>
        <div className="w-12 md:w-24 h-px bg-gray-300 mx-2" />
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-sm">2</div>
          <span className="ml-2 text-sm font-semibold text-gray-500 hidden sm:inline">Payment Details</span>
        </div>
        <div className="w-12 md:w-24 h-px bg-gray-300 mx-2" />
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-sm">3</div>
          <span className="ml-2 text-sm font-semibold text-gray-500 hidden sm:inline">Review Order</span>
        </div>
      </div>

      <form id="paymentForm" noValidate>
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className="flex-1 min-w-0">
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                <span className="inline-block w-7 h-7 bg-red-600 text-white text-center rounded-full text-sm leading-7 mr-2">1</span>
                Billing Address
              </h2>
              <div className="space-y-4 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-semibold text-gray-600 mb-1">First Name *</label><input type="text" name="billingFirstName" className="form-input" required /><p className="error-message" /></div>
                  <div><label className="block text-sm font-semibold text-gray-600 mb-1">Last Name *</label><input type="text" name="billingLastName" className="form-input" required /><p className="error-message" /></div>
                </div>
                <div><label className="block text-sm font-semibold text-gray-600 mb-1">Email Address *</label><input type="email" name="billingEmail" className="form-input" required /><p className="error-message" /></div>
                <div><label className="block text-sm font-semibold text-gray-600 mb-1">Telephone *</label><input type="tel" name="billingPhone" className="form-input" required /><p className="error-message" /></div>
                <div><label className="block text-sm font-semibold text-gray-600 mb-1">Street Address *</label><input type="text" name="billingStreet" className="form-input" required /><p className="error-message" /></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div><label className="block text-sm font-semibold text-gray-600 mb-1">City *</label><input type="text" name="billingCity" className="form-input" required /><p className="error-message" /></div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">State/Province *</label>
                    <select name="billingState" className="form-input" required>
                      <option value="">Select...</option><option value="CA">California</option><option value="NY">New York</option><option value="TX">Texas</option><option value="FL">Florida</option>
                    </select>
                    <p className="error-message" />
                  </div>
                  <div><label className="block text-sm font-semibold text-gray-600 mb-1">Zip Code *</label><input type="text" name="billingZip" className="form-input" required /><p className="error-message" /></div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Country *</label>
                  <select name="billingCountry" className="form-input" required>
                    <option value="">Select...</option><option value="US">United States</option><option value="CA">Canada</option><option value="UK">United Kingdom</option>
                  </select>
                  <p className="error-message" />
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                <span className="inline-block w-7 h-7 bg-red-600 text-white text-center rounded-full text-sm leading-7 mr-2">2</span>
                Payment Information
              </h2>
              <div className="space-y-4 max-w-2xl">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Card Type *</label>
                  <select name="cardType" className="form-input" required>
                    <option value="">Select card type...</option>
                    <option value="visa">Visa</option><option value="mastercard">Mastercard</option><option value="amex">American Express</option><option value="discover">Discover</option>
                  </select>
                  <p className="error-message" />
                </div>
                <div><label className="block text-sm font-semibold text-gray-600 mb-1">Card Number *</label><input type="text" name="cardNumber" className="form-input" placeholder="XXXX XXXX XXXX XXXX" maxLength={19} required /><p className="error-message" /></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Expiration Month *</label>
                    <select name="expMonth" className="form-input" required>
                      <option value="">Month</option>
                      <option value="01">01 - January</option><option value="02">02 - February</option><option value="03">03 - March</option><option value="04">04 - April</option><option value="05">05 - May</option><option value="06">06 - June</option><option value="07">07 - July</option><option value="08">08 - August</option><option value="09">09 - September</option><option value="10">10 - October</option><option value="11">11 - November</option><option value="12">12 - December</option>
                    </select>
                    <p className="error-message" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Expiration Year *</label>
                    <select name="expYear" className="form-input" required>
                      <option value="">Year</option>
                      <option value={2024}>2024</option><option value={2025}>2025</option><option value={2026}>2026</option><option value={2027}>2027</option><option value={2028}>2028</option><option value={2029}>2029</option><option value={2030}>2030</option>
                    </select>
                    <p className="error-message" />
                  </div>
                  <div><label className="block text-sm font-semibold text-gray-600 mb-1">Security Code *</label><input type="text" name="cvv" className="form-input" placeholder="CVV" maxLength={4} required /><p className="error-message" /></div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200"><span className="inline-block w-7 h-7 bg-red-600 text-white text-center rounded-full text-sm leading-7 mr-2">3</span>Review Your Order</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="bg-gray-50"><th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th><th className="text-center py-3 px-4 font-semibold text-gray-700">Qty</th><th className="text-right py-3 px-4 font-semibold text-gray-700">Subtotal</th></tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr><td className="py-3 px-4"><div className="flex items-center gap-3"><img src="/assets/images/113152315_spa-566.png" alt="Spa" className="w-12 h-12 object-cover rounded" /><span className="text-gray-800 font-medium">5-7 Person 158 Jet Spa with Stereo System</span></div></td><td className="py-3 px-4 text-center text-gray-600">1</td><td className="py-3 px-4 text-right text-gray-800 font-semibold">$5,012.50</td></tr>
                    <tr><td className="py-3 px-4"><div className="flex items-center gap-3"><img src="/assets/images/113152315_spa-566_copy.png" alt="Spa" className="w-12 h-12 object-cover rounded" /><span className="text-gray-800 font-medium">TV Theater Spa - Premium Home Entertainment</span></div></td><td className="py-3 px-4 text-center text-gray-600">1</td><td className="py-3 px-4 text-right text-gray-800 font-semibold">$5,012.50</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-6">
              <label className="flex items-start gap-2 text-sm text-gray-600 mb-4"><input type="checkbox" name="terms" className="rounded mt-0.5" required /><span>I accept the <a href="/shopping/terms" className="text-red-600 hover:text-red-800 transition underline">Terms and Conditions</a> *</span></label>
              <p className="error-message mb-4" id="termsError" />
              <button type="submit" className="btn-red px-10 py-3 rounded font-bold text-sm tracking-wide">PLACE ORDER</button>
            </div>
          </div>

          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-4">
              <h3 className="font-bold text-gray-800 text-lg mb-4 pb-3 border-b border-gray-200">Order Summary</h3>
              <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between"><span className="text-gray-600">Cart Subtotal</span><span className="font-semibold text-gray-800">$10,025.00</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Shipping</span><span className="text-gray-600">$30.00</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Tax</span><span className="text-gray-600">$0.00</span></div>
              </div>
              <div className="border-t border-gray-200 pt-4 mb-4"><div className="flex justify-between"><span className="font-bold text-gray-800 text-base">Order Total</span><span className="font-bold text-red-600 text-xl">$10,055.00</span></div></div>
              <div className="mt-6 text-center"><a href="/shopping/cart" className="text-sm text-red-600 hover:text-red-800 transition"><i className="fas fa-arrow-left mr-1" />Edit Cart</a></div>
            </div>
          </aside>
        </div>
      </form>
    </>
  );
}

export default PaymentCheckoutSection;
