import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant'
import ENV from '../config/environment'

export default OAuth2PasswordGrant.extend({
  refreshAccessTokens: ENV['ember-simple-auth'].refreshAccessTokens,
  serverTokenEndpoint: ENV['ember-simple-auth'].serverTokenEndpoint,
  serverTokenRevocationEndpoint: ENV['ember-simple-auth'].serverTokenRevocationEndpoint
})
