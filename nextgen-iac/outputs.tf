output "node_app_url" {
  value = azurerm_app_service.node_app.default_site_hostname
}
