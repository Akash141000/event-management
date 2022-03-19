provider "azurerm" {
  client_id = var.serviceprinciple_id
  client_secret = var.serviceprinciple_key
  subscription_id = var.subscription_id
  tenant_id = var.tenant_id
  features {
    
  }
}


module "cluster" {
  source = "./modules/cluster/"
  serviceprinciple_id = var.serviceprinciple_id
  serviceprinciple_key = var.serviceprinciple_key
  location = var.location
  ssh_key = var.ssh_key
}