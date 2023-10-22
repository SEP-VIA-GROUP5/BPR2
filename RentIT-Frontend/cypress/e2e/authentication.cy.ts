describe('AuthenticationComponent', () => {
  describe('test login functionality and content', () => {
    it('should display the login content first when user enters the page', () => {
      cy.visit('/authentication');

      cy.document().then((doc) => {
        cy.contains('Login');
        expect(doc.body.querySelector('nb-card')).to.exist;
        expect(doc.body.querySelector('nb-card-body')).to.exist;
        expect(doc.body.querySelector('nb-form-field')).to.exist;
        expect(doc.body.querySelector('nb-form-field').querySelector('input')).to.exist;
      });

      cy.get('nb-form-field').eq(0).find('input').should('have.attr', 'placeholder', 'Email');
      cy.get('nb-form-field').eq(1).find('input').should('have.attr', 'placeholder', 'Password');
      cy.get('.submit-button').should('have.text', 'Login');
      cy.get('.submit-button').should('be.disabled');
    });

    it('should not enable login button if all inputs are fullfilled', () => {
      cy.visit('/authentication');

      cy.get('nb-form-field').eq(0).find('input').type('test@cypress.com');
      cy.get('nb-form-field').eq(1).find('input').should('have.value', '');
      cy.get('.submit-button').should('have.text', 'Login');
      cy.get('.submit-button').should('be.disabled');
    });

    // TODO commented as the backend api is not available on cloud
    // it('should not redirect user to products page if credentials are incorrect', () => {
    //   cy.visit('/authentication');

    //   cy.get('nb-form-field').eq(1).find('input').type('test@cypress.com');
    //   cy.get('nb-form-field').eq(2).find('input').type('apasswordfornoaccount');

    //   cy.get('.submit-button').click();
    //   cy.document().then((doc) => {
    //     expect(doc.location.pathname).to.equal('/authentication');
    //   });

    //   cy.request({
    //     method: 'POST',
    //     url: 'http://localhost:8080/user/login',
    //     failOnStatusCode: false,
    //   }).then((response) => {
    //     expect(response.status).to.equal(401);
    //   });
    // });

    // TODO commented as the backend api is not available on cloud
  //   it('should redirect to products page if credentials are correct', () => {
  //     cy.visit('/authentication');
  //     cy.intercept('POST', 'http://localhost:8080/user/login').as('loginRequest');

  //     cy.get('nb-form-field').eq(1).find('input').type('test@cypress.com');
  //     cy.get('nb-form-field').eq(2).find('input').type('StrongPassword1!');

  //     cy.get('.submit-button').click();

  //     cy.wait('@loginRequest').should(({ response }) => {
  //       expect(response.statusCode).to.equal(200);
  //     });
  //     cy.url().should('include', '/products');
  //   });
  });

  describe('test register functionality and content', () => {
    it('should change the content if user presses on register button', () => {
      cy.visit('/authentication');
      expect(cy.get('.register-redirect')).to.exist;
      cy.get('.register-redirect').click();

      cy.get('nb-form-field').eq(0).find('input').should('have.attr', 'placeholder', 'Email');
      cy.get('nb-form-field').eq(1).find('input').should('have.attr', 'placeholder', 'Phone number');
      cy.get('nb-form-field').eq(2).find('input').should('have.attr', 'placeholder', 'First name');
      cy.get('nb-form-field').eq(3).find('input').should('have.attr', 'placeholder', 'Last name');
      cy.get('nb-form-field').eq(4).find('input').should('have.attr', 'placeholder', 'Location');
      cy.get('nb-form-field').eq(5).find('input').should('have.attr', 'placeholder', 'Password');
      cy.get('nb-form-field').eq(6).find('input').should('have.attr', 'placeholder', 'Repeat password');
    });

    it('should not enable register button if all inputs are not fulfilled', () => {
      cy.visit('/authentication');
      expect(cy.get('.register-redirect')).to.exist;
      cy.get('.register-redirect').click();

      cy.get('nb-form-field').eq(0).find('input').type('test@cypress.com');
      cy.get('nb-form-field').eq(1).find('input').type('+4512345678');
      cy.get('.submit-button').should('have.text', 'Register');
      cy.get('.submit-button').should('be.disabled');
    });

    it('should not enable register button if passwords are not the same', () => {
      cy.visit('/authentication');
      expect(cy.get('.register-redirect')).to.exist;
      cy.get('.register-redirect').click();

      cy.get('nb-form-field').eq(0).find('input').type('test@cypress.com');
      cy.get('nb-form-field').eq(1).find('input').type('+4512345678');
      cy.get('nb-form-field').eq(2).find('input').type('Ioan');
      cy.get('nb-form-field').eq(3).find('input').type('Sorin');
      cy.get('nb-form-field').eq(4).find('input').type('Horsens');
      cy.get('.map-picker-button').click();
      cy.get('nb-form-field').eq(5).find('input').type('PasswordFavorite1!');
      cy.get('nb-form-field').eq(6).find('input').type('PassworFavorite1!');

      cy.get('nb-form-field').eq(5).find('input').should('have.class', 'invalid-field');
      cy.get('.submit-button').should('have.text', 'Register');
      cy.get('.submit-button').should('be.disabled');
    });

    it('should not enable register button if email is invalid', () => {
      cy.visit('/authentication');
      expect(cy.get('.register-redirect')).to.exist;
      cy.get('.register-redirect').click();

      cy.get('nb-form-field').eq(0).find('input').type('aninvalidemailwithoutat.com');
      cy.get('nb-form-field').eq(1).find('input').type('+4512345678');
      cy.get('nb-form-field').eq(2).find('input').type('Ioan');
      cy.get('nb-form-field').eq(3).find('input').type('Sorin');
      cy.get('nb-form-field').eq(4).find('input').type('Horsens');
      cy.get('.map-picker-button').click();
      cy.get('nb-form-field').eq(5).find('input').type('PasswordFavorite1!');
      cy.get('nb-form-field').eq(6).find('input').type('PasswordFavorite1!');

      cy.get('nb-form-field').eq(0).find('input').should('have.class', 'invalid-field');
      cy.get('.submit-button').should('have.text', 'Register');
      cy.get('.submit-button').should('be.disabled');
    });

    it('should not enable register button if phone number is invalid', () => {
      cy.visit('/authentication');
      expect(cy.get('.register-redirect')).to.exist;
      cy.get('.register-redirect').click();

      cy.get('nb-form-field').eq(0).find('input').type('test@cypress.com');
      cy.get('nb-form-field').eq(1).find('input').type('4512345da78');
      cy.get('nb-form-field').eq(2).find('input').type('Ioan');
      cy.get('nb-form-field').eq(3).find('input').type('Sorin');
      cy.get('nb-form-field').eq(4).find('input').type('Horsens');
      cy.get('.map-picker-button').click();
      cy.get('nb-form-field').eq(5).find('input').type('PasswordFavorite1!');
      cy.get('nb-form-field').eq(6).find('input').type('PasswordFavorite1!');

      cy.get('nb-form-field').eq(1).find('input').should('have.class', 'invalid-field');
      cy.get('.submit-button').should('have.text', 'Register');
      cy.get('.submit-button').should('be.disabled');
    });

    it('should not enable register button if password is invalid', () => {
      cy.visit('/authentication');
      expect(cy.get('.register-redirect')).to.exist;
      cy.get('.register-redirect').click();

      cy.get('nb-form-field').eq(0).find('input').type('test@cypress.com');
      cy.get('nb-form-field').eq(1).find('input').type('4512345da78');
      cy.get('nb-form-field').eq(2).find('input').type('Ioan');
      cy.get('nb-form-field').eq(3).find('input').type('Sorin');
      cy.get('nb-form-field').eq(4).find('input').type('Horsens');
      cy.get('.map-picker-button').click();
      cy.get('nb-form-field').eq(5).find('input').type('assdordfavorite1');
      cy.get('nb-form-field').eq(6).find('input').type('assdordfavorite1');

      cy.get('nb-form-field').eq(1).find('input').should('have.class', 'invalid-field');
      cy.get('.submit-button').should('have.text', 'Register');
      cy.get('.submit-button').should('be.disabled');
    });

    it('should open the window with the map picker when typing the location', () => {
      cy.visit('/authentication');
      expect(cy.get('.register-redirect')).to.exist;
      cy.get('.register-redirect').click();

      cy.get('nb-form-field').eq(4).find('input').type('Horsens');
      expect(cy.get('.map-picker-button')).to.exist;
      expect(cy.get('map-picker')).to.exist;
      expect(cy.get('.location-input')).to.exist;
      expect(cy.get('nb-window')).to.exist;
      expect(cy.get('.map-picker-button')).to.exist;
    });

    it('should save the location when pressing save button in window location', () => {
      cy.visit('/authentication');
      expect(cy.get('.register-redirect')).to.exist;
      cy.get('.register-redirect').click();

      cy.get('nb-form-field').eq(4).find('input').type('Horsens');
      cy.get('.location-input').type('Kolding');
      cy.get('.map-picker-button').click();
      cy.get('nb-form-field').eq(4).find('input').type('Kolding');
    });

    it('should call google api when typing location inside the window location', () => {
      cy.visit('/authentication');
      cy.get('.register-redirect').click();

      cy.get('nb-form-field').eq(4).find('input').type('Horsens');

      cy.intercept('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=Horsens&key=AIzaSyAGjAis9P3H5OB7bnPzZh5l-_FrgaOx-cE')
        .as('googleGeocodingApi');
      cy.wait('@googleGeocodingApi').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body).to.have.property('status', 'OK');
        expect(interception.response.body.results).to.be.an('array').that.is.not.empty;
        expect(interception.request.url).to.include('address=Horsens');
        expect(interception.request.url).to.include('key=AIzaSyAGjAis9P3H5OB7bnPzZh5l-_FrgaOx-cE');
      });

      it('should switch content to login after register is done', () => {
        cy.visit('/authentication');
        cy.get('.register-redirect').click();
        cy.intercept('POST', 'http://localhost:8080/user/register', {
          statusCode: 200,
        }).as('registerRequest');

        cy.get('nb-form-field').eq(0).find('input').type('test23@cypress.com');
        cy.get('nb-form-field').eq(1).find('input').type('+4512345678');
        cy.get('nb-form-field').eq(2).find('input').type('Ioan');
        cy.get('nb-form-field').eq(3).find('input').type('Sorin');
        cy.get('nb-form-field').eq(4).find('input').type('Horsens');
        cy.get('.map-picker-button').click();
        cy.get('nb-form-field').eq(5).find('input').type('StrongPassword1!');
        cy.get('nb-form-field').eq(6).find('input').type('StrongPassword1!');

        cy.get('.submit-button').should('have.text', 'Register');
        cy.get('.submit-button').should('be.enabled');
        cy.get('.submit-button').click();

        cy.get('nb-form-field').eq(0).find('input').type('test@cypress.com');
        cy.get('nb-form-field').eq(1).find('input').type('StrongPassword1!');

        cy.get('.submit-button').click();

        cy.wait('@registerRequest').should(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.get('nb-form-field').eq(0).find('input').should('have.attr', 'placeholder', 'Email');
        cy.get('nb-form-field').eq(1).find('input').should('have.attr', 'placeholder', 'Password');
        cy.get('.submit-button').should('have.text', 'Login');
      });
    });
  });
});
