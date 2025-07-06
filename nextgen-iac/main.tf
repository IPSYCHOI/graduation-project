provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "main" {
  name     = "NextGenRg"
  location = "Italy North"
}

resource "azurerm_app_service_plan" "node_plan" {
  name                = "ASP-NextGenRg-9d92"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Basic"
    size = "B1"
  }
}

resource "azurerm_app_service" "node_app" {
  name                = "ngu-question-hub"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  app_service_plan_id = azurerm_app_service_plan.node_plan.id

  https_only = true
  client_cert_mode = "Required"

  site_config {
    linux_fx_version            = "NODE|20-lts"
    always_on                   = false
    minimum_elastic_instance_count = 1
    http2_enabled               = false
  }

  app_settings = {
    LARAVELAPI             = "https://nextgenedu-database.azurewebsites.net/api/node/user"
    MONGO_LOCAL_URI        = "mongodb://admin:psycho@mongo:27017/graduation?authSource=admin"
    MONGO_ROOT_PASSWORD    = "psycho"
    MONGO_ROOT_USERNAME    = "admin"
    MONGO_URI              = "mongodb+srv://psycho:psycho.psycho@graduation.kzewb.mongodb.net/graduation"
    PORT                   = "80"
    SYSTEM_TOKEN           = "kfxuzk1pQESIimcee9rivOXGttoHiC8IlXaBFxhc3Y"
  }

  tags = {
    "hidden-link: /app-insights-resource-id"      = "/subscriptions/8d65d79f-55c5-4270-8b57-7b981a3d581b/resourceGroups/NextGenRg/providers/microsoft.insights/components/ngu-question-hub"
    "hidden-link: /app-insights-instrumentation-key" = "72651362-bdb9-47be-a9d2-64d6cada28a2"
    "hidden-link: /app-insights-conn-string"      = "InstrumentationKey=72651362-bdb9-47be-a9d2-64d6cada28a2;IngestionEndpoint=https://italynorth-0.in.applicationinsights.azure.com/;LiveEndpoint=https://italynorth.livediagnostics.monitor.azure.com/;ApplicationId=22295c2e-bfbe-41b8-ab19-85646b8bffe7"
  }
}
