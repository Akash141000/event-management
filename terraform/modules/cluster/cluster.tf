resource "azurerm_resource_group" "az_resource_group" {
    name = "event_management"
    location = var.location
}

resource "azurerm_container_registry" "az_container_registry" {
    name = "eventmanagementregistry"
    resource_group_name = azurerm_resource_group.az_resource_group.name
    location = azurerm_resource_group.az_resource_group.location
    sku = "Standard"
    admin_enabled = false
}


resource "azurerm_kubernetes_cluster" "az_kubernetes_cluster" {
    name = "eventmanagementcluster"
    resource_group_name = azurerm_resource_group.az_resource_group.name
    location = azurerm_resource_group.az_resource_group.location
    dns_prefix = "event-management-azure"

    service_principal {
      client_id = var.serviceprinciple_id
      client_secret = var.serviceprinciple_key
    }

  
    default_node_pool {
      name = "default"
      node_count = 1
      vm_size = "Standard_E4s_v3"
      type = "VirtualMachineScaleSets"

    }

    linux_profile {
      admin_username = "azureuser"
      ssh_key {
        key_data = var.ssh_key
      }
    }

    network_profile {
      network_plugin = "kubenet"
      load_balancer_sku = "Standard"
    }

    addon_profile {
        aci_connector_linux {
          enabled = false
        }

        azure_policy {
          enabled = false
        }

        http_application_routing {
          enabled = false
        }

        kube_dashboard {
          enabled = false
        }

        oms_agent {
          enabled = false
        }

    }
   
}

# add the role to the identity the kubernetes cluster was assigned
resource "azurerm_role_assignment" "AcrPull" {
  scope                = azurerm_container_registry.az_container_registry.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_kubernetes_cluster.az_kubernetes_cluster.id
}