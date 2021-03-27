# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :backend,
  ecto_repos: [Backend.Repo],
  mix_env: "{Mix.env()}"

# Configures the endpoint
config :backend, BackendWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "/sXNancvYeGawiPtRLYfAE2X5N8br4wCM92GeL3cpov/ll5uWJ4Ci0P0+dCYfGzx",
  render_errors: [view: BackendWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Backend.PubSub,
  live_view: [signing_salt: "ePL3319u"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :cors_plug,
  origin: ["http://events-spa.dialnerd.me"],
  max_age: 86400,
  methods: ["GET", "POST", "PATCH"],
  headers: [
        "Authorization",
        "Content-Type",
        "Accept",
        "Origin",
        "User-Agent",
        "DNT",
        "Cache-Control",
        "X-Mx-ReqToken",
        "Keep-Alive",
        "X-Requested-With",
        "If-Modified-Since",
        "X-CSRF-Token"
      ]

config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
