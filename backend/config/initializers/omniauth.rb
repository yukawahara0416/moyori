Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter,
  Rails.application.credentials.dig(:twitter, :api_key),
  Rails.application.credentials.dig(:twitter, :api_secret),
  scope: 'email',
  callback_url: "http://localhost:3000/api/v1/auth/twitter/callback"
end
