terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
     }
  }

  backend "azurerm" {
    container_name = "event-tfstate"
    resource_group_name = "common_group"
    storage_account_name = "azcommonblob"
    key = "terraform.tfstate"
    access_key = "nx3GK1u6dnqQLfL79EVgc7fr1ZjeA7FxZJKygvK6BS3SAN6uk09ckKuFOgelIQ3La4fcui8XUMbh+AStcFN12A=="
  }
}



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