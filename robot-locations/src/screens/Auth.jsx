import React from "react";

const Auth = () => {
  return (
    <section className="auth">
      <div class="login-container">
        <form>
          <div class="mb-4">
            <h5 class="text-center">What's your phone number or email?</h5>
          </div>
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Enter phone number or email"
            />
          </div>
          <div class="d-grid">
            <button type="button" class="btn btn-dark btn-custom">
              Continue
            </button>
          </div>

          <div class="divider">or</div>

          <div class="d-grid mb-2">
            <button type="button" class="btn btn-outline-dark btn-google">
              <i class="bx bxl-google me-2"></i>Continue with Google
            </button>
          </div>
          <div class="d-grid mb-2">
            <button type="button" class="btn btn-outline-dark btn-apple">
              <i class="bx bxl-apple me-2"></i>Continue with Apple
            </button>
          </div>

          <div class="divider">or</div>

          <div class="d-grid">
            <button type="button" class="btn btn-outline-dark btn-qr">
              <i class="bx bx-qr me-2"></i>Log in with QR code
            </button>
          </div>

          <p class="form-text mt-3">
            By proceeding, you consent to get calls, WhatsApp or SMS messages,
            including by automated means, from Uber and its affiliates to the
            number provided.
          </p>
        </form>
      </div>
    </section>
  );
};

export default Auth;
